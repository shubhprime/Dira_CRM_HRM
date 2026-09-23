from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User, Project, ProjectAllocation
from extensions import db

auth_bp = Blueprint('auth', __name__)
api_bp = Blueprint('api', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        # Store user info inside the JWT token
        identity = {'id': user.id, 'role': user.role, 'name': user.full_name}
        access_token = create_access_token(identity=identity)
        
        return jsonify({
            'token': access_token,
            'user': identity
        }), 200
    
    return jsonify({'message': 'Invalid email or password'}), 401

# --- Secured Endpoints ---

@api_bp.route('/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN':
        return jsonify({'message': 'Unauthorized'}), 403
    
    # Calculate revenue (sum of all project billing)
    total_revenue = db.session.query(db.func.sum(Project.billing)).scalar() or 0
    active_clients = User.query.filter_by(role='CLIENT').count()
    total_employees = User.query.filter_by(role='EMPLOYEE').count()
    active_allocations = ProjectAllocation.query.count()

    # Get recent allocations
    allocations = ProjectAllocation.query.order_by(ProjectAllocation.assigned_date.desc()).limit(10).all()
    allocations_data = []
    for alloc in allocations:
        allocations_data.append({
            'employee_name': alloc.employee.full_name,
            'employee_initials': "".join([n[0] for n in alloc.employee.full_name.split()]),
            'project_name': alloc.project.name,
            'budget': float(alloc.project.budget),
            'status': 'Active'
        })

    return jsonify({
        'stats': {
            'revenue': float(total_revenue),
            'active_clients': active_clients,
            'total_employees': total_employees,
            'active_allocations': active_allocations
        },
        'allocations': allocations_data
    })

@api_bp.route('/admin/data', methods=['GET'])
@jwt_required()
def admin_all_data():
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN':
        return jsonify({'message': 'Unauthorized'}), 403
        
    projects = Project.query.all()
    users = User.query.all()
    
    projects_data = [{
        'id': p.id,
        'name': p.name,
        'description': p.description,
        'budget': float(p.budget),
        'billing': float(p.billing),
        'client_name': p.client.full_name,
        'client_email': p.client.email
    } for p in projects]
    
    users_data = [{
        'id': u.id,
        'name': u.full_name,
        'email': u.email,
        'role': u.role
    } for u in users]
    
    return jsonify({
        'projects': projects_data,
        'users': users_data
    })

@api_bp.route('/admin/allocate', methods=['POST'])
@jwt_required()
def admin_allocate():
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN':
        return jsonify({'message': 'Unauthorized'}), 403
        
    data = request.get_json()
    project_id = data.get('project_id')
    employee_id = data.get('employee_id')
    
    if not project_id or not employee_id:
        return jsonify({'message': 'Missing data'}), 400
        
    exists = ProjectAllocation.query.filter_by(project_id=project_id, employee_id=employee_id).first()
    if exists:
        return jsonify({'message': 'Employee already allocated to this project'}), 400
        
    alloc = ProjectAllocation(project_id=project_id, employee_id=employee_id)
    db.session.add(alloc)
    db.session.commit()
    
    return jsonify({'message': 'Allocation successful'}), 201

@api_bp.route('/employee/dashboard', methods=['GET'])
@jwt_required()
def employee_dashboard():
    current_user = get_jwt_identity()
    if current_user['role'] != 'EMPLOYEE':
        return jsonify({'message': 'Unauthorized'}), 403
    
    allocations = ProjectAllocation.query.filter_by(employee_id=current_user['id']).all()
    projects_data = []
    
    for alloc in allocations:
        projects_data.append({
            'id': alloc.project.id,
            'name': alloc.project.name,
            'client_name': alloc.project.client.full_name,
            'description': alloc.project.description,
            'status': 'In Progress',
            'due_date': 'Dec 31' # Hardcoded mock for now
        })
        
    return jsonify({'projects': projects_data})

@api_bp.route('/client/dashboard', methods=['GET'])
@jwt_required()
def client_dashboard():
    current_user = get_jwt_identity()
    if current_user['role'] != 'CLIENT':
        return jsonify({'message': 'Unauthorized'}), 403
    
    # Get the client's projects
    projects = Project.query.filter_by(client_id=current_user['id']).all()
    project_data = []
    
    for p in projects:
        team_members = [{'name': alloc.employee.full_name, 'initials': "".join([n[0] for n in alloc.employee.full_name.split()])} for alloc in p.allocations]
        
        project_data.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'status': 'In Progress',
            'team': team_members
        })
        
    return jsonify({'projects': project_data})

# --- ADMIN CRUD ROUTES ---

@api_bp.route('/admin/users', methods=['POST'])
@jwt_required()
def create_user():
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN': return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'message': 'Email already exists'}), 400
        
    user = User(email=data.get('email'), full_name=data.get('name'), role=data.get('role', 'EMPLOYEE'))
    user.set_password(data.get('password', 'password123'))
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created'})

@api_bp.route('/admin/users/<int:user_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def modify_user(user_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN': return jsonify({'message': 'Unauthorized'}), 403
    
    user = User.query.get_or_404(user_id)
    if request.method == 'DELETE':
        ProjectAllocation.query.filter_by(employee_id=user.id).delete()
        projects = Project.query.filter_by(client_id=user.id).all()
        for p in projects:
            ProjectAllocation.query.filter_by(project_id=p.id).delete()
            db.session.delete(p)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'})
        
    if request.method == 'PUT':
        data = request.get_json()
        user.full_name = data.get('name', user.full_name)
        user.role = data.get('role', user.role)
        if data.get('password'):
            user.set_password(data.get('password'))
        db.session.commit()
        return jsonify({'message': 'User updated'})

@api_bp.route('/admin/projects', methods=['POST'])
@jwt_required()
def create_project():
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN': return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.get_json()
    project = Project(
        name=data.get('name'),
        description=data.get('description', ''),
        budget=data.get('budget', 0.0),
        billing=data.get('billing', 0.0),
        client_id=data.get('client_id')
    )
    db.session.add(project)
    db.session.commit()
    return jsonify({'message': 'Project created'})

@api_bp.route('/admin/projects/<int:project_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def modify_project(project_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN': return jsonify({'message': 'Unauthorized'}), 403
    
    project = Project.query.get_or_404(project_id)
    if request.method == 'DELETE':
        ProjectAllocation.query.filter_by(project_id=project.id).delete()
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Project deleted'})
        
    if request.method == 'PUT':
        data = request.get_json()
        project.name = data.get('name', project.name)
        project.description = data.get('description', project.description)
        project.budget = data.get('budget', project.budget)
        project.billing = data.get('billing', project.billing)
        db.session.commit()
        return jsonify({'message': 'Project updated'})



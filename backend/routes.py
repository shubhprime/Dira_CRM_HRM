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

# --- Future Endpoints (Secured) ---

@api_bp.route('/admin/stats', methods=['GET'])
@jwt_required()
def admin_stats():
    current_user = get_jwt_identity()
    if current_user['role'] != 'ADMIN':
        return jsonify({'message': 'Unauthorized access'}), 403
    
    # Example: Return real database stats later
    return jsonify({'message': 'Admin stats data here'})

from app import create_app
from extensions import db
from models import User, Project, ProjectAllocation

app = create_app()

with app.app_context():
    print("Dropping all existing tables...")
    db.drop_all()
    print("Creating tables...")
    db.create_all()

    # 1. Create Admin
    admin = User(email="admin@dira.com", full_name="Jane Doe (Owner)", role="ADMIN")
    admin.set_password("password123")
    
    # 2. Create Employee
    employee = User(email="employee@dira.com", full_name="John Smith", role="EMPLOYEE")
    employee.set_password("password123")
    
    # 3. Create Client
    client = User(email="client@acme.com", full_name="Acme Corp Contact", role="CLIENT")
    client.set_password("password123")

    db.session.add_all([admin, employee, client])
    db.session.commit()

    # 4. Create a Project for the Client
    project = Project(
        name="Website Redesign",
        description="Complete overhaul of the Acme Corp landing page and dashboards.",
        budget=45000.00,
        billing=15000.00,
        client_id=client.id
    )
    db.session.add(project)
    db.session.commit()

    # 5. Allocate Employee to the Project
    allocation = ProjectAllocation(project_id=project.id, employee_id=employee.id)
    db.session.add(allocation)
    db.session.commit()

    print("--- Database successfully seeded! ---")
    print("Use these credentials to test the real login:")
    print("Admin    -> admin@dira.com / password123")
    print("Employee -> employee@dira.com / password123")
    print("Client   -> client@acme.com / password123")

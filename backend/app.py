import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from extensions import db, jwt
import models  # Register models with SQLAlchemy

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)

    # --- Configuration ---
    # In production, this should be a secure random key
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-placeholder')
    
    # Database Config
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://user:password@localhost:5432/hrm_crm_db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # JWT Config
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-placeholder')
    app.config['JWT_TOKEN_LOCATION'] = ['headers']

    # --- Security Features ---
    # 1. CORS setup: Only allow our specific frontend domain in production
    # For dev, we allow localhost:5173 (default Vite port)
    frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
    CORS(app, resources={r"/api/*": {"origins": frontend_url}}, supports_credentials=True)

    # Initialize extensions with app
    db.init_app(app)
    jwt.init_app(app)

    # Register Blueprints
    from routes import auth_bp, api_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(api_bp, url_prefix='/api')

    with app.app_context():
        db.create_all()

        from models import User, Project, ProjectAllocation

        if not User.query.filter_by(email="admin@dira.com").first():
            admin = User(
                email="admin@dira.com",
                full_name="Jane Doe (Owner)",
                role="ADMIN"
            )
            admin.set_password("password123")

            employee = User(
                email="employee@dira.com",
                full_name="John Smith",
                role="EMPLOYEE"
            )
            employee.set_password("password123")

            client = User(
                email="client@acme.com",
                full_name="Acme Corp Contact",
                role="CLIENT"
            )
            client.set_password("password123")

            db.session.add_all([admin, employee, client])
            db.session.commit()

            project = Project(
                name="Website Redesign",
                description="Complete overhaul of the Acme Corp landing page and dashboards.",
                budget=45000.00,
                billing=15000.00,
                client_id=client.id
            )

            db.session.add(project)
            db.session.commit()

            allocation = ProjectAllocation(
                project_id=project.id,
                employee_id=employee.id
            )

            db.session.add(allocation)
            db.session.commit()

            print("DATABASE SEEDED")

    # 2. Security Headers (Middleware)
    @app.after_request
    def set_security_headers(response):
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        return response

    # --- Basic Routes ---
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "message": "HRM+CRM API is running."}), 200

    # (Future endpoints will go here: auth, admin, employees, clients)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)

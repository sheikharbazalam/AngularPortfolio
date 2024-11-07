import jwt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from datetime import timedelta
import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import pymongo
from config import Config
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from flask_mail import Mail, Message
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Regexp
from werkzeug.security import generate_password_hash, check_password_hash


import os


# Load environment variables
load_dotenv()

app = Flask(__name__)
mail = Mail(app)
app.config.from_object(Config)
app.config['WTF_CSRF_ENABLED'] = False


mongo_uri = os.getenv('MONGO_URI')
# Initialize MongoDB
client = pymongo.MongoClient(
    mongo_uri,
    tls=True,  # Use tls instead of ssl
    tlsAllowInvalidCertificates=True  # Allow invalid certificates
)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


db = client.get_database("portfolioapp")
projects_collection = db["projects"]
messages_collection = db["messages"]

users_collection = db['users']

CORS(app)
# configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'thespoof318@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
mail.init_app(app)


# secret key JWT

app.config['SECRET_KEY'] = os.getenv(
    "SECRET_KEY", "default_fallback_secret_key")
jwt = JWTManager(app)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)


class ContactForm(FlaskForm):
    class Meta:
        csrf = False  # Disable CSRF protection for JSON requests

    email = StringField('Email', validators=[
        DataRequired(),
        Regexp(r'^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$',
               message='Please enter a valid email address')
    ])


@app.route('/')
def home():
    return "Welcome to my MongoDB-backed portfolio app!"


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="this is a protected route"), 200

# Route to add a test project

# register to let user new entry
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email already exists
    if users_collection.find_one({"email": email}):
        return jsonify(message="Email already registered"), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Store user in MongoDB
    users_collection.insert_one({
        "email": email,
        "password": hashed_password,
        "created_at": datetime.datetime.utcnow()
    })

    return jsonify(message="User registered successfully"), 201


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # check if email already exists in the databse
    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return jsonify({'message': 'user already exist'}), 409

    # hashed_password = generate_password_hash(password, method='sha256')
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    users_collection.insert_one({
        "email": email,
        "password": hashed_password
    })

    return jsonify({'message': 'User created successfully'}), 201


# login

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400

    email = data.get('email')
    password = data.get('password')

    # Fetch the user from MongoDB using the provided email
    user = users_collection.find_one({"email": email})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid email or password'}), 401

    # token expiration
    expires = timedelta(minutes=30)

    # Generate JWT token using Flask-JWT-Extended's create_access_token method
    access_token = create_access_token(identity=email, expires_delta=expires)
    print(access_token)

    return jsonify({"access_token": access_token})


@app.route('/add_test_project', methods=['GET'])
def add_test_project():
    new_project = {
        "title": "Test Project",
        "description": "A test project",
        "tech_stack": ["Python", "Flask"],
        "link": "https://example.com"
    }
    projects_collection.insert_one(new_project)
    return "Test project added!"

# GET route to fetch all projects


@app.route('/projects', methods=['GET'])
def get_projects():
    projects = list(projects_collection.find())
    for project in projects:
        project["_id"] = str(project["_id"])  # Convert ObjectId to string
    return jsonify(projects)

# POST route to handle contact messages name email and messages


@app.route('/contact', methods=['POST'])
def contact():

    data = request.get_json()

    if not data or 'name' not in data or 'email' not in data or 'message' not in data:
        print("Inavlid data received", data)
        return jsonify({'message': 'Invalid data'}), 400

    form = ContactForm(data=request.json)
    if not form.validate():
        return jsonify({'status': 'error', 'errors': form.errors}, 400)

    new_message = {
        "name": data["name"],
        "email": data["email"],
        "message": data["message"]
    }
    messages_collection.insert_one(new_message)
    # sending email notification
    try:
        msg = Message(
            subject="new Contact form Submission",
            sender="your-email@gmail.com",
            reply_to=data['email'],
            recipients=["thespoof318@gmail.com"],
            body=f"Name:{data['name']} \nEmail:{data['email']} \nMessage:{data['message'] }"
        )
        mail.send(msg)
        print("Notification email sent to you")
    except Exception as e:
        print("Error sending email notification:", e)
        return jsonify({'status': 'error ', 'message': "failed to send notification"}), 500
    return jsonify({"status": "success", "message": "Message stored successfully!"}), 200

# GET route to fetch all messages


@app.route('/messages', methods=['GET'])
def get_messages():
   # messages = Message.query.all()
    # message_list = [{"name": msg.name, "email": msg.email,
    #                "message": msg.message} for msg in messages]
    # return jsonify(message_list), 200
    messages = list(messages_collection.find())
    for message in messages:
        message["_id"] = str(message["_id"])  # Convert ObjectId to string
    return jsonify(messages)

# POST route to add a new project


@app.route('/projects', methods=['POST'])
def add_project():
    data = request.get_json()
    project = {
        "title": data.get("title"),
        "description": data.get("description"),
        "tech_stack": data.get("tech_stack", []),
        "link": data.get("link")
    }
    projects_collection.insert_one(project)
    return jsonify({'message': 'Project added successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True)

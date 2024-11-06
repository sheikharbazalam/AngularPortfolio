import jwt
from flask_jwt_extended import JWTManager, jwt_required
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

# Replace "portfolio" with your database name
db = client.get_database("portfolioapp")
projects_collection = db["projects"]
messages_collection = db["messages"]

CORS(app)
# Enable CORS for all routes
# CORS(app, resources={r"/contact": {"origins": "http://localhost:4200"}})
# CORS(app, resources={r"/projects": {"origins": "http://localhost:4200"}})
# CORS(app, resources={r"/contact": {"origins": "http://localhost:4200"}})

# mail_password = MAIL_PASSWORD
# configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'thespoof318@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
mail.init_app(app)

# datetime feature i message when user will send message we can see the date and tike of the sending messages by the sue on the UI
# timestamp = datetime.now().strftime("%Y-%M-%d %H-%M-%S")


# secret key JWT

app.config['SECRET_KEY'] = os.getenv(
    "SECRET_KEY", "default_fallback_secret_key")
jwt = JWTManager(app)


class ContactForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Regexp(
        r'^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$', message='please enter a valid email address')])


@app.route('/')
def home():
    return "Welcome to my MongoDB-backed portfolio app!"


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="this is a protected route"), 200

# Route to add a test project


# signup
# sample user stoarge
users = {}


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email in users:
        return jsonify({'message': 'user already exist'}), 409

    hashed_password = generate_password_hash(password, method='sha256')
    users[email] = {'password': hashed_password}

    return jsonify({'message': 'User created successfully'}), 201


# login

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users.get(email)

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid password or email'}), 401

    token = jwt.encode({
        'user': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({"token": token})


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

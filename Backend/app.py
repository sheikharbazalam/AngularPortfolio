
import ssl
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import pymongo
from config import Config
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from flask_mail import Mail, Message

import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
mail = Mail(app)
app.config.from_object(Config)

# Initialize MongoDB
client = pymongo.MongoClient(
    "mongodb+srv://portfolio111:portfolio1@portfolioapp.gx9h9.mongodb.net/?retryWrites=true&w=majority&appName=portfolioapp",
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


# configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'thespoof318@gmail.com'
app.config['MAIL_PASSWORD'] = 'hffn inyd ikgi srsa'
mail.init_app(app)


@app.route('/')
def home():
    return "Welcome to my MongoDB-backed portfolio app!"

# Route to add a test project


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
            body=f"Name:{data['name']} \nEmail:{data['email']} \nMessage:{data['message']}"
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

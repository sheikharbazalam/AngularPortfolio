from flask import current_app
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize the MongoDB client
client = MongoClient(
    "mongodb+srv://portfolio111:portfolio1@portfolioapp.gx9h9.mongodb.net/?retryWrites=true&w=majority&appName=portfolioapp")
db = client.get_database("portfolioapp")

# Define the Project model


class Project:
    def __init__(self, title, description, tech_stack, link=None):
        self.title = title
        self.description = description
        self.tech_stack = tech_stack
        self.link = link

    def save(self):
        project_data = {
            "title": self.title,
            "description": self.description,
            "tech_stack": self.tech_stack,
            "link": self.link
        }
        db.projects.insert_one(project_data)

    @staticmethod
    def get_all_projects():
        return list(db.projects.find({}))

# Define the Message model


class Message:
    def __init__(self, name, email, message):
        self.name = name
        self.email = email
        self.message = message

    def save(self):
        message_data = {
            "name": self.name,
            "email": self.email,
            "message": self.message
        }
        db.messages.insert_one(message_data)

    @staticmethod
    def get_all_messages():
        return list(db.messages.find({}))

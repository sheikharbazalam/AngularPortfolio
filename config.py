import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    MONGO_URI = "mongodb+srv://portfolio111:portfolio1@portfolioapp.gx9h9.mongodb.net/?retryWrites=true&w=majority&appName=portfolioapp"

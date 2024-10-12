from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/add_user/<username>/<email>')
def add_user(username, email):
    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()
    return f"User {username} added."

@app.route('/users')
def get_users():
    users = User.query.all()
    return {'users': [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]}

if __name__ == '__main__':
    app.run(debug=True)

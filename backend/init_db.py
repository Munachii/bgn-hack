import csv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    
    def __repr__(self):
        return f"<User {self.username}>"

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), nullable=False)
    song_timestamp = db.Column(db.String(200), nullable=False)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<Question {self.question}>"

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)
    song_url = db.Column(db.String(200), nullable=False)
    language = db.Column(db.String(20), nullable=False)
    lyrics_url = db.Column(db.String(200), nullable=False)
    translated_lyrics_url = db.Column(db.String(200), nullable=False) 
    thumbnail_url = db.Column(db.String(200), nullable=False)

def init_db(csv_file):
    db.create_all()

    with open(csv_file, newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            question = Question(
                song_id=row['song_id'],
                song_timestamp=row['song_timestamp'],
                question=row['question'],
                answer=row['answer']
            )
            db.session.add(question)
        db.session.commit()
            
    with open('songs.csv', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader: 
            title = row['title'].replace(' ', '_')
            song = Song(
                title=title,
                artist=row['artist'],
                song_url=row['song_url'],
                language=row['language'],
                lyrics_url=f'{title}_original.lrc',
                translated_lyrics_url=f'{title}_translated.lrc',
                thumbnail_url=f'{title}.jpg'
            )
            db.session.add(song)
        db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        init_db('questions.csv')
        print("Database initialised and prepopulated with CSV data.")

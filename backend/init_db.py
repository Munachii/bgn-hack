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

def init_db(songs_csv, questions_csv):
    # Create all tables
    db.create_all()

    # Populate the songs table
    with open(songs_csv, newline='') as songs_file:
        reader = csv.DictReader(songs_file)
        for row in reader:
            # Check if the song already exists in the database
            existing_song = Song.query.filter_by(title=row['title'], artist=row['artist']).first()
            if not existing_song:
                song = Song(
                    title=row['title'],
                    artist=row['artist'],
                    song_url=row['song_url'],
                    language=row['language'],
                    lyrics_url=row['lyrics_url'],
                    translated_lyrics_url=row['translated_lyrics_url'],
                    thumbnail_url=row['thumbnail_url']
                )
                db.session.add(song)
        db.session.commit()

    # Populate the questions table
    with open(questions_csv, newline='') as questions_file:
        reader = csv.DictReader(questions_file)
        for row in reader:
            # Check if the question already exists in the database
            existing_question = Question.query.filter_by(
                song_id=row['song_id'], 
                song_timestamp=row['song_timestamp'], 
                question=row['question']
            ).first()
            if not existing_question:
                question = Question(
                    song_id=row['song_id'],
                    song_timestamp=row['song_timestamp'],
                    question=row['question'],
                    answer=row['answer']
                )
                db.session.add(question)
        db.session.commit()

if __name__ == '__main__':
    # Use Flask's application context
    with app.app_context():
        songs_csv = 'songs.csv'  # Make sure this path is correct
        questions_csv = 'questions.csv'  # Make sure this path is correct
        init_db(songs_csv, questions_csv)
        print("Database initialized and prepopulated with CSV data.")

from flask import Flask, request, jsonify
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Setup base directory for database path
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

# Enable CORS to allow requests from any origin
cors = CORS(app, origins='*')

# SQLAlchemy configuration for SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance/database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the SQLAlchemy ORM
db = SQLAlchemy(app)

# Define the Song model
class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)
    song_url = db.Column(db.String(200), nullable=False)
    language = db.Column(db.String(20), nullable=False)
    lyrics_url = db.Column(db.String(200), nullable=False)
    translated_lyrics_url = db.Column(db.String(200), nullable=False) 
    thumbnail_url = db.Column(db.String(200), nullable=False)

# Define the Question model
class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), nullable=False)
    song_timestamp = db.Column(db.String(200), nullable=False)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(200), nullable=False)

    # Relationship to link questions with songs
    song = db.relationship('Song', backref=db.backref('questions', lazy=True))

# Define a basic route for the home page
@app.route('/')
def home():
    return 'Hello, World!'

# Route to fetch all songs
@app.route('/songs', methods=['GET'])
def get_songs():
    songs = Song.query.all()  # Fetch all songs from the database
    # Structure the response as a list of dictionaries
    songs_list = [
        {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'language': song.language,
            'song_url': song.song_url,
            'lyrics_url': song.lyrics_url,
            'translated_lyrics_url': song.translated_lyrics_url,
            'thumbnail_url': song.thumbnail_url
        }
        for song in songs
    ]
    return jsonify(songs_list)  # Return the JSON response with all songs

@app.route('/songs/<int:song_id>/questions', methods=['GET'])
def get_questions_for_song(song_id):
    # Find the song by its ID to ensure the song exists
    song = Song.query.get(song_id)
    if not song:
        return jsonify({"error": "Song not found"}), 404

    # Fetch the questions associated with the song
    questions = Question.query.filter_by(song_id=song_id).all()

    if not questions:
        return jsonify({"error": "No questions found for this song"}), 404

    # Format the questions data for the response
    questions_data = [
        {
            'id': q.id,
            'song_timestamp': q.song_timestamp,
            'question': q.question,
            'answer': q.answer
        } for q in questions
    ]
    return jsonify(questions_data), 200

# Main entry point to run the application
if __name__ == '__main__':
    # Ensure the database is created (optional, only for first-time runs)
    with app.app_context():
        db.create_all()  # Create all tables if they don't exist
    
    app.run(debug=True, port=8080)

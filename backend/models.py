from app import db
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    
    def __repr__(self):
        return f"<User {self.username}>"
    
class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)
    song_url = db.Column(db.String(200), nullable=False)
    lyrics_url = db.Column(db.String(200), nullable=False)
    translated_lyrics_url = db.Column(db.String(200), nullable=False) 
    thumbnail_url = db.Column(db.String(200), nullable=False)
    language = db.Column(db.String(20), nullable=False)
    
    def __repr__(self):
        return f"<Song {self.title}>"

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), nullable=False)
    song_timestamp = db.Column(db.String(200), nullable=False)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(200), nullable=False)
    
    def __repr__(self):
        return f"<Question {self.question}>"

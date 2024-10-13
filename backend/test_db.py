from app import db, app  # Ensure you import the app
from models import Song, Question

def print_songs():
    songs = Song.query.all()
    print("Songs:")
    for song in songs:
        print(f"ID: {song.id}, Title: {song.title}, Artist: {song.artist}, "
              f"Song URL: {song.song_url}, Lyrics URL: {song.lyrics_url}, "
              f"Translated Lyrics URL: {song.translated_lyrics_url}, "
              f"Thumbnail URL: {song.thumbnail_url}, Language: {song.language}")

def print_questions():
    with app.app_context():  # Ensure the application context is active
        questions = Question.query.all()
        for question in questions:
            print(f"Song ID: {question.song_id}, Timestamp: {question.song_timestamp}, "
                  f"Question: {question.question}, Answer: {question.answer}, ")


if __name__ == '__main__':
    with app.app_context():  # Set up application context
        print_songs()
        print_questions()

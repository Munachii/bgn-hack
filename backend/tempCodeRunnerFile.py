import csv
from app import db
from models import Song, Question

def init_db(songs_csv, questions_csv):
    # Create all tables
    db.create_all()

    # Populate the songs table
    with open(songs_csv, newline='') as songs_file:
        reader = csv.DictReader(songs_file)
        for row in reader:
            song = Song(
                title=row['title'],
                artist=row['artist'],
                song_url=row['song_url'],
                lyrics_url=row['lyrics_url'],
                translated_lyrics_url=row['translated_lyrics_url'],
                thumbnail_url=row['thumbnail_url'],
                language=row['language']
            )
            db.session.add(song)
        db.session.commit()

    # Populate the questions table
    with open(questions_csv, newline='') as questions_file:
        reader = csv.DictReader(questions_file)
        for row in reader:
            question = Question(
                song_id=row['song_id'],
                song_timestamp=row['song_timestamp'],
                question=row['question'],
                answer=row['answer']
            )
            db.session.add(question)
        db.session.commit()

if __name__ == '__main__':
    # Initialize the database with song and question data
    songs_csv = 'songs.csv'
    questions_csv = 'questions.csv'
    init_db(songs_csv, questions_csv)

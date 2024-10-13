import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './QuizPage.css';
import pic1 from '../../images/img1.jpeg';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  // Fetch questions from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/questions')
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Remove punctuation from the user's answer
  const removePunctuation = (str) => {
    return str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
  };

  // Handle showing the answer and checking if the typed answer is correct
  const handleShowAnswer = () => {
    setShowAnswer(true);

    const finalUserAnswer = removePunctuation(userAnswer).toLowerCase();
    const correctAnswer = removePunctuation(currentQuestion.answer).toLowerCase();

    if (finalUserAnswer === correctAnswer) {
      setScore(score + 1);
    }
  };

  // Handle showing next question
  const handleNextQuestion = () => {
    setShowAnswer(false);
    setUserAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz finished! Your final score is ${score} out of ${questions.length}.`);
    }
  };

  // Play the song snippet based on the timestamp from the backend
const playSong = (artist, songId, title, timestamp) => {
  // Log the timestamp for debugging
  console.log("Timestamp:", timestamp);

  // Split the timestamp into start and end times
  const [startTime, endTime] = timestamp.split("-");

  if (!startTime || !endTime) {
      console.error("Invalid timestamp format:", timestamp);
      return; // Exit the function if the timestamp is invalid
  }

  // Split start and end times into minutes, seconds, and milliseconds
  const [sM, sS, sMs] = startTime.split(":").map(Number);
  const [eM, eS, eMs] = endTime.split(":").map(Number);

  // Ensure all values are numeric
  if (isNaN(sM) || isNaN(sS) || isNaN(sMs) || isNaN(eM) || isNaN(eS) || isNaN(eMs)) {
      console.error("Non-numeric time values encountered. Start:", startTime, "End:", endTime);
      return; // Exit the function if any time values are invalid
  }

  // Convert start and end times to seconds
  const startinsec = sM * 60 + sS + (sMs / 1000);
  const endinsec = eM * 60 + eS + (eMs / 1000);

  // Log converted times for debugging
  console.log("Start in seconds:", startinsec, "End in seconds:", endinsec);

  // Construct the audio file path
  const audioFile = `/songs/${artist}-${title}-${songId}.mp3`;
  const audio = audioRef.current; // Get the audio element reference

  if (audio) {
      audio.src = audioFile; // Set the audio source
      audio.currentTime = startinsec; // Set the start time

      audio.play().then(() => {
          setTimeout(() => {
              audio.pause(); // Pause the audio when the snippet ends
          }, (endinsec - startinsec) * 1000); // Calculate the snippet duration
      }).catch(error => {
          console.error("Error playing audio:", error); // Log any errors while playing
      });
  } else {
      console.error("Audio element is not available.");
  }
};

  return (
    <>
      <h1 className="game-page-title">Lyric Lingo</h1>
      <h4>How to play :</h4>
      <h6>Listen to the song snippet in the native language of your choice, then translate the snippet to English.</h6>
      <div className="container d-flex justify-content-center my-4 mb-5">
        <div className="card">
          <div className="bg-image hover-overlay ripple">
            <img className="card-img-top" src={pic1} alt="Card cap" />
          </div>
          <div className="card-body text-center">
            <h5 className="h5 font-weight-bold">Asake</h5>
            <p className="mb-0">2:30</p>

            <audio ref={audioRef} controls />
            {/* Play Song Button */}
            <div>
              <button
                onClick={() => playSong('Asake', '2:30', 'Title', '0:00-0:30')}
              >
                Play Song
              </button>
            </div>
          </div>
        </div>
      </div>

      {questions.length > 0 ? (
        <>
          <div>
            <h2>{currentQuestion.question}</h2>

            {/* Input field for the user to type their answer */}
            <div>
              <input
                type="text"
                placeholder="Type your answer here"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}  // Update user's input
                className="form-control"
              />
            </div>

            {showAnswer && (
              <p>
                Correct Answer: {currentQuestion.answer} <br />
                {removePunctuation(userAnswer).toLowerCase() === removePunctuation(currentQuestion.answer).toLowerCase()
                  ? "Correct!"
                  : "Incorrect"}
              </p>
            )}
            
            <button
                className="btn btn-info mx-2"
                onClick={() => playSong('Asake', currentQuestion.id, 'Title', currentQuestion.song_timestamp)}
            >
                Play Song
            </button>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary mx-2"
                onClick={handleShowAnswer}
                disabled={!userAnswer.trim()}  // Disable button if no answer is typed
              >
                Submit Answer
              </button>
              <button className="btn btn-secondary mx-2" onClick={handleNextQuestion}>
                Next Question
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading questions...</p>
      )}
      <p>Score: {score}</p>
    </>
  );
}

export default QuizPage;

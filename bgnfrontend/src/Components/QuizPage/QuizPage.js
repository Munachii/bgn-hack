import React, { useEffect, useState, useRef } from 'react';
import pic1 from '../../images/2-30.png';
import './QuizPage.css';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null); // Reference to the audio element
  
useEffect(() => {
    const hardcodedQuestions = [
        {
            id: 1,
            question: "Translate Àwa l'ọmọ t'ọ ń sọ, ti o seke, ye",
            answer: "we are the children they talk about that is clear",
            song_timestamp: "00:34.37-00:36.65"
        },
        {
            id: 2,
            question: "Translate Ẹ sọ̀ fún wọn t'oba tẹrẹ'ri si, wọn má pa l'órí",
            answer: "tell them that if they confront you they will not go unpunished",
            song_timestamp: "00:50.36-00:53.00"
        },
        {
            id: 3,
            question: "Translate O fẹ jẹ ń bi, o tún fẹ jẹ ń bẹẹ, ò pọ, sẹ",
            answer: "you want to be in a certain way but you also want to be in another way isnt it",
            song_timestamp: "00:42.48-00:45.23"
        },
        {
            id: 4,
            question: "Translate Torí ko s'ẹlòmíì, many men fẹ dàbí mí, ẹ ri bi",
            answer: "because there’s no one else many men want to be like me you see how",
            song_timestamp: "00:55.92-01:00.00"
        },
        {
            id: 5,
            question: "Translate Mo ti lọ, mo ti pá 'yẹn ti",
            answer: "i have gone i have finished that",
            song_timestamp: "01:45.93-01:47.60"
        }
    ];
    setQuestions(hardcodedQuestions);
    setLoading(false);
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
    console.log("Timestamp:", timestamp);

    const [startTime, endTime] = timestamp.split("-");
    if (!startTime || !endTime) {
      console.error("Invalid timestamp format:", timestamp);
      return;
    }

    const [ssM, sSandMs] = startTime.split(":");
    const sM = parseInt(ssM);
    const [sS, sMs] = sSandMs.split(".").map(Number);
    const [eeM, eSandMs] = endTime.split(":");
    const eM = parseInt(eeM);
    const [eS, eMs] = eSandMs.split(".").map(Number);

    if (isNaN(sM) || isNaN(sS) || isNaN(sMs) || isNaN(eM) || isNaN(eS) || isNaN(eMs)) {
      console.error("Non-numeric time values encountered. Start:", startTime, "End:", endTime);
      return;
    }

    const startinsec = sM * 60 + sS + (sMs / 100);
    const endinsec = eM * 60 + eS + (eMs / 100);

    console.log("Start in seconds:", startinsec, "End in seconds:", endinsec);

    const audioFile = "/songs/Asake-2-30.mp3"; // Set the correct file path
    const audio = audioRef.current;

    if (audio) {
      audio.src = audioFile; // Set the audio source
      audio.currentTime = startinsec; // Set the start time

      audio.play().then(() => {
        setTimeout(() => {
          audio.pause(); // Pause the audio when the snippet ends
        }, (endinsec - startinsec) * 1000);
      }).catch(error => {
        console.error("Error playing audio:", error);
      });
    } else {
      console.error("Audio element is not available.");
    }
  };

  return (
    <>
      <h1 className="game-page-title">Lyrica</h1>
      <div className="instructions">
        <h4>How to play:</h4>
        <h6>Listen to the song snippet in the native language of your choice, then translate the snippet to English.</h6>
      </div>

      <div className="container d-flex justify-content-center my-4 mb-5">
        <div className="card">
          <div className="bg-image hover-overlay ripple">
            <img className="rounded" src={pic1} alt="Card cap" />
          </div>
          <div className="card-body text-center">
            <h5 className="artist-title">Artist: Asake</h5>
            <p className="mb-0"> Song Title : 2:30</p>
          </div>
        </div>
      </div>

      {questions.length > 0 ? (
        <>
          <div>
            <h2>{currentQuestion.question}</h2>

            <div className="input-container">
              <input
                type="text"
                placeholder="Type your answer here"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
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
              onClick={() => playSong('Asake', currentQuestion.id, currentQuestion.title, currentQuestion.song_timestamp)}
            >
              Play Song
            </button>
            
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary mx-2"
                onClick={handleShowAnswer}
                disabled={!userAnswer.trim()}
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

      {/* Audio element for playing song snippets */}
      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </>
  );
}

export default QuizPage;

import React, { useEffect, useState ,useRef} from 'react';
import axios from 'axios';
// import CustomNavbar from './Components/CustomNavbar';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const audioRef = useRef(null);

  // Fetch questions from the backend
  useEffect(() => {
    axios.get('http://localhost:5001/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching the questions', error);
      });
  }, []);

  // Handle showing next question
  const handleNextQuestion = () => {
    setShowAnswer(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Congratulations, you have completed all the questions!');
    }
  };

  // Handle showing the answer
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const playSong = (songId, timestamp) => {
    const audioFile = `/songs/${songId}.mp3`;  
    const audio = audioRef.current;

    audio.src = audioFile; 
    audio.currentTime = timestamp; 
    audio.play();  
  };

  return (
    <div className="App">
      {/* <CustomNavbar /> */}
      <hr></hr>
      <h1>Lyric Lingo</h1>
      <hr></hr>
      <h4>How to play :</h4>
      <h6>Listen to the song snippet in the native language of your choice, then translate the snippet to English.</h6>
      <hr></hr>
      <p> This is where the audioFile goes</p>
      <hr></hr>
      {questions.length > 0 ? (
        <>
          <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            {showAnswer && <p>Answer: {questions[currentQuestionIndex].answer}</p>}
            <button onClick={handleShowAnswer}>Show Answer</button>
            <button onClick={handleNextQuestion}>Next Question</button>
            <audio ref={audioRef} controls />
          </div>
        </>
      ) : (
        <p>The questions will go here ......</p>

      )}
    <hr></hr>
    <p>Answers will be inserted here</p>
    <hr></hr>
    <br></br>
    <br></br>
    <hr></hr>
    <p>centered buttons (next question), (End quiz)</p>
    <p>TODO: Implement a score counter</p>
    </div>
  );
}

export default App;

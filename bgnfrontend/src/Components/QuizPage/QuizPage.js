import React, { useEffect, useState ,useRef} from 'react';
import './QuizPage.css';
import axios from 'axios';
import pic1 from '../../images/img1.jpeg';

function QuizPage(){
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const audioRef = useRef(null);

    // Fetch questions from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/questions')
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
            alert(`Quiz finished! Your score is ${score}.`);
        }
    };

    // Handle showing the answer
    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    // Play song snippet
    const playSong = (artist, songId, title, timestamp) => {
        const [startTime, endTime] = timestamp.split("-");
        const [sM, sS, sMs] = startTime.split(":").map(Number);
        const startinsec = sM * 60 + sS + (sMs / 1000);
        const [eM, eS, eMs] = endTime.split(":").map(Number);
        const endinsec = eM * 60 + eS + (eMs / 1000);

        const audioFile = `/songs/${artist}-${title}-${songId}.mp3`;
        const audio = audioRef.current;
        audio.src = audioFile;
        audio.currentTime = startinsec;

        audio.play().then(() => {
            setTimeout(() => {
                audio.pause();
            }, (endinsec - startinsec) * 1000);
        });
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <h1 className="game-page-title">Lyric Lingo</h1>
            
            <div className='instructions'>
            <h4>How to play :</h4>
            <h6>Listen to the song snippet in the native language of your choice, then translate the snippet to English.</h6>
            </div>
            <div className="container d-flex justify-content-center my-4 mb-5">
                <div className="card">
                    <div className="bg-image hover-overlay ripple">
                        <img className="card-img-top" src={pic1} alt="Card cap"/>
                    </div>
                    <div className="card-body text-center">
                        <h5 className="h5 font-weight-bold">Asake</h5>
                        <p className="mb-0">2:30</p>

                        <audio ref={audioRef} controls />
                    </div>
                </div>
            </div>
            
            <hr />
            {questions.length > 0 ? (
                <>
                    <div>
                        <h2>{currentQuestion.question}</h2>
                        {showAnswer && <p>Answer: {currentQuestion.answer}</p>}
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary mx-2" onClick={handleShowAnswer}>Show Answer</button>
                            <button className="btn btn-secondary mx-2" onClick={handleNextQuestion}>Next Question</button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading questions...</p>
            )}
            <hr />
            <p>Score: {score}</p>
        </>
    );
}

export default QuizPage;

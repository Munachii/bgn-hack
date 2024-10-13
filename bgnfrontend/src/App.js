import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SongPage from './Components/SongPage/SongPage';
import QuizPage from './Components/QuizPage/QuizPage';
import Navbar from './Components/Navbar/navbar';

const App = () => {
  const [userId, setUserId] = useState(null); // add a state for userId

  return (
      <Router>
        <div className="container">
          <Routes>
            <Route path="/songs" element={<SongPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
/*
            <Route path="/songs" element={<SongPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/quiz" element={<QuizPage />} />
*/
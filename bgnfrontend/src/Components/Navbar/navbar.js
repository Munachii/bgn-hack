// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
return (
    <nav className="navbar">
        <div className="navbar-logo">
            <Link to="/">
                <img src="/images/logo.png" alt="Brand Logo" />
            </Link>
        </div>
        <ul className="navbar-links">
            <li>
                <Link to="/quiz">Quiz</Link>
            </li>
            <li>
                <Link to="/songs">Songs</Link>
            </li>
        </ul>
    </nav>
);
};

export default Navbar;

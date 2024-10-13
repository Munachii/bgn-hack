import React from 'react'
//import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

function Navbar() {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Navbar.Brand href="#home">
          <img
            src="\bgnfrontend\public\images\android-chrome-512x512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Lyric Lingo Logo"
          />
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Navbar

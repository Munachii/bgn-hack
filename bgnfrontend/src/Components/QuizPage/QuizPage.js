import React, {useState, useEffect} from "react";
import './QuizPage.css';
import pic1 from '../../images/img1.jpeg'
import pic2 from '../../images/img2.jpeg'
import pic3 from '../../images/img3.jpg'
import pic4 from '../../images/img4.jpeg'


const QuizPage = () => {
    
    // Hardcoded song data
  const songs = [
    {
      id: 1,
      title: "2:30",
      artist: "Asake",
      img: pic1,
      thumbnail_url: "link_to_thumbnail.jpg", // Replace with actual URL
      lyrics_url: "link_to_lyrics.lrc", // Replace with actual URL
    },
    {
      id: 2,
      title: "Ojuelegba",
      artist: "Wizkid",
      img: pic2,
      thumbnail_url: "link_to_another_thumbnail.jpg", // Replace with actual URL
      lyrics_url: "link_to_another_lyrics.lrc", // Replace with actual URL
    },
    {
        id: 3,
        title: "Fall",
        artist: "Davido",
        img: pic3,
        thumbnail_url: "link_to_another_thumbnail.jpg", // Replace with actual URL
        lyrics_url: "link_to_another_lyrics.lrc", // Replace with actual URL
      },
      {
        id: 4,
        title: "Ma Lo",
        artist: "Tiwa Savage",
        img: pic4,
        thumbnail_url: "link_to_another_thumbnail.jpg", // Replace with actual URL
        lyrics_url: "link_to_another_lyrics.lrc", // Replace with actual URL
      },
    // Add more songs as needed
  ];

  return (
    <div>
      <h1 className="song-page-title">Select a song you'd like to learn!</h1>
      <div className="song-list"> 
        {songs.map((song) => (
          <div key={song.id} className="song-item">
            <img src={song.img} alt={`${song.title} thumbnail`} className="song-image"/>
            <h3>{song.title}</h3>
            <p>Artist: {song.artist}</p>
            <a href={song.lyrics_url} target="_blank" rel="noopener noreferrer">Learn!</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;

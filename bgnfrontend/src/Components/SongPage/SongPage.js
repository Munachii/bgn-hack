import React, { useState } from "react";
import './SongPage.css';
import _230 from '../../images/2-30.png';
import ojuelegeba from '../../images/ojuelegba.png';
import fall from '../../images/fall.png';
import ma_lo from '../../images/ma-lo.png';
import ada_ada from '../../images/ada-ada.png';
import nwa_baby from '../../images/nwa-baby.png';
import duniya from '../../images/duniya.png';
import this_is_nigeria from '../../images/TIN.png';
import johnny from '../../images/johnny.png';
import essence from '../../images/essence.png';
import fem from '../../images/fem.png';

const SongPage = () => {
  // Language filter and search input states
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const languages = ["All", "Yoruba", "Igbo", "Hausa", "Pidgin", "English"];
    
  // Hardcoded song data
  const songs = [
    { id: 1, title: "2:30", artist: "Asake", img: _230, language: "Yoruba" },
    { id: 2, title: "Ojuelegba", artist: "Wizkid", img: ojuelegeba, language: "Yoruba" },
    { id: 3, title: "Fall", artist: "Davido", img: fall, language: "Yoruba" },
    { id: 4, title: "Ma Lo", artist: "Tiwa Savage", img: ma_lo, language: "Yoruba" },
    { id: 5, title: "Ada Ada", artist: "Flavour", img: ada_ada, language: "Igbo" },
    { id: 6, title: "Nwa Baby", artist: "Flavour", img: nwa_baby, language: "Igbo" },
    { id: 7, title: "Duniya", artist: "Morell", img: duniya, language: "Hausa" },
    { id: 9, title: "This is Nigeria", artist: "Falz", img: this_is_nigeria, language: "Pidgin" },
    { id: 10, title: "Johnny", artist: "Yemi Alade", img: johnny, language: "Pidgin" },
    { id: 11, title: "Essence", artist: "Wizkid", img: essence, language: "English" },
    { id: 12, title: "FEM", artist: "Davido", img: fem, language: "English" }
  ];

  // Handle language filter selection
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter and search songs based on selected language and search term
  const filteredSongs = songs.filter(song => {
    const matchesLanguage = selectedLanguage === 'All' || song.language === selectedLanguage;
    const matchesSearch = song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm);
    return matchesLanguage && matchesSearch;
  });

  return (
    <div>
      <h1 className="song-page-title">Select a song you'd like to learn!</h1>

      {/* Filter and search section */}
      <div className="filter-section">
        <label htmlFor="language-filter">Filter by language: </label>
        <select id="language-filter" value={selectedLanguage} onChange={handleLanguageChange}>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <label htmlFor="search">Search by title or artist: </label>
        <input 
          id="search" 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
      </div>

      <div className="song-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <div key={song.id} className="song-item">
              <img src={song.img} alt={`${song.title} thumbnail`} className="song-image" />
              <div className="song-item-content">
                <h3>{song.title}</h3>
                <p>Artist: {song.artist}</p>
                <p>Language: {song.language}</p>
                <a href="/quiz">Learn!</a>
              </div>
            </div>
          ))
        ) : (
          <p>No songs found</p>
        )}
      </div>
    </div>
  );
};

export default SongPage;

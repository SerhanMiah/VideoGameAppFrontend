import React from 'react';
import { Link } from 'react-router-dom';
import { GiGamepad } from 'react-icons/gi';
import '../Style/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="title">Welcome to the Video Game Shop</h1>
        <p className="subtitle">Explore a wide range of video games and accessories!</p>
        <Link to="/game" className="explore-button">
          <GiGamepad className="gamepad-icon" />
          Explore Now
        </Link>
      </div>
    </div>
  );
};

export default Home;

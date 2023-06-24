import React from 'react';
import { FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Style/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">GAME</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/game" className="nav-link">Game</Link>
            </li>
          </ul>
          <div className="nav-icons">
            <FaSearch size={24} className="icon" />
            <FaUserCircle size={24} className="icon" />
            <FaShoppingCart size={24} className="icon" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

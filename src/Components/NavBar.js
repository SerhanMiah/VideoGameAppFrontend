import React from 'react';
import { FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import '../Style/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a href="/" className="navbar-brand">GAME</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/store">Store</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/xbox">Xbox</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/playstation">PlayStation</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/nintendo">Nintendo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pc">PC</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/digital">Digital</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/deals">Deals</a>
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

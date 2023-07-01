import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Game from './Components/Game';
import GameDetail from './Components/GameDetail';
import Register from './Components/Register.js';
import Login from './Components/Login';
import ProfilePage from './Components/ProfilePage';
import ShoppingCart from './Components/Cart/ShoppingCart';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/:id" element={<GameDetail />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/cart" element={<ShoppingCart />} />

      </Routes>


    </Router>
  );
}

export default App;

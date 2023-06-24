import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/Game.css';

const Game = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:5177/api/game?page=${page}`)
      .then(response => {
        console.log(response.data.$values);
        setGames(prevGames => [...prevGames, ...response.data.$values]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching game data:', error);
        setError('Error fetching game data');
        setLoading(false);
      });
  }, [page]);

  const loadMoreGames = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container">
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div className="error">{error}</div> : null}
      <div className="game-grid">
        {games.map(game => (
          <div className="game-item" key={game.id}>
            <Link to={`/game/${game.id}`} className="game-link">
              <div className="game-image">
                <img src={game.gameImages.$values[0]?.url} alt={game.title} />
              </div>
              <div className="game-details">
                <h2 className="game-title">{game.title}</h2>
                <p className="game-rating">Rating: {game.rating}</p>
                <p className="game-price">Price: ${game.price}</p>
                <p className="game-release">Release Date: {game.releaseDate}</p>
                <p className="game-genre">Genre: {game.genre}</p>
                <p className="game-platform">Platform: {game.platform}</p>
                <p className="game-description">{game.description}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button className="load-more-btn" onClick={loadMoreGames}>Load More</button>
    </div>
  );
}

export default Game;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../Style/Game.scss';

const Game = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setGames([]); // Clear existing games when the page changes

    axios.get(`http://localhost:5177/api/game?page=${page}`)
      .then(response => {
        console.log(response);
        console.log(response.data.$values);
        setGames(response.data.$values);
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

  const addToCart = (game) => {
    setCartItems(prevItems => [...prevItems, game]);
  };

  return (
    <div className="container">
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div className="error">{error}</div> : null}
      <Row className="game-grid">
        {games.map(game => (
          <Col key={game.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="game-item">
              <Link to={`/game/${game.id}`} className="game-link">
                <div className="game-image">
                  <Card.Img variant="top" src={game.gameImages.$values[0]?.url} alt={game.title} />
                </div>
                <Card.Body>
                  <Card.Title className="game-title">{game.title}</Card.Title>
                  <div className="game-details">
                    <p className="game-price">Price: ${game.price}</p>
                    <p className="game-genre">Genre: {game.genre}</p>
                  </div>
                </Card.Body>
              </Link>
              <Card.Footer className="game-footer">
                <Button
                  variant="primary"
                  className="add-to-cart-btn"
                  onClick={() => addToCart(game)}
                >
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <button className="load-more-btn" onClick={loadMoreGames}>Load More</button>
    </div>
  );
}

export default Game;

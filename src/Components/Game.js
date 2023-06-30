import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
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
        console.log(response);
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
      <Row className="game-grid">
        {games.map(game => (
          <Col key={game.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="game-item">
              <Link to={`/game/${game.id}`} className="game-link">
                <Card.Img variant="top" src={game.gameImages.$values[0]?.url} alt={game.title} />
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <Card.Text className="game-description">{game.description}</Card.Text>
                  <div className="game-details">
                    <p className="game-rating">Rating: {game.rating}</p>
                    <p className="game-price">Price: ${game.price}</p>
                    <p className="game-release">Release Date: {game.releaseDate}</p>
                    <p className="game-genre">Genre: {game.genre}</p>
                    <p className="game-platform">Platform: {game.platform}</p>
                  </div>
                </Card.Body>
              </Link>
              <Card.Footer>
                {game.dlcs && game.dlcs.length > 0 && (
                  <div className="dlc-list">
                    <p className="dlc-header">DLCs:</p>
                    <ul className="dlc-items">
                      {game.dlcs.map(dlc => (
                        <li key={dlc.id}>{dlc.dlcName} - ${dlc.price}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button variant="primary" className="add-to-cart-btn">Add to Cart</Button>
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

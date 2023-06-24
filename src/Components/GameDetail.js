import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiStar, FiDollarSign, FiCalendar, FiBookOpen, FiShoppingCart } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Style/GameDetail.css'

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5177/api/game/${id}`)
      .then((response) => {
        console.log(response);
        setGame(response.data);
        setImages(response.data.gameImages.$values);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching game data:', error);
        setError('Error fetching game data');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!game) {
    return <div className="error">Game not found</div>;
  }

  return (
    <div className="container">
      <div className="game-details">
        <div className="game-title">
          <h2>{game.title}</h2>
        </div>
        <div className="game-info">
          <div className="game-thumbnail">
            <Carousel showThumbs={false} dynamicHeight={false} className="game-carousel">
              {images.map((image) => (
                <div key={image.id}>
                  <img src={image.url} alt="Game Screenshot" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="game-description">
            <p>{game.description}</p>
          </div>
          <div className="game-meta">
            <div className="game-rating">
              <FiStar className="icon" />
              <span>{game.rating}</span>
            </div>
            <div className="game-price">
              <FiDollarSign className="icon" />
              <span>${game.price}</span>
            </div>
            <div className="game-release">
              <FiCalendar className="icon" />
              <span>{game.releaseDate}</span>
            </div>
            <div className="game-genre">
              <FiBookOpen className="icon" />
              <span>{game.genre}</span>
            </div>
          </div>
          <div className="game-actions">
            <button className="add-to-cart-btn">
              <FiShoppingCart className="icon" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiStar, FiDollarSign, FiCalendar, FiBookOpen, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import Rating from 'react-rating';
import ReviewSection from '../Components/Review/ReviewSection';

import '../Style/GameDetail.css';
import { getUserInfo, userIsAuthenticated } from './Helper/auth';

const API_URL = 'http://localhost:5177/api/game/';
const SHOPPING_CART_API_URL = 'http://localhost:5177/api/ShoppingCart/AddToCart';
const WISHLIST_API_URL = 'http://localhost:5177/api/Wishlist/AddToWishlist';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}${id}`);
        console.log(response.data);
        setGame(response.data);
        setImages(response.data.gameImages.$values);
      } catch (error) {
        setError('An error occurred while fetching game data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  useEffect(() => {
    const userInfo = getUserInfo();
    console.log('User Info:', userInfo);
  }, []);

  const addToCart = async () => {
    const userInfo = getUserInfo();
    const token = userInfo ? userInfo.token : null; // Retrieve the token from the user info
  
    if (userInfo && token) {
      try {
        const response = await axios.post(
          SHOPPING_CART_API_URL,
          {
            gameId: game.id,
            quantity: 1,
            userId: userInfo.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('User Info:', userInfo);
        console.log(response);
  
        if (response.status === 200) {
          console.log('Game successfully added to cart');
        } else {
          console.error('Failed to add game to cart');
        }
      } catch (error) {
        console.error('Error adding game to cart:', error);
      }
    } else {
      console.log('User must be logged in to add items to the cart.');
    }
  };

  const addToWishlist = async () => {
    const userInfo = getUserInfo();
    const token = userInfo ? userInfo.token : null; // Retrieve the token from the user info
  
    if (userInfo && token) {
      try {
        const response = await axios.post(
          WISHLIST_API_URL,
          {
            gameId: game.id,
            userId: userInfo.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('User Info:', userInfo);
        console.log(response);
  
        if (response.status === 200) {
          console.log('Game successfully added to wishlist');
          setMessage('Game added to wishlist');
        } else {
          console.error('Failed to add game to wishlist');
          setMessage('Failed to add game to wishlist');
        }
      } catch (error) {
        console.error('Error adding game to wishlist:', error);
        setMessage('Error adding game to wishlist');
      }
    } else {
      console.log('User must be logged in to add items to the wishlist.');
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!game) {
    return <div className="error">Game not found</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const GameTrailer = ({ trailerUrl }) => {
    if (!trailerUrl) {
      return null;
    }

    const videoId = trailerUrl.split('v=')[1];
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className="game-trailer">
        <iframe
          width="560"
          height="315"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Game Trailer"
        />
      </div>
    );
  };

  const DlcCard = ({ dlc }) => (
    <Card className="dlc-card">
      <Card.Body>
        <Card.Title>{dlc.dlcName}</Card.Title>
        <Card.Text>
          Release Date: {formatDate(dlc.releaseDate)}
        </Card.Text>
        <Card.Text>
          Price: ${dlc.price.toFixed(2)}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" className="add-to-cart-btn" onClick={addToCart}>
          <FiShoppingCart className="icon" />
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );

  GameTrailer.propTypes = {
    trailerUrl: PropTypes.string
  };

  DlcCard.propTypes = {
    dlc: PropTypes.object.isRequired
  };

  return (
    <Container className="game-detail-container">
      {message && <div className="message">{message}</div>}
      <GameTrailer trailerUrl={game?.trailerUrl} />
      <Card className="game-card">
        <Card.Header as="h1" className="game-title">{game?.title}</Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={6}>
              <Carousel showThumbs={false} dynamicHeight={false} className="game-carousel">
                {images.map((image) => (
                  <div key={image.id}>
                    <img src={image.url} alt="Game Screenshot" className="game-screenshot" />
                  </div>
                ))}
              </Carousel>
            </Col>
            <Col xs={12} md={6}>
              <div className="game-details">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <FiStar className="icon" />
                    <Rating
                      emptySymbol={<FiStar className="icon empty" />}
                      fullSymbol={<FiStar className="icon full" />}
                      initialRating={game?.averageRating}
                      readonly
                    />
                  </ListGroup.Item>
                  <ListGroup.Item><FiDollarSign className="icon" />${game?.price.toFixed(2)}</ListGroup.Item>
                  <ListGroup.Item><FiCalendar className="icon" />{formatDate(game?.releaseDate)}</ListGroup.Item>
                  <ListGroup.Item><FiBookOpen className="icon" />{game?.genre}</ListGroup.Item>
                </ListGroup>
                <Button 
                  variant="primary" 
                  className="mt-3 add-to-cart-btn" 
                  onClick={() => {
                    if (!userIsAuthenticated()) {
                      setMessage('User must be logged in to add items to the cart.');
                      return;
                    }
                    addToCart();
                  }}
                >
                  <FiShoppingCart className="icon" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline-primary"
                  className="mt-3 add-to-wishlist-btn"
                  onClick={() => {
                    if (!userIsAuthenticated()) {
                      setMessage('User must be logged in to add items to the wishlist.');
                      return;
                    }
                    addToWishlist();
                  }}
                >
                  <FiHeart className="icon" />
                  Add to Wishlist
                </Button>
              </div>
            </Col>
          </Row>
          <Card.Text className="mt-3 game-description">
            {game?.description}
          </Card.Text>
          <Row className="mt-3">
            <Col xs={12} md={4}>
              <div className="section">
                <h4 className="section-title">Developer</h4>
                <p>{game?.developer}</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="section">
                <h4 className="section-title">Age Rating</h4>
                <p>{game?.ageRating}</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="section">
                <h4 className="section-title">Platform</h4>
                <p>{game?.platform}</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <div className="section">
                <h4 className="section-title">Minimum System Requirements</h4>
                <p>{game?.minimumSystemRequirements}</p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="section">
                <h4 className="section-title">Recommended System Requirements</h4>
                <p>{game?.recommendedSystemRequirements}</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12}>
              <div className="section">
                <h4 className="section-title">Supported Languages</h4>
                <p>{game?.supportedLanguages}</p>
              </div>
            </Col>
          </Row>

          {game?.dlCs.$values.length > 0 && (
            <>
              <h3 className="mt-4 dlc-title">Downloadable Content</h3>
              <Row>
                {game?.dlCs.$values.map((dlc) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={dlc.id}>
                    <DlcCard dlc={dlc} />
                  </Col>
                ))}
              </Row>

              <ReviewSection gameId={game?.id} />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GameDetail;

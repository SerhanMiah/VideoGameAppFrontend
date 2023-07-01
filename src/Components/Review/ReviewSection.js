import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { getUserInfo } from '../Helper/auth';
import '../../Style/ReviewSection.css'

const REVIEW_API_URL = 'http://localhost:5177/api/review/'; // API URL for getting and posting reviews

const ReviewSection = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const userInfo = getUserInfo();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${REVIEW_API_URL}${gameId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('An error occurred while fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [gameId]);

  const postReview = async () => {
    const token = userInfo ? userInfo.token : null;

    if (userInfo && token) {
      try {
        const response = await axios.post(
          REVIEW_API_URL,
          {
            gameId: gameId,
            userId: userInfo.id,
            reviewText: newReview,
            rating: rating
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log('Review posted successfully');
          setReviews([...reviews, response.data]); // Update the review list with the new review
          setNewReview(""); // Clear the review input field
          setRating(0); // Clear the rating
        } else {
          console.error('Failed to post review');
        }
      } catch (error) {
        console.error('Error posting review:', error);
      }
    } else {
      console.log('User must be logged in to post reviews.');
    }
  };

  return (
    <Container className="review-section">
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <Card key={index}>
          <Card.Header>
            {review.userName}
          </Card.Header>
          <Card.Body>
            <Card.Text>{review.text}</Card.Text>
            <div className="star-rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                  <label key={i}>
                    <FaStar
                      className="star"
                      size={20}
                      color={ratingValue <= (review.rating || 0) ? "#ffc107" : "#e4e5e9"}
                    />
                  </label>
                );
              })}
            </div>
          </Card.Body>
        </Card>
      ))}

      {userInfo && (
        <Form>
          <Form.Group controlId="reviewText">
            <Form.Label>Write a review:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </Form.Group>
          <div className="star-rating">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label key={i}>
                  <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => setRating(ratingValue)} 
                  />
                  <FaStar
                    className="star"
                    size={20}
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                  />
                </label>
              );
            })}
          </div>
          <Button variant="primary" onClick={postReview}>Submit</Button>
        </Form>
      )}
    </Container>
  );
};

export default ReviewSection;

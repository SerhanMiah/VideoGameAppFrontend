import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../Components/Helper/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import mainPicture from '../img/3915806 (1).jpg';
import '../Style/ProfilePage.scss';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [wishListItems, setWishListItems] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = getToken();
        if (!token) {
          navigate('/login');
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get('http://localhost:5177/api/account/profile', config);
        setUserProfile(data);
        console.log(data)
        // Fetch user reviews
        const reviewsData = await axios.get(`http://localhost:5177/api/reviews/user/${data.id}`, config);
        setReviews(reviewsData.data);

        // Fetch wishlist items
        const wishlistData = await axios.get(`http://localhost:5177/api/wishlist`, config);
        setWishListItems(wishlistData.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [navigate]);

  const handleEditClick = (review) => {
    setEditReview(review);
    setNewComment(review.comment);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (reviewId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      };
      await axios.delete(`http://localhost:5177/api/reviews/${reviewId}`, config);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      };
      await axios.put(`http://localhost:5177/api/reviews/${editReview.id}`, { comment: newComment }, config);
      setReviews(
        reviews.map((review) => (review.id === editReview.id ? { ...review, comment: newComment } : review))
      );
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromWishList = async (itemId) => {
    try {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`http://localhost:5177/api/wishlist/${itemId}`, config);
      setWishListItems(wishListItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container as="main" className="Profile-page">
      {userProfile ? (
        <div className="row">
          <div className="col-lg-4">
            <Card className="mb-4">
              <Card.Body className="text-center">
                <div className="fb-profile">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="fb-image-profile mb-4"
                  />
                  <h5 className="mb-3">{userProfile.userName}</h5>
                  <p className="text-muted">{`${userProfile.firstName} ${userProfile.lastName}`}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-8">
            <Card className="mb-4">
              <Card.Body>
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{`${userProfile.firstName} ${userProfile.lastName}`}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userProfile.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userProfile.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userProfile.mobile}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userProfile.address}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>Your Reviews</Card.Header>
              <ListGroup variant="flush">
                {reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <h5>{review.gameName}</h5>
                    <p>{review.comment}</p>
                    <Button variant="primary" onClick={() => handleEditClick(review)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(review.id)}>
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>

            <Card className="mb-4">
              <Card.Header>Your Wishlist</Card.Header>
              <ListGroup variant="flush">
                {wishListItems.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <h5>{item.gameName}</h5>
                    <Button variant="danger" onClick={() => handleRemoveFromWishList(item.id)}>
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}

      {/* Edit Review Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;

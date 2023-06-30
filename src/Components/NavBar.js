import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userIsAuthenticated } from './Helper/auth';

const NavBar = () => {
  const isAuthenticated = userIsAuthenticated();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      window.localStorage.removeItem('local-user-Token');
      navigate('/');
      toast.success('You have been logged out');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">GAME</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/game">Game</Nav.Link>
          </Nav>
          <Form inline className="searchForm">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faUser} /> Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <FontAwesomeIcon icon={faUser} /> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <FontAwesomeIcon icon={faUser} /> Register
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </>
  );
}

export default NavBar;

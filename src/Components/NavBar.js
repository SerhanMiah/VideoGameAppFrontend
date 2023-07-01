import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { userIsAuthenticated, getUserInfo } from './Helper/auth';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const isAuthenticated = userIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        if(searchQuery !== '') {
          const res = await axios.get(`http://localhost:5177/api/games/search?title=${searchQuery}`);
          setSearchResults(res.data);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error('Failed to fetch search results', err);
      }
    };

    getSearchResults();
  }, [searchQuery]);

  const handleLogOut = async () => {
    try {
      window.localStorage.removeItem('local-user-Token');
      navigate('/');
      toast.success('You have been logged out');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand as={Link} to="/">GAME</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/game">Game</Nav.Link>
          </Nav>
          <Form inline className="searchForm">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchQuery} onChange={handleSearchChange} />
            <Button variant="outline-light">Search</Button>
            <Dropdown>
              <Dropdown.Menu>
                {searchResults.map(result => (
                  <Dropdown.Item as={Link} to={`/game/${result.id}`} key={result.id}>{result.title}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form>
          <Nav className="flex-grow-1">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faUser} /> Logout
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
              </>
            )}
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </>
  );
}

export default NavBar;

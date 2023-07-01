import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { setUserSession, setToken, setId } from '../Components/Helper/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Email: '', Password: '' });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = () => {
    axios.post('http://localhost:5177/api/account/login', { Email: user.Email, Password: user.Password })
      .then(response => {
        const token = response.data.token;  // Extract the token
        const userInfo = response.data; // Extract user info, adjust according to your API response structure
  
        // handle success
        setUserSession(token, userInfo);
        console.log(response);
        console.log('login successful', response);
      })
      .catch(error => {
        // handle error
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  
  

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center">Login</h1>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="Email" placeholder="Enter email" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="Password" placeholder="Password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={login} className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

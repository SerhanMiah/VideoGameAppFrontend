import axios from 'axios';
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    Email: '',
    Password: '',
    ConfirmPassword: '',
    FirstName: '',
    LastName: '',
    Address: '',
    City: '',
    State: '',
    PostalCode: '',
    Country: ''
  });

  const [errors, setErrors] = useState('');

  const handleChange = (event) => {
    const newObj = { ...user, [event.target.name]: event.target.value };
    setUser(newObj);
    setErrors('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5177/api/account/register', user);
      console.log('User has been successfully created', data);
      navigate('/login');
    } catch (error) {
      setErrors(error.message);
      console.log(error.message);
    }
  };

  return (
    <main className="form-page">
      <Container className="register-form crunch-form" as="main">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="FirstName"
                  placeholder="Enter your first name"
                  value={user.FirstName}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="LastName"
                  placeholder="Enter your last name"
                  value={user.LastName}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="email"
                  name="Email"
                  placeholder="Enter your email"
                  value={user.Email}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  name="Password"
                  placeholder="Enter your password"
                  value={user.Password}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  name="ConfirmPassword"
                  placeholder="Confirm your password"
                  value={user.ConfirmPassword}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="Address"
                  placeholder="Enter your address"
                  value={user.Address}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="City"
                  placeholder="Enter your city"
                  value={user.City}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="State"
                  placeholder="Enter your state"
                  value={user.State}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="PostalCode"
                  placeholder="Enter your postal code"
                  value={user.PostalCode}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="Country"
                  placeholder="Enter your country"
                  value={user.Country}
                  required
                />
              </Form.Group>

              {errors && <p className="text-danger">{errors}</p>}

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Register;

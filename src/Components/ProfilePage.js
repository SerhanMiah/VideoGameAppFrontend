import axios from 'axios';
import { useEffect, useState } from 'react';
import { getToken } from '../Components/Helper/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import mainPicture from '../img/3915806 (1).jpg';
import '../Style/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = getToken();
        if (!token) {
          navigate('/login'); // Redirect to login page if token is not available
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get('http://localhost:5177/api/account/profile', config);
        console.log(data);
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  return (
    <Container as='main' className='Profile-page'>
      <section className='bg-light' style={{ padding: '50px 0' }}>
        <div className='container py-5'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>User</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                User Profile
              </li>
            </ol>
          </nav>

          {userProfile ? (
            <div className='row'>
              <div className='col-lg-4'>
                <Card className='mb-4'>
                  <Card.Body className='text-center'>
                    <div className='fb-profile'>
                      <img
                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                        alt='avatar'
                        className='fb-image-profile mb-4'
                      />
                      <h5 className='mb-3'>{userProfile.userName}</h5>
                      <p className='text-muted'>{`${userProfile.firstName} ${userProfile.lastName}`}</p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-lg-8'>
                <Card className='mb-4'>
                  <Card.Body>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <p className='mb-0'>Full Name</p>
                      </div>
                      <div className='col-sm-9'>
                        <p className='text-muted mb-0'>
                          {`${userProfile.firstName} ${userProfile.lastName}`}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className='row'>
                      <div className='col-sm-3'>
                        <p className='mb-0'>Email</p>
                      </div>
                      <div className='col-sm-9'>
                        <p className='text-muted mb-0'>{userProfile.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='row'>
                      <div className='col-sm-3'>
                        <p className='mb-0'>Phone</p>
                      </div>
                      <div className='col-sm-9'>
                        <p className='text-muted mb-0'>{userProfile.phone}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='row'>
                      <div className='col-sm-3'>
                        <p className='mb-0'>Mobile</p>
                      </div>
                      <div className='col-sm-9'>
                        <p className='text-muted mb-0'>{userProfile.mobile}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='row'>
                      <div className='col-sm-3'>
                        <p className='mb-0'>Address</p>
                      </div>
                      <div className='col-sm-9'>
                        <p className='text-muted mb-0'>{userProfile.address}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                
              </div>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </section>
    </Container>
  );
};

export default ProfilePage;

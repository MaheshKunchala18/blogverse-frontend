import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { faUser, faBlog, faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import axios from 'axios';
import BlogCard from '../../Components/BlogCard';
import NavigationBar from '../../Components/NavigationBar';
import './Profile.css';


const Profile = () => {
  const [userName, setUserName] = useState('Unknown User');
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/username/${userId}`);
          if (response.status === 200) {
            setUserName(response.data.userName);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserName();
    fetchProfileData();
  }, [userId]);

  if (!profileData) return <div>Loading...</div>;

  return (
    <>
      <NavigationBar />
      <Container fluid className="mt-5 profile-container">
        <Row>
          <Col md={4} className="mt-5 fixed-profile">
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card className="profile-card">
                <Card.Header as="h5">
                  <FontAwesomeIcon icon={faUser} /> User Profile
                </Card.Header>
                <Card.Body>
                  <Card.Title>{userName}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><FontAwesomeIcon icon={faBlog} /> Blogs Posted: {profileData.total_blogs.length}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faEye} /> Total Views: {profileData.total_views}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faThumbsUp} /> Total Upvotes: {profileData.total_upvotes}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faThumbsDown} /> Total Downvotes: {profileData.total_downvotes}</ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col className="blog-cards" md={{ span: 8, offset: 4 }}>
            <h3 className="my-4">My Blogs</h3>
            <Row className="blog-grid">
              {profileData.total_blogs.length === 0 ? (
                <Col>
                  <p className="my-4 fs-5">No Blogs are Posted</p>
                </Col>
              ) : (
                profileData.total_blogs.map((blog, index) => (
                  <Col key={index} xs={12} sm={6} md={6} lg={6} xl={4} className="mr-1 mb-4">
                    <BlogCard {...blog} onClick={() => window.location.href = `/blog/${blog._id}`} />
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;

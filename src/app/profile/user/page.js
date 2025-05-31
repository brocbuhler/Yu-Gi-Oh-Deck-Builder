'use client';

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../utils/context/authContext';
import { Card, Col, Row } from 'react-bootstrap';
import { getUserCards } from '../../../api/cardData';
import CardGallery from '../../../components/CardGallery';



function UserPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);

  const getGallery = () => {
    getUserCards(user.uid).then(setCards);
  };

  useEffect(() => {
    getGallery();
    console.log(`this is the user ID:`, user.uid)
  }, []);

  return (
    <div>
      <Card className='h-100 w-50 border-3 border-white'>
        <h1>{user.displayName}</h1>
        <Card.Img variant='top'
          src={user.photoURL}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
        />
        <Card.Text>{user.email}</Card.Text>
      </Card>
      <Row className='g-5'>
        {cards.map(card => (
          <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
            <CardGallery cardObj={card}/>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default UserPage;

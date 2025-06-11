'use client';

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../utils/context/authContext';
import { Card, Col, Row } from 'react-bootstrap';
import { getUserCards } from '../../../api/cardData';
import CardGallery from '../../../components/CardGallery';
import DeckGallery from '../../../components/DeckGallery';
import { getDecksGallery } from '../../../api/deckData';
import PublicButton from '../../../components/PublicButton';
import { getSingleUser } from '../../../api/savedUserData';


function UserPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [builder, setbuilder] = useState({});

  const getGallery = () => {
    getUserCards(user.uid).then(setCards);
  };

  const getDecks = () => {
    getDecksGallery(user.uid).then(setDecks)
  }

  const getBuilder = () => {
    getSingleUser(user.uid).then(setbuilder)
  }
  useEffect(() => {
    getBuilder();
    getGallery();
    getDecks();
    console.log(`this is the user ID:`, user.uid)
  }, []);

  return (
    <div>
      {!builder ? (
      <PublicButton/>
      ) : null}
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
            <CardGallery cardObj={card} userEdit="true" userDelete="true" update={getGallery}/>
          </Col>
        ))}
      </Row>
      <div>
      <Row className='g-5'>
        {decks.map(deck => (
          <DeckGallery deckObj={deck} update={getDecks}/>
        ))}
      </Row>
      </div>
    </div>
  )
}

export default UserPage;

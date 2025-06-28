'use client';

import React, { useEffect, useState } from 'react';
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
    getUserCards(user.uid).then((fetchedCards) => {
      const cardArray = fetchedCards ? Object.values(fetchedCards) : [];
      setCards(cardArray);
    });
  };

  const getDecks = () => {
    getDecksGallery(user.uid).then(setDecks);
  };

  const getBuilder = () => {
    getSingleUser(user.uid).then(setbuilder);
  };

  useEffect(() => {
    getBuilder();
    getGallery();
    getDecks();
  }, [builder]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <PublicButton update={getBuilder} />
      </div>

      <Card
        className="mx-auto mb-5 border-2 border-white"
        style={{
          backgroundColor: '#2c2c2c',
          color: 'white',
          width: '350px',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <Card.Img
            variant="top"
            src={user.photoURL}
            alt="/icons/Account.png"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid white',
            }}
          />
        </div>
        <h2 style={{ textAlign: 'center' }}>{user.displayName}</h2>
        <Card.Text style={{ textAlign: 'center', fontSize: '1rem', marginTop: '0.5rem' }}>
          {user.email}
        </Card.Text>
      </Card>

      { cards.length > 0 && (<h3 style={{ marginBottom: '1rem' }}>Your Cards</h3>)}
      <Row className="g-4 mb-5">
        {cards.map((card) => (
          <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
            <CardGallery cardObj={card} userEdit="true" userDelete="true" update={getGallery} />
          </Col>
        ))}
      </Row>

      { decks.length > 0 && (<h3 style={{ marginBottom: '1rem', }}>Your Decks</h3>)}
      <Row className="g-4">
        {decks.map((deck) => (
          <Col key={deck.firebaseKey} xs={12} style={{ minHeight: '699px', minWidth: '829px' }}>
            <DeckGallery deckObj={deck} userEdit="true" userDelete="true" update={getDecks} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserPage;

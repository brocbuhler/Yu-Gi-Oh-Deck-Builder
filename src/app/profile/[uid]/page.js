'use client';

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../utils/context/authContext';
import { Card, Col, Row } from 'react-bootstrap';
import { getUserCards } from '../../../api/cardData';
import CardGallery from '../../../components/CardGallery';
import DeckGallery from '../../../components/DeckGallery';
import { getDecksGallery } from '../../../api/deckData';
import PublicButton from '../../../components/PublicButton';
import { useParams } from 'next/navigation';
import { getSingleUser } from '../../../api/savedUserData';


function UserPage() {
  const params = useParams()
  const builder = params.uid
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);

  const getUser = () => {
    console.log(params.uid)
    getSingleUser(builder).then(setUser)
  }

  const getGallery = () => {
    getUserCards(builder).then(setCards);
  };

  const getDecks = () => {
    getDecksGallery(builder).then(setDecks)
  }
  useEffect(() => {
    getUser()
    getGallery();
    getDecks();
  }, []);
  useEffect(() => {
    console.log("This is the image URL:", user.savedDisplayName)
  }, [user])

  return (
    <div>
      {!builder ? (
      <PublicButton/>
      ) : null}
      <Card className='h-100 w-50 border-3 border-white'>
        <h1>{user.savedDisplayName}</h1>
        <Card.Img variant='top'
          src={user.savedImg}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
        />
      </Card>
      <Row className='g-5'>
        {cards.map(card => (
          <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
            <CardGallery cardObj={card} update={getGallery}/>
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

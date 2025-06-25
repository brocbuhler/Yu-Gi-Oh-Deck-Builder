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
    getUserCards(builder).then((fetchedCards) => {
      const cardArray = fetchedCards ? Object.values(fetchedCards) : []
      setCards(cardArray)
    })
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
      <Card className="mx-auto mb-5 border-2 border-white"
        style={{
          backgroundColor: '#2c2c2c',
          color: 'white',
          width: '350px',
          padding: '1.5rem',
        }}>
        <h1 style={{ textAlign: 'center' }}>{user.savedDisplayName}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <Card.Img variant='top'
          src={user.savedImg}
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
      </Card>
      { cards.length > 0 && (
      <h3 style={{ marginBottom: '1rem' }}>Their Cards</h3>
      )}
      <Row className='g-5'>
        {cards.map(card => (
          <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
            <CardGallery cardObj={card} update={getGallery}/>
          </Col>
        ))}
      </Row>
      <div>
        { decks.length > 0 && (
          <h3 style={{ marginBottom: '1rem' }}>Their Decks</h3>
        )}
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

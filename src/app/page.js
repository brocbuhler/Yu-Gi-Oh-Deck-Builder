
'use client';

import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Button, Col, Row } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getCardGallery, getCardbyDeck } from '../api/cardData';
import CardGallery from '../components/CardGallery';

function Home() {
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const { user } = useAuth();

  const getGallery = () => {
    getCardGallery(false).then(setCards);
  };
  
  const getRandomCardsDeck = () => {
    let ranDeck = Math.floor((Math.random() * 2)) + 1
    getCardbyDeck(ranDeck).then(setDecks)
  };

  useEffect(() => {
    getGallery();
    getRandomCardsDeck();
    console.log('API KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log(`This is your uid:`, user.uid)
  }, []);
  
  useEffect(() => {
    console.log(`Here is the card Gallery:`, cards)
    console.log(`Here is a test deck:`, decks)
  }, [cards, decks])

  return (
    <Row className='g-5'>
      {cards.map(card => (
        <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
          <CardGallery cardObj={card} update={getGallery}/>
        </Col>
      ))}
    </Row>
  );
}

export default Home;

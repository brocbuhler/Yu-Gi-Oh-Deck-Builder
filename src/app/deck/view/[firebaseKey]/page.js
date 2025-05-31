'use client';

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext'; 
import { getCardbyDeck } from '@/api/cardData';         
import CardGallery from '@/components/CardGallery';     
import { useParams } from 'next/navigation';


export default function DeckPage() {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();
  const params = useParams();
  const deckId = params.firebaseKey

  const getGallery = () => {
    getCardbyDeck(deckId).then(setCards);
  };

  useEffect(() => {
    getGallery();
    console.log('API KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log(`This is your uid:`, user.uid)
  }, []);
  
  useEffect(() => {
    console.log(`Here is the card Gallery:`, cards)
  }, [cards])

  return (
    <Row className='g-5'>
      {cards.map(card => (
        <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
          <CardGallery cardObj={card}/>
        </Col>
      ))}
    </Row>
  );
}

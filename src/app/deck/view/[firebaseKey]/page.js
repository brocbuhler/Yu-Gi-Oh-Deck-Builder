'use client';

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getCardbyDeck } from '@/api/cardData';         
import CardGallery from '@/components/CardGallery';     
import DrawButton from '@/components/DrawButton';
import { useParams } from 'next/navigation';


export default function DeckPage() {
  const [cards, setCards] = useState([]);
  const params = useParams();
  const deckId = params.firebaseKey

  const getGallery = () => {
    getCardbyDeck(deckId).then(setCards);
  };

  const cardDraw = () => {
    let cardList = cards.length
    let randomCard = Math.floor(Math.random() * cardList) 
    return cards[randomCard]
  }

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <>
    <DrawButton draw={cardDraw}/>
    <Row className='g-5'>
      {cards.map(card => (
        <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
          <CardGallery cardObj={card} userDelete="true" update={getGallery}/>
        </Col>
      ))}
    </Row>
    </>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { getCardbyDeck } from '@/api/cardData';         
import CardGallery from '@/components/CardGallery';     
import DrawButton from '@/components/DrawButton';
import { useParams } from 'next/navigation';
import { getSingleDeck } from '../../../../api/deckData';
import { useAuth } from '../../../../utils/context/authContext';

export default function DeckPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [draws, setDraws] = useState([]);
  const [deck, setDeck] = useState({})
  const [drawMode, setDrawMode] = useState(false);
  const params = useParams();
  const deckId = params.firebaseKey

  const getGallery = () => {
    getCardbyDeck(deckId).then(setCards);
    setDrawMode(false)
  };
  const getDeck = () => {
     getSingleDeck(deckId).then(setDeck);
  }

  const cardDraw = (amount) => {
    const drawn = [];
    let cardList = [...cards]
    const drawCount = Math.min(amount, cardList.length)
    for (let i=0; i < drawCount; i++) {
    let randomCards = Math.floor(Math.random() * cardList.length) 
    drawn.push(cardList[randomCards])
    cardList.splice(randomCards, 1)
    }
    setDraws(drawn)
    setDrawMode(true)
    return drawn
  }

  useEffect(() => {
    getGallery();
    getDeck();
  }, []);

  const userDelete = deck.uid === user?.uid;

  return (
    <>
      {!drawMode ? (<h1>{deck.title}</h1>) : null}
      <DrawButton draw={cardDraw} />

      <Row className='g-5'>
        {drawMode && draws ? (
          draws.map(draw => (
          <Col key={draw.firebaseKey} xs={8} sm={6} md={5} lg={4}>
            <CardGallery cardObj={draw} userDelete={userDelete} update={getGallery} />
          </Col>
          ))
        ) : (
          cards.map(card => (
            <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
              <CardGallery cardObj={card} userDelete={userDelete} update={getGallery} />
            </Col>
          ))
        )}
      </Row>
        {drawMode ? (
      <Button onClick={() => setDrawMode(false)}>Back to deck</Button>
        ) : null}
    </>
  );
}

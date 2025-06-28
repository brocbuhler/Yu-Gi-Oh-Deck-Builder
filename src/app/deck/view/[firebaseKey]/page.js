'use client';

import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { getCardbyDeck } from '@/api/cardData';         
import CardGallery from '@/components/CardGallery';     
import DrawButton from '@/components/DrawButton';
import { useParams } from 'next/navigation';
import { getSingleDeck } from '../../../../api/deckData';
import { useAuth } from '../../../../utils/context/authContext';
import SearchBar from '../../../../components/SearchBar';
import DeckStats from '../../../../components/DeckStats';

export default function DeckPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [draws, setDraws] = useState([]);
  const [deck, setDeck] = useState({});
  const [drawMode, setDrawMode] = useState(false);
  const [searchCards, setSearchCards] = useState([]);
  const [searchState, setSearchState] = useState('');

  const params = useParams();
  const deckId = params.firebaseKey;

  const getGallery = () => {
    getCardbyDeck(deckId).then((fetchedCards) => {
      setCards(fetchedCards);
      setSearchCards(fetchedCards);
    });
    setDrawMode(false);
  };

  const getDeck = () => {
    getSingleDeck(deckId).then(setDeck);
  };

  const cardDraw = (amount) => {
    const drawn = [];
    let cardList = [...cards];
    const drawCount = Math.min(amount, cardList.length);
    for (let i = 0; i < drawCount; i++) {
      let randomCards = Math.floor(Math.random() * cardList.length);
      drawn.push(cardList[randomCards]);
      cardList.splice(randomCards, 1);
    }
    setDraws(drawn);
    setDrawMode(true);
    return drawn;
  };

  useEffect(() => {
    getGallery();
    getDeck();
  }, []);

  useEffect(() => {
    const lowerSearch = searchState.toLowerCase();
    setSearchCards(
      cards.filter((card) => card.name.toLowerCase().includes(lowerSearch))
    );
  }, [searchState, cards]);

  const deckCardDelete = deck.uid === user?.uid;

  return (
    <div style={{ paddingTop: '7%', paddingLeft: '5%', paddingRight: '5%' }}>
      {!drawMode ? <h1 style={{ color: 'white' }}>{deck.title}</h1> : null}
      <div
        style={{
          backgroundColor: '#343a40',
          border: '1px solid #495057',
          borderRadius: '0.375rem',
          padding: '0.5rem',
          marginBottom: '1.5rem',
          width: 'fit-content',
        }}
      >
        <DrawButton draw={cardDraw} />
      </div>
        
      {!drawMode ? (
        <div style={{ marginBottom: '2rem' }}>
          <SearchBar cardList={setSearchState} />
          <DeckStats deckId={deckId}/>
        </div>
      ) : null}

      <Row className="g-5">
        {drawMode && draws ? (
          draws.map((draw) => (
            <Col key={draw.firebaseKey} xs={8} sm={6} md={5} lg={4}>
              <CardGallery
                cardObj={draw}
                deckCardDelete={deckCardDelete}
                update={getGallery}
              />
            </Col>
          ))
        ) : (
          searchCards.map((card) => (
            <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
              <CardGallery
                cardObj={card}
                deckCardDelete={deckCardDelete}
                update={getGallery}
              />
            </Col>
          ))
        )}
      </Row>

      {drawMode ? (
        <Button
          onClick={() => setDrawMode(false)}
          style={{ marginTop: '2rem' }}
        >
          Back to deck
        </Button>
      ) : null}
    </div>
  );
}

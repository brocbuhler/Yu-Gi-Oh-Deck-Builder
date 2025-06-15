
'use client';

import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { getCardGallery } from '../api/cardData';
import CardGallery from '../components/CardGallery';
import SearchBar from '../components/SearchBar';

function Home() {
  const [cards, setCards] = useState([]);
  const [searchCards, setSearchCards] = useState([])
  const [searchState, setSearchState] = useState('')

  const getGallery = () => {
    getCardGallery().then((fetchedCards) => {
      setCards(fetchedCards)
      setSearchCards(fetchedCards)
    });
  };

  useEffect(() => {
    getGallery();
  }, []);

  useEffect(() => {
    const lowerSearch = searchState.toLowerCase();
    setSearchCards(
      cards.filter(card => card.name.toLowerCase().includes(lowerSearch))
    )
  }, [searchState, cards])

  return (
    <div>
    <SearchBar cardList={setSearchState}/>
    <Row className='g-5'>
      {searchCards.map(card => (
        <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
          <CardGallery cardObj={card} update={getGallery}/>
        </Col>
      ))}
    </Row>
    </div>
  );
}

export default Home;

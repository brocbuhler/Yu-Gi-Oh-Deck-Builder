'use client';

import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { getCardGallery } from '../api/cardData';
import CardGallery from '../components/CardGallery';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

function Home() {
  const [cards, setCards] = useState([]);
  const [searchCards, setSearchCards] = useState([]);
  const [searchState, setSearchState] = useState('');
  const [cardFilters, setCardFilters] = useState({
    attack: '',
    defense: '',
    monsterLevel: '',
    card: '',
    vol: '',
    attribute: '',
  });

  const getGallery = () => {
    getCardGallery().then((fetchedCards) => {
      setCards(fetchedCards);
      setSearchCards(fetchedCards);
      console.log("cards:", fetchedCards)
    });
  };

  const filterUse = (e) => {
    const { name, value } = e.target;
    setCardFilters((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    getGallery();
  }, []);

  useEffect(() => {
    const lowerSearch = searchState.toLowerCase();
    setSearchCards(
      cards.filter((card) => card.name.toLowerCase().includes(lowerSearch))
    );
  }, [searchState, cards]);

  useEffect(() => {
    const lowerSearch = searchState.toLowerCase();

    const filteredCards = cards.filter((card) => {
      const nameMatch = card.name.toLowerCase().includes(lowerSearch);

      const attackFilter =
        cardFilters.attack === '' ||
        (card.attack !== undefined && card.attack !== null && parseInt(card.attack) >= parseInt(cardFilters.attack));

      const defenseFilter = 
        cardFilters.defense === '' ||
        (card.defense !== undefined && card.defense !== null && parseInt(card.defense) >= parseInt(cardFilters.defense))

      const monsterLevelFilter =
        cardFilters.monsterLevel === '' ||
        (card.monsterLevel !== undefined && card.monsterLevel !== null && parseInt(card.monsterLevel) == parseInt(cardFilters.monsterLevel))

      const cardTypeFilter = 
        cardFilters.card === '' ||
        (card.card && card.card == cardFilters.card)

      const volFilter = 
        cardFilters.vol === '' ||
        (card.vol && card.vol == cardFilters.vol)

      const attributeFilter =
        cardFilters.attribute === '' ||
        (card.attribute && card.attribute == cardFilters.attribute)

      return nameMatch && attackFilter && defenseFilter && monsterLevelFilter && cardTypeFilter && volFilter && attributeFilter;
    });

    setSearchCards(filteredCards);
  }, [cardFilters, searchState, cards]);

  return (
    <div>
      <SearchBar cardList={setSearchState} />
      <Filters filterList={filterUse} />
      <Row className="g-5">
        {searchCards.map((card) => (
          <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
            <CardGallery cardObj={card} update={getGallery} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;


'use client';

import { useEffect, useState } from "react";
import { getPublicCards } from "../../../api/cardData";
import { Col, Row } from "react-bootstrap";
import CardGallery from '@/components/CardGallery';
import SearchBar from "../../../components/SearchBar";

function Home() {
  const [cards, setCards] = useState([]);
  const [searchCards, setSearchCards] = useState([])
  const [searchState, setSearchState] = useState('')

  const getGallery = () => {
    getPublicCards(true).then((fetchedCards) => {
      const cardArray = fetchedCards ? Object.values(fetchedCards) : []
      setCards(cardArray)
      setSearchCards(cardArray)
    })
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
  <div style={{ paddingTop: '7%', paddingLeft: '5%', paddingRight: '5%' }}>
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <SearchBar cardList={setSearchState} />
      </div>
    <Row className='g-5'>
      {searchCards.map(card => (
        <Col key={card.firebaseKey} xs={8} sm={6} md={5} lg={4}>
          <CardGallery cardObj={card} update={getGallery}/>
        </Col>
      ))}
    </Row>
    </div>
  </div>
  );
}

export default Home;

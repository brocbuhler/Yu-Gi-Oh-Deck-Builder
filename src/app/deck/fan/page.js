
'use client';

import { useEffect, useState } from "react";
import { getCardGallery } from "../../../api/cardData";
import { Col, Row } from "react-bootstrap";
import CardGallery from '@/components/CardGallery';

function Home() {
  const [cards, setCards] = useState([]);

  const getGallery = () => {
    getCardGallery(true).then(setCards);
  };

  useEffect(() => {
    getGallery();
  }, []);

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

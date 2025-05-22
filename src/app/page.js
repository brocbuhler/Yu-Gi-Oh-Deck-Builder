
'use client';

import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getCardGallery, getCardbyDeck } from '../api/cardData';

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
    <div className="text-center my-4">
      WELCOME
    </div>
  );
}

export default Home;

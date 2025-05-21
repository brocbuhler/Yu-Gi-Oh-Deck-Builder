
'use client';

import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import getCardGallery from '../api/cardData';

function Home() {
  const [cards, setCards] = useState([]);

  const { user } = useAuth();

  const getGallery = () => {
    getCardGallery(false).then(setCards);
  };

  useEffect(() => {
    getGallery();
    console.log('API KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log(`This is your uid:`, user.uid)
    console.log(`Here is the card Gallery:`, cards)
  }, []);

  return (
    <div className="text-center my-4">
      WELCOME
    </div>
  );
}

export default Home;

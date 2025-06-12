"use client";

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { saveUser, updateUser } from '../api/savedUserData';
import { getCardsMakePublic, updateCard } from '../api/cardData';

export default function PublicButton({ update }) {
  const { user } = useAuth();

  const saveUserData = () => {
    getCardsMakePublic(user.uid).then((cardObj) => {
      const cards = Object.values(cardObj || {})
      cards.forEach((card) => {
        const patchPayload = {
          public: true,
          firebaseKey: card.firebaseKey,
        }
        updateCard(patchPayload)
      });
    })
    const payload = {
      savedDisplayName: user.displayName,
      savedImg: user.photoURL,
      savedUID: user.uid
    };
    saveUser(payload).then(({ name }) => {
      console.log('saveUser response:', name);
      const patchPayload = { ...payload, firebaseKey: name };
      updateUser(patchPayload);
    });
    if (update) update();
  };

  return (
    <div>
      <Button onClick={saveUserData}>GO PUBLIC</Button>
    </div>
  );
}

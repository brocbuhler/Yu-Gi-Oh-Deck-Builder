"use client";

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteUser, getSingleUser, saveUser, updateUser } from '../api/savedUserData';
import { getCardsMakePublic, getUserCards, updateCard } from '../api/cardData';
import { object } from 'prop-types';

export default function PublicButton({ update }) {
  const { user } = useAuth();
  const [isPublic, setIsPublic] = useState(false);
  
  const isUserPublic = () => {
    getSingleUser(user.uid).then((fetchedUser) => {
      if (fetchedUser) {
        setIsPublic(true)
      }
    })
  }

  useEffect(() => {
    isUserPublic()
  },[user])

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

  const deleteUserData = () => {
    getUserCards(user.uid).then((cardObj) => {
      const cards = Object.values(cardObj || {})
      cards.forEach((card) => {
        const patchPayload ={
          public: false,
          firebaseKey: card.firebaseKey
        }
        updateCard(patchPayload)
      })
    })
    getSingleUser(user.uid).then((fetchedUser) => {
      deleteUser(fetchedUser.firebaseKey)
    })
    
    if (update) update();
  }

  const userDataToggle = () => {
    const switchState = !isPublic
    setIsPublic(switchState)

    if (switchState) {
      saveUserData()
    } else {
      deleteUserData()
    }
  }
  return (
    <div>
      <Form>
        <Form.Check type='switch' label='Private-Public' onChange={userDataToggle} checked={isPublic}/>
      </Form>
    </div>
  );
}

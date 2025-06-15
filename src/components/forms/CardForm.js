'use client';

import React, { useEffect, useState } from 'react'
import { createCard, updateCard } from '../../api/cardData';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { getDecksGallery } from '../../api/deckData';
import { getSingleUser } from '../../api/savedUserData';

const cardInit = {
      name:"",
      vol:"",
      attack:"",
      attribute:"",
      defense:"",
      description:"",
      image:"",
      type:"",
      prevDeckId:"",
      card:"",
};

export default function CardForm({card = cardInit}) {
  const { user } = useAuth();
  const [cardInput, setCardInput] = useState(card);
  const router = useRouter();
  const [deckList, setDeckList] = useState([]);
  const [deckSelector, setDeckSelector] = useState('');
  const [builder, setBuilder] = useState({})

  const cardChange = (e) => {
    const {name, value } = e.target;
    setCardInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const grabDeckList = () => {
    getDecksGallery(user.uid).then(setDeckList)
  }

  const getBuilder = () => {
    getSingleUser(user.uid).then(setBuilder)
  }

const cardSubmit = (e) => {
  e.preventDefault();
  
  const payload = {
    ...cardInput,
    attack: parseInt(cardInput.attack, 10) || 0,
    defense: parseInt(cardInput.defense, 10) || 0,
    uid: user.uid,
  }

  if (builder) {
    payload.public = true;
  }
  
  if (card.firebaseKey) {
    const deckSelectorChecker = deckSelector && deckSelector !== card.prevDeckId;

    if (deckSelectorChecker) {
      const updatePayload = {
        ...payload,
        prevDeckId: deckSelector,
        deckId: '',
      };

      updateCard(updatePayload).then(() => {
        const copyCardPayload = {
          ...payload,
          deckId: deckSelector,
          prevDeckId: "",
          firebaseKey: "",
        };

        createCard(copyCardPayload).then(({ name }) => {
          const finalNewCopy = { ...copyCardPayload, firebaseKey: name };
          updateCard(finalNewCopy).then(() => {
            router.push('/profile/user');
          });
        });
      });
    } else {
      updateCard(payload).then(() => {
        router.push("/profile/user");
      });
    }
  } else {
    createCard(payload).then(({ name }) => {
      const patchPayload = { ...payload, firebaseKey: name };
      updateCard(patchPayload).then(() => {
        if (cardInput.deckId) {
          const copiedPayload = {
            ...payload,
            prevDeckId: cardInput.deckId,
            deckId: '',
            uid: user.uid,
          };
          createCard(copiedPayload).then(({ name: copyKey }) => {
            const finalCopy = { ...copiedPayload, firebaseKey: copyKey };
            updateCard(finalCopy).then(() => {
              router.push("/profile/user");
            });
          });
        } else {
          router.push("/profile/user");
        }
      });
    });
  }
};

  useEffect(() => {
    getBuilder()
    const initDeckId = card.prevDeckId
    setDeckSelector(initDeckId)
    setCardInput({
      name: card.name || '',
      type: card.type || '',
      attack: card.attack || '',
      defense: card.defense || '',
      description: card.description || '',
      image: card.image || '',
      attribute: card.attribute || '',
      firebaseKey: card.firebaseKey || '',
      deckId: initDeckId,
    });
    grabDeckList()
}, [card]);

  console.log("CardForm loaded with input:", cardInput);


  return (
    <div>
      <Form onSubmit={cardSubmit}>
        <h1>{card.firebaseKey ? "Edit" : "Make"} a card</h1>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            rows={4}
            placeholder="Shadow Realm"
            name="name"
            value={cardInput.name}
            onChange={cardChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            placeholder="Card picture"
            name="image"
            type='url'
            value={cardInput.image}
            onChange={cardChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Attribute</Form.Label>
          <Form.Control
            as='select'
            name="attribute"
            value={cardInput.attribute}
            onChange={cardChange}
            required
          >
            <option value="">Select a attribute</option>
            <option value="DARK">DARK</option>
            <option value="DIVINE">DIVINE</option>
            <option value="EARTH">EARTH</option>
            <option value="FIRE">FIRE</option>
            <option value="LIGHT">LIGHT</option>
            <option value="WATER">WATER</option>
            <option value="WIND">WIND</option>
            </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>What kind of card?</Form.Label>
          <Form.Control
            as='select'
            name="card"
            value={cardInput.card}
            onChange={cardChange}
            required
          >
            <option value="">Select</option>
            <option value="Monster">Monster</option>
            <option value="Spell">Spell</option>
            <option value="Trap">Trap</option>
            </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            placeholder="Dragon, fairy, etc"
            name="type"
            value={cardInput.type}
            onChange={cardChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Attack</Form.Label>
          <Form.Control
            placeholder="1900"
            name="atk"
            value={cardInput.atk}
            onChange={cardChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Defense</Form.Label>
          <Form.Control
            placeholder="500"
            name="defense"
            value={cardInput.defense}
            onChange={cardChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Shadow Realm is where I dwell"
            name="description"
            value={cardInput.description}
            onChange={cardChange}
            required
          />
        </Form.Group>

        <FloatingLabel controlId='floatingSelect' label="Add card to a Deck?">
          <Form.Select aria-label="Decks:" name="deckId" value={deckSelector} onChange={(e) => {
              const value = e.target.value;
              setDeckSelector(value);
              cardChange(e);
            }} className="mb-3">
            <option value="">No deck selected</option>
            {deckList.map((deck) => (
              <option key={deck.firebaseKey} value={deck.firebaseKey}>
              TITLE: {deck.title} | {deck.description}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <Button type="submit">{card.firebaseKey ? "Edit" : "Make"} card</Button>
      </Form>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react'
import { copyCardToDeck, createCard, updateCard, updateCopy } from '../../api/cardData';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { getDecksGallery } from '../../api/deckData';

const cardInit = {
      name:"",
      attack:"",
      attribute:"",
      defense:"",
      description:"",
      image:"",
      type:"",
      card:"",
};

export default function CardForm({card = cardInit}) {
  const { user } = useAuth();
  const [cardInput, setCardInput] = useState(card);
  const router = useRouter();
  const [deckList, setDeckList] = useState([]);

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

  const cardSubmit = (e) => {
    e.preventDefault();
    const payload = { ...cardInput, uid: user.uid}

    const copyCard = (cardData) => {
      if (payload.deckId) {
        const deckCopy = {
          ...cardData,
          deckId: payload.deckId,
        };
        copyCardToDeck(deckCopy).then(({ name }) => {
          const patchCopy = { ...deckCopy, firebaseKey: name}
          updateCopy(patchCopy)
        })
      }
    }

    if (card.firebaseKey) {
      updateCard(payload).then(() => {
        copyCard(payload)
        router.push(`/profile/user`)
      })
    } else {
      createCard(payload).then(({ name }) => {
        const patchPayload = { ...payload, firebaseKey: name }
        updateCard(patchPayload).then(() => {
          copyCard(patchPayload)
          router.push("/profile/user")
        })
      })
    }
  }

  useEffect(() => {
    setCardInput({
      name: card.name || '',
      type: card.type || '',
      attack: card.attack || '',
      defense: card.defense || '',
      description: card.description || '',
      image: card.image || '',
      attribute: card.attribute || '',
      firebaseKey: card.firebaseKey || '',
      deckId: card.deckId || '',
      monsterLevel: card.monsterLevel || '',
      card: card.card || '',
    });
    grabDeckList()
}, [card]);

  console.log("CardForm loaded with input:", cardInput);

  const inputStyle = {
    backgroundColor: '#2e2e2e',
    color: 'white',
    borderColor: '#444',
  };

  return (
    <div>
      <Form onSubmit={cardSubmit}>
        <h1>{card.firebaseKey ? "Edit" : "Make"} a Card</h1>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Shadow Realm"
            name="name"
            value={cardInput.name}
            onChange={cardChange}
            required
            style={inputStyle}
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
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>What kind of card?</Form.Label>
          <Form.Control
            as='select'
            name="card"
            value={cardInput.card}
            onChange={cardChange}
            required
            style={inputStyle}
          >
            <option value="">Select</option>
            <option value="Monster">Monster</option>
            <option value="Spell">Spell</option>
            <option value="Trap">Trap</option>
            </Form.Control>
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
            style={inputStyle}
          />
        </Form.Group>

        <FloatingLabel controlId='floatingSelect' label="Add card to a Deck?">
          <Form.Select
            aria-label="Decks:"
            name="deckId"
            value={cardInput.deckId}
            onChange={cardChange}
            className="mb-3"
            style={inputStyle}
          >
            <option value="">No deck selected</option>
            {deckList.map((deck) => (
              <option key={deck.firebaseKey} value={deck.firebaseKey}>
              TITLE: {deck.title} | {deck.description}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {cardInput.card === 'Monster' && (
        <>
        <h1>Monster Card Characteristics</h1>
        <Form.Group className="mb-3">
          <Form.Label>Attribute</Form.Label>
          <Form.Control
            as='select'
            name="attribute"
            value={cardInput.attribute}
            onChange={cardChange}
            required
            style={inputStyle}
          >
            <option value="">Select a attribute</option>
              <option value="Dark">DARK</option>
              <option value="Divine">DIVINE</option>
              <option value="Earth">EARTH</option>
              <option value="Fire">FIRE</option>
              <option value="Light">LIGHT</option>
              <option value="Water">WATER</option>
              <option value="Wind">WIND</option>
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
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Attack</Form.Label>
          <Form.Control
            type='number'
            placeholder="1900"
            name="attack"
            value={cardInput.attack}
            onChange={cardChange}
            required
            style={inputStyle}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Defense</Form.Label>
          <Form.Control
            type='number'
            placeholder="500"
            name="defense"
            value={cardInput.defense}
            onChange={cardChange}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Monster Level</Form.Label>
          <Form.Control
            type='number'
            placeholder="4"
            name="monsterLevel"
            value={cardInput.monsterLevel}
            onChange={cardChange}
            required
            style={inputStyle}
          />
        </Form.Group>
        </>
        )}

        <Button type="submit">{card.firebaseKey ? "Edit" : "Make"} card</Button>
      </Form>
    </div>
  );
}

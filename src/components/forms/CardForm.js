'use client';

import React, { useState } from 'react'
import { createCard, updateCard } from '../../api/cardData';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { Button, Form } from 'react-bootstrap';

const cardInit = {
      abilities:"",
      atk:"",
      class:"",
      defence:"",
      description:"",
      fanMade:"",
      image:"",
      type:"",
};

export default function CardForm({card = cardInit}) {
  const { user } = useAuth();
  const [cardInput, setCardInput] = useState(card);
  const router = useRouter();
  const cardChange = (e) => {
    const {name, value } = e.target;
    setCardInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const cardSubmit = (e) => {
    e.preventDefault();
    if (card.firebaseKey) {
      console.log("edit not set up yet");
    } else {
      const payload = {
        ...cardInput,
        atk: parseInt(cardInput.atk, 10) || 0,
        defence: parseInt(cardInput.defence, 10) || 0,
        fanMade: true,
        uid: user.uid
      };
      createCard(payload).then(({ name }) => {
        const patchPayload = { ...payload, firebaseKey: name };
        updateCard(patchPayload).then(() => {
          router.push("/");
        });
      });
    }
  };

  return (
    <div>
      <Form onSubmit={cardSubmit}>
        <h1>{card.firebaseKey ? "Edit" : "Make"} a card</h1>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            placeholder="Card picture"
            name="image"
            type='url'
            value={cardInput.image}
            onChange={cardChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as='select'
            name="Type"
            value={cardInput.Type}
            onChange={cardChange}
          >
            <option value="">Select a Type</option>
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
          <Form.Label>Class</Form.Label>
          <Form.Control
            placeholder="Dragon, fairy, etc"
            name="class"
            value={cardInput.class}
            onChange={cardChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Attack</Form.Label>
          <Form.Control
            placeholder="1900"
            name="atk"
            value={cardInput.atk}
            onChange={cardChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Defence</Form.Label>
          <Form.Control
            placeholder="500"
            name="defence"
            value={cardInput.defence}
            onChange={cardChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Abilities</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Shadow Realm is where I dwell"
            name="abilities"
            value={cardInput.abilities}
            onChange={cardChange}
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
          />
        </Form.Group>

        <Button type="submit">{card.firebaseKey ? "Edit" : "Make"} card</Button>
      </Form>
    </div>
  );
}

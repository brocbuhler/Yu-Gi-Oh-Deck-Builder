"use client";

import React, { useState } from "react";
import { useAuth } from "@/utils/context/authContext";
import { Button, Form } from "react-bootstrap";
import { createDeck, updateDeck } from "../../api/deckData";
import { useRouter } from "next/navigation";

const deckInit = {
  description: "",
  title: "",
};

const gradientStyle = {
    background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
  };

export default function DeckForm({ dek = deckInit }) {
  const { user } = useAuth();
  const [deckInput, setDeckInput] = useState(dek);
  const router = useRouter();

  const inputStyle = {
    backgroundColor: '#2e2e2e',
    color: 'white',
    borderColor: '#444',
  };

  const deckChange = (e) => {
    const {name, value } = e.target;
    setDeckInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deckSubmit = (e) => {
    e.preventDefault();
    if (dek.firebaseKey) {
      const payload = { ...deckInput, uid: user.uid };
      updateDeck(payload).then(() => {
        router.push("/profile/user")
      })
    } else {
      const payload = { ...deckInput, uid: user.uid };
      createDeck(payload).then(({ name }) => {
        const patchPayload = { ...payload, firebaseKey: name };
        updateDeck(patchPayload).then(() => {
          router.push("/profile/user");
        });
      });
    }
  };

  return (
    <div>
      <Form onSubmit={deckSubmit}>
        <h1>{dek.firebaseKey ? "Edit" : "Make"} a Deck</h1>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Blue Eyes White ETC..."
            name="title"
            value={deckInput.title}
            onChange={deckChange}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Shadow Realm is where I dwell"
            name="description"
            value={deckInput.description}
            onChange={deckChange}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Button type="submit" style={gradientStyle}>{dek.firebaseKey ? "Edit" : "Make"} Deck</Button>
      </Form>
    </div>
  );
}

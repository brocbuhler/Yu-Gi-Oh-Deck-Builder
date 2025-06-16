import React, { useEffect, useState } from 'react';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import '../styles/cards.css';
import { useAuth } from '../utils/context/authContext';
import { getDecksGallery } from '../api/deckData';
import { copyCardToDeck, deleteCard, deleteDeckCard, updateCardToDeck } from '../api/cardData';
import { useRouter } from 'next/navigation';

// aspect ratio for the cards is 86 : 125
export default function CardGallery({ cardObj, userEdit = false, userDelete = false, deckCardDelete = false, update }) {
  const router = useRouter();
  const [deckList, setDeckList] = useState([]);
  const [deckSelector, setDeckSelector] = useState('');
  const { user } = useAuth();

  const grabDeckList = () => {
    getDecksGallery(user.uid).then(setDeckList);
  };

  useEffect(() => {
    grabDeckList();
  }, []);

  const addCardToDeck = () => {
    const payload = {
      name: cardObj.name,
      vol: cardObj.vol,
      attack: cardObj.attack,
      attribute: cardObj.attribute,
      defense: cardObj.defense,
      description: cardObj.description,
      image: cardObj.image,
      type: cardObj.type,
      card: cardObj.card,
      deckId: deckSelector,
    };

    copyCardToDeck(payload).then(({ name }) => {
      const patchPayload = { ...payload, firebaseKey: name };
      updateCardToDeck(patchPayload).then(() => {
        if (update) update();
      });
    });
  };

  const deleteUserCard = (key) => {
    deleteCard(key).then(() => {
      if (update) update();
    });
  };

  const deleteCardFromDeck = (key) => {
    deleteDeckCard(key).then(() => {
      if (update) update();
    });
  };

  // 🌇 Gradient button style
  const gradientStyle = {
    background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    transition: 'background 0.3s ease-in-out'
  };

  return (
    <Card className="card-hover h-100 border-1 border-white overflow-hidden">
      <Card.Img src={cardObj.image} />
      <div className="card-overlay">
        <div className="overlay-text">
          Card Name: {cardObj.name}, <br />
          {cardObj.card}
          <br />
          {cardObj.description}
          <br />

          {cardObj.card === 'Monster' && (
            <div>
              Card Attribute: {cardObj.attribute}
              <br />
              Card Type: {cardObj.type}
              <br />
              Attack: {cardObj.attack}
              <br />
              Defense: {cardObj.defense}
              <br />
            </div>
          )}

          Vol: {cardObj.vol}
        </div>

        <Button
          type="button"
          style={gradientStyle}
          disabled={!deckSelector}
          onClick={() => {
            addCardToDeck();
            alert('Card added to deck!');
          }}
        >
          Add to Deck?
        </Button>

        {!deckSelector && (
          <div className="text-warning mt-2">Please select a deck first</div>
        )}

        <FloatingLabel controlId="floatingSelect" label="Decks:">
          <Form.Select
            aria-label="Decks:"
            name="deckId"
            onChange={(e) => setDeckSelector(e.target.value)}
            className="mb-3"
          >
            <option value="">Decks:</option>
            {deckList.map((deck) => (
              <option key={deck.firebaseKey} value={deck.firebaseKey}>
                TITLE: {deck.title} | {deck.description}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {userEdit && (
          <Button
            type="button"
            style={gradientStyle}
            onClick={() => {
              router.push(`/card/edit/${cardObj.firebaseKey}`);
            }}
          >
            Edit
          </Button>
        )}

        {userDelete && (
          <Button
            type="button"
            style={gradientStyle}
            onClick={() => {
              deleteUserCard(cardObj.firebaseKey);
            }}
          >
            Delete
          </Button>
        )}

        {deckCardDelete && (
          <Button
            type="button"
            style={gradientStyle}
            onClick={() => {
              deleteCardFromDeck(cardObj.firebaseKey);
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}

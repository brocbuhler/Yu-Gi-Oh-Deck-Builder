import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteDeck } from '../api/deckData';
import { useRouter } from 'next/navigation';
import deleteDecksCards from '../api/mergedData';

// aspect ratio for the cards is 86 : 125

export default function DeckGallery({ deckObj, userEdit = false, userDelete = false, update }) {
  const router = useRouter();

  const deleteUserDeck = (key) => {
    deleteDeck(key);
  };

  // 🌇 Gradient button style
  const gradientStyle = {
    background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    margin: '0.25rem',
    transition: 'background 0.3s ease-in-out'
  };

  // 🕶️ Dark background style for the card
  const cardStyle = {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: '1rem',
    border: '1px solid #333'
  };

  return (
    <Card className="card-hover h-100 overflow-hidden" style={cardStyle}>
      <h1>{deckObj.title}</h1>
      <Card.Text>{deckObj.description}</Card.Text>

      {userEdit && (
        <Button type="button" style={gradientStyle} onClick={() => {
          router.push(`/deck/edit/${deckObj.firebaseKey}`);
        }}>
          Edit
        </Button>
      )}

      {userDelete && (
        <Button type="button" style={gradientStyle} onClick={() => {
          console.log("delete button clicked!");
          deleteUserDeck(deckObj.firebaseKey);
        }}>
          Delete
        </Button>
      )}

      <Button type="button" style={gradientStyle} onClick={() => {
        router.push(`/deck/view/${deckObj.firebaseKey}`);
      }}>
        View
      </Button>
    </Card>
  );
}

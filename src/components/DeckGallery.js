import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteDeck } from '../api/deckData';
import { useRouter } from 'next/navigation';
import deleteDecksCards from '../api/mergedData';


export default function DeckGallery({ deckObj, userEdit = false, userDelete = false, update }) {
  const router = useRouter();

  const deleteUserDeck = (key) => {
    deleteDeck(key);
  };

  const gradientStyle = {
    background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
    color: 'white',
    border: '2px solid black',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    margin: '0.25rem',
    transition: 'background 0.3s ease-in-out'
  };

  const cardStyle = {
    backgroundImage: 'url("/images/YGOdeckGraphic.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontWeight: 'bold',
    textShadow: '2px 2px 2px black',
    color: 'white',
    padding: '1rem',
    width: '829px',
    minHeight: '699px',
    borderRadius: '7%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column', 
  };

  const titleBox = {
    background: 'black',
    alignItems: 'center',
    margin: '0 auto',
    padding: '10px',
    borderRadius: '0% 0% 25% 25%'
  }

  const btnGroup = {
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: '30%'
  }
  return (
    <Card className="card-hover h-100 overflow-hidden" style={cardStyle}>
      <div style={titleBox}>
        <h1>{deckObj.title}</h1>
        <Card.Text>{deckObj.description}</Card.Text>
      </div>
      <div style={{objectPosition: 'bottom'}}></div>
      <div style={btnGroup}>
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
      
      </div>
    </Card>
  );
}

import React, { useEffect, useState } from 'react';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import '../styles/cards.css';
import { useAuth } from '../utils/context/authContext';
import { getDecksGallery } from '../api/deckData';
import { copyCardToDeck, deleteCard, deleteDeckCard, updateCardToDeck } from '../api/cardData';
import { useRouter } from 'next/navigation';
import Select from 'react-select';


// aspect ratio for the cards is 271 : 395
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

  const deckOptions = 
    deckList.map(deck => ({
      value: deck.firebaseKey,
      label: `${deck.title} | ${deck.description}`
    }))
  
  const gradientStyle = {
    background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    transition: 'background 0.3s ease-in-out',
    opacity: '0.85'
  };

  const iconStyle = {
    width: '36px',   
    height: '36px',  
    marginLeft: '10px',
  };

  return (
    <Card className="card-hover h-100 border-1 border-white overflow-hidden"
    style={{ minHeight: 'px' }}>
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

        {!deckSelector && (
          <div className="text-warning mt-2">Select a deck!</div>
        )}

        <FloatingLabel controlId="floatingSelect" >
          <Select
          options={deckOptions}
          name='deckId'
          value={deckOptions.find(option => option.value === deckSelector) || null}
          onChange={(selection) => setDeckSelector(selection.value)}
          placeholder="..."
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
              color: 'white',
              transition: 'background 0.3s ease-in-out',
              opacity: 0.85,
            }),
            menu: (provided) => ({
              ...provided,
              background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
              color: 'white',
              transition: 'background 0.3s ease-in-out',
              opacity: 0.85,
            }),
            option: (provided) => ({
              ...provided,
              background: 'linear-gradient(90deg, #ffcc33, #ff6600)',
              color: 'white',
              transition: 'background 0.3s ease-in-out',
              opacity: 0.85,
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'white',
            }),
          }}
          />
        </FloatingLabel>

        <Button
          type="button"
          style={gradientStyle}
          onClick={() => {
            if (!deckSelector) {
              alert('No deck selected!')
            } else {
              addCardToDeck();
              alert('Card added to deck!');
            }
          }}
        >
          Add to Deck?
          <img src="/icons/Card.png" alt="Card Icon" style={iconStyle} />
        </Button>

        {userEdit && (
          <Button
            type="button"
            style={gradientStyle}
            onClick={() => {
              router.push(`/card/edit/${cardObj.firebaseKey}`);
            }}
          >
            Reforge
          <img src="/icons/Anvil.png" alt="Anvil Icon" style={iconStyle} />
          </Button>
        )}

        {userDelete && (
          <button
            type="button"
            style={{
              position: 'absolute',          
              bottom: '1rem',                
              right: '1rem',              
              backgroundImage: `url("/icons/Shadow-Realm.png")`,
              backgroundSize: 'cover',            
              backgroundPosition: 'center',       
              backgroundRepeat: 'no-repeat',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              padding: '1.5rem 2rem',
              borderRadius: '200px',
              transition: 'background 0.3s ease-in-out',
              opacity: '0.65'
            }}
            onClick={() => {
              deleteUserCard(cardObj.firebaseKey);
            }}
            background=""
          >
            Send to <br/>
            Shadow Realm
          </button>
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

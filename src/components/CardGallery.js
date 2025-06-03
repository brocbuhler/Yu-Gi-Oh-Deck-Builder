import React, { useEffect, useState } from 'react'
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap'
import '../styles/cards.css';
import { useAuth } from '../utils/context/authContext';
import { getDecksGallery } from '../api/deckData';
import { createCard, deleteCard, updateCard } from '../api/cardData';
import { useRouter } from 'next/navigation';
// aspect ratio for the cards is 86 : 125
export default function CardGallery({ cardObj, userEdit = false, userDelete = false, update }) { 
  const router = useRouter();
  const [deckList, setDeckList] = useState([]);
  const [deckSelector, setDeckSelector] = useState('');
  const { user } = useAuth();

  const grabDeckList = () => {
    getDecksGallery(user.uid).then(setDeckList)
  }

  useEffect(() => {
    grabDeckList()
  }, []);

  const addCardToDeck = () => {
    const payload = {
      abilities: cardObj.abilities,
      atk: cardObj.atk,
      class: cardObj.class,
      defence: cardObj.defence,
      description: cardObj.description,
      fanMade: cardObj.fanMade,
      image: cardObj.image,
      type: cardObj.type,
      deckId: deckSelector,
    };

    createCard(payload).then(({ name }) => {
      const patchPayload = { ...payload, firebaseKey: name }; 
      updateCard(patchPayload).then(() => {
        if (update) update();
      });
    });
  };

  const deleteUserCard = (key) => {
    console.log("delete card:", key)
    deleteCard(key).then(() => {
      if (update) update();
    })
  };

  return (
    <Card className="card-hover h-100 border-1 border-white overflow-hidden">
      <Card.Img src={cardObj.image}/>
        <div className='card-overlay'>
          <div className='overlay-text'>
            Card Type: {cardObj.type},<br />
            Card Attribute: {cardObj.class},<br />
            Attack: {cardObj.atk},<br />
            Defence: {cardObj.defence},<br />
            {cardObj.abilities},<br />
            {cardObj.description}
          </div>
          <Button type="button"
            disabled={!deckSelector}
            onClick={() => {
              console.log('Selected Deck:', deckSelector);
              console.log('Card to Add:', cardObj);
              addCardToDeck();
              alert('Card added to deck!')
            }}>Add to Deck?
              {!deckSelector && <div className="text-warning mt-2">Please select a deck first</div>}
          </Button>
          <FloatingLabel controlId='floatingSelect' label="Decks:">
             <Form.Select aria-label="Decks:" name="deckId" onChange={(e) => setDeckSelector(e.target.value)} className="mb-3">
            <option value="">Decks:</option>
              {deckList.map((deck) => (
                <option key={deck.firebaseKey} value={deck.firebaseKey}>
                TITLE: {deck.title} | {deck.description}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
              {userEdit && (
                <>
                  <Button type='button' onClick={() => {
                    console.log("edit button clicked")
                    router.push(`/card/edit/${cardObj.firebaseKey}`)
                  }}>
                    Edit           
                  </Button>
                </>
              )}
              {userDelete && (
                <>
                  <Button type='button' onClick={() => {
                    console.log("delete button clicked")
                    deleteUserCard(cardObj.firebaseKey);
                  }}>
                    Delete
                  </Button>
                </>
              )}
        </div>
    </Card>
  )
}

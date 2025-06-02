import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { deleteDeck } from '../api/deckData'

// aspect ratio for the cards is 86 : 125

export default function DeckGallery({ deckObj, update}) {

  const deleteUserDeck = (key) => {
    deleteDeck(key).then(console.log("Deck", deckObj.title, "has been deleted"))
    if (update) update();
  }

  const editUserDeck = () => {
  
  }

  return (
    <Card className="card-hover h-100 border-1 border-white">
      <h1>{deckObj.title}</h1>
      <Card.Text>{deckObj.description}</Card.Text>
      <Button type='button' onClick={() => {
        console.log("edit button clicked!")
      }}>
        Edit
      </Button>
      <Button type='button' onClick={() => {
        console.log("delete button clicked!")
        deleteUserDeck(deckObj.firebaseKey)
      }}>
        Delete
      </Button>
    </Card>
  )
}

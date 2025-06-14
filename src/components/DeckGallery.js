import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { deleteDeck } from '../api/deckData'
import { useRouter } from 'next/navigation'
import deleteDecksCards from '../api/mergedData'

// aspect ratio for the cards is 86 : 125

export default function DeckGallery({ deckObj, userEdit = false, userDelete = false, update}) {
  const router = useRouter()
  const deleteUserDeck = (key) => {
    deleteDecksCards(key).then(() => {
      if (update) update();
    })
  }

  return (
    <Card className="card-hover h-100 border-1 border-white">
      <h1>{deckObj.title}</h1>
      <Card.Text>{deckObj.description}</Card.Text>
      {userEdit && (
      <Button type='button' onClick={() => {
        console.log("edit button clicked!")
        router.push(`/deck/edit/${deckObj.firebaseKey}`)
      }}>
        Edit
      </Button>
      )}
      {userDelete && (
      <Button type='button' onClick={() => {
        console.log("delete button clicked!")
        deleteUserDeck(deckObj.firebaseKey)
      }}>
        Delete
      </Button>
      )}
      <Button type='button' onClick={() => {
        router.push(`/deck/view/${deckObj.firebaseKey}`)
      }}>
        View
      </Button>
    </Card>
  )
}

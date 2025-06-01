import React from 'react'
import { Card } from 'react-bootstrap'

// aspect ratio for the cards is 86 : 125

export default function DeckGallery({ deckObj }) {
  return (
    <Card className="card-hover h-100 border-1 border-white">
      <h1>{deckObj.title}</h1>
      <Card.Text>{deckObj.description}</Card.Text>
    </Card>
  )
}

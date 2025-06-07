import React from 'react'
import { Button } from 'react-bootstrap'

export default function DrawButton({ draw }) {

  const handleClick = () => {
    const cards = draw()
    console.log("Randomly drawn cards", cards)
  }

  return (
    <div>
      <Button type='button' onClick={handleClick}>
        Random Draw
      </Button>
    </div>
  )
}

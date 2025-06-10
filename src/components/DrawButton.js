import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function DrawButton({ draw }) {
  const [drawNumber, setDrawNumber] = useState(0)
  const drawSubmit = (e) => {
    e.preventDefault();
    const cards = draw(drawNumber)
  }
  return (
    <div>
      <Form onSubmit={drawSubmit}>
        <h3>Do a test draw?</h3>

          <Form.Group className="mb-3">
            <Form.Label># of cards?</Form.Label>
            <Form.Control
              type='number'
              min="1"
              placeholder="Can draw up to the number of cards in deck"
              name="draw"
              value={drawNumber}
              onChange={(e) => setDrawNumber(parseInt(e.target.value, 10))}
              required
            />
            </Form.Group>

      </Form>
    </div>
  )
}

import React from 'react'
import { Card } from 'react-bootstrap'
import '../styles/cards.css';
// import { useAuth } from '../../utils/context/authContext'
// aspect ratio for the cards is 86 : 125
export default function CardGallery({ cardObj }) {
  
  return (
    <Card className="card-hover h-100 border-1 border-white overflow-hidden">
      <Card.Img src={cardObj.image}/>
        <div className='card-overlay'>
          <div className='overlay-text'>
            <>Hi im a card</>
          </div>
        </div>
    </Card>
  )
}

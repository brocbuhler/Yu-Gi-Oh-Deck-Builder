'use client';

import React, { useEffect, useState } from 'react'
import CardForm from '../../../../components/forms/CardForm'
import { useParams } from 'next/navigation'
import { getSingleCard } from '../../../../api/cardData'

export default function EditCard() {
  const [ cardData, setCardData ] = useState({})
  const params = useParams()
  const editCard = params.firebaseKey

  useEffect(() => {
    console.log("this is the fb key:", editCard)
    getSingleCard(editCard).then((data) => {
      const card = data[editCard]
      setCardData(card)
    }) 
  }, [editCard]);

  useEffect(() => {
    console.log("this is the card I want to edit:", cardData)
  }, [cardData])

  return (
    <div>
      {cardData.firebaseKey ? (<CardForm card={cardData}/>) : (<h1>Loading...</h1>)}
    </div>
  )
}

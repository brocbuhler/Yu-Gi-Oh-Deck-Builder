'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getSingleDeck } from '../../../../api/deckData';
import DeckForm from '../../../../components/forms/DeckForm';

export default function EditDeck() {
  const [ deckData, setdeckData ] = useState({});
  const params = useParams()
  const editDeck = params.firebaseKey

  useEffect(() => {
    getSingleDeck(editDeck).then((data) => {
      const dek = data[editDeck]
      setdeckData(dek)
    })
  }, [editDeck])

  useEffect(() => {
    console.log(deckData)
  }, [deckData])

  return (
    <div>
      {deckData.firebaseKey ? (<DeckForm dek={deckData}/>) : (<h1>loading...</h1>)}
    </div>
  )
}

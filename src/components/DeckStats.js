import React, { useEffect, useState } from 'react'
import { getCardbyDeck } from '../api/cardData'

export default function DeckStats({ deckId }) {
  const [ avgAttack, setAvgAttack ] = useState(0)
  const [ avgDefence, setAvgDefence ] = useState(0)
  const [ avgLevel, setAvgLevel ] = useState(0)
  const [ spellChance, setSpellChance ] = useState()
  const [ trapChance, setTrapChance ] = useState()
  const [ monsterChance, setMonsterChance ] = useState()
  const [ cardAmount, setCardAmount ] = useState(0)
  const [ deckList, setDeckList ] = useState([])

  const statBox = {
    height: '10%',
    width: '10%',
    background: '#495057'
  }

  const deckGrabber = () => {
    getCardbyDeck(deckId).then(setDeckList)
  }

  const statsCalculator = () => {
    deckList.forEach((card) => {
      
    })
  }

  useEffect(() => {
    deckGrabber()
    statsCalculator()
  })

  return (
    <div style={statBox}>
      <div>
        test
        {/* {avgAttack}
        {avgDefence}
        {avgLevel}
        {spellChance}
        {trapChance}
        {monsterChance}
        {cardAmount} */}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { getCardbyDeck } from '../api/cardData'

export default function DeckStats({ deckId, update }) {
  const [ avgAttack, setAvgAttack ] = useState(0)
  const [ avgDefense, setAvgDefense ] = useState(0)
  const [ avgLevel, setAvgLevel ] = useState(0)
  const [ spellChance, setSpellChance ] = useState()
  const [ trapChance, setTrapChance ] = useState()
  const [ monsterChance, setMonsterChance ] = useState()
  const [ cardAmount, setCardAmount ] = useState(0)
  const [ deckList, setDeckList ] = useState([])

  const statBox = {
    height: '20%',
    width: '20%',
    background: '#495057',
    boarderRadius: '25%'
  }

  const deckGrabber = () => {
    getCardbyDeck(deckId).then(setDeckList)
    setCardAmount(deckList.length)
  }

  const statsCalculator = () => {
    let addedAtk = 0
    deckList.forEach((card) => {
    if (card.attack) {addedAtk += parseInt(card.attack)}
    })
  }

  useEffect(() => {
    deckGrabber()
    let addedAtk = 0
    let addedDef = 0
    let addedLvl = 0
    let monsterCards = 0
    let spellCards = 0
    let trapCards = 0
    deckList.forEach((card) => {
      if (card.card == 'Monster') {monsterCards += 1}
      if (card.card == 'Spell') {spellCards += 1}
      if (card.card == 'Trap') {trapCards += 1}
    })
    deckList.forEach((card) => {
      if (card.attack) {addedAtk += parseInt(card.attack)}
      if (card.defense) {addedDef += parseInt(card.defense)}
      if (card.monsterLevel) {addedLvl += parseInt(card.monsterLevel)}
    })
    setAvgAttack((Math.round((addedAtk / monsterCards) / 100)) * 100)
    setAvgDefense((Math.round((addedDef / monsterCards) / 100)) *100)
    setAvgLevel(Math.round(addedLvl / monsterCards))
    if (update) update()
  }, [deckList])

  return (
    <div style={statBox}>
      <div>
        Average Attack: {avgAttack} <br />
        Average defense: {avgDefense} <br />
        Average Level: {avgLevel} <br />
        {/* 
        {spellChance}
        {trapChance}
        {monsterChance}
        {cardAmount} */}
      </div>
    </div>
  )
}

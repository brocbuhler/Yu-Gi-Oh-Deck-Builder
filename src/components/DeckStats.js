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
    backgroundColor: '#343a40',
    border: '1px solid #495057',
    borderRadius: '0.375rem',
    padding: '0.5rem',
    marginBottom: '1.5rem',
    width: 'fit-content',
    fontSize: '1.5rem'
  }

  const deckGrabber = () => {
    getCardbyDeck(deckId).then(setDeckList)
    setCardAmount(deckList.length)
  }

  const statsCalculator = () => {
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
    setSpellChance(Math.round((spellCards / cardAmount) * 100))
    setTrapChance(Math.round((trapCards / cardAmount) * 100))
    setMonsterChance(Math.round((monsterCards / cardAmount) * 100))
  }

  useEffect(() => {
    deckGrabber()
    statsCalculator()
    if (update) update()
  }, [deckList])

  return (
    <div style={statBox}>
      <h3 style={{textDecoration: 'underline'}}>DeckStats</h3>
      <div style={{display: 'flex', justifyContent: 'start', gap: '1rem'}}>
        <div>
        Average Attack: {avgAttack} <br />
        Average defense: {avgDefense} <br />
        Average Level: {avgLevel} <br />
        </div>
        <div>
        Spell Chance: {spellChance}% <br />
        Trap Chance: {trapChance}% <br />
        Monster Chance: {monsterChance}%
        </div>
      </div>
    </div>
  )
}

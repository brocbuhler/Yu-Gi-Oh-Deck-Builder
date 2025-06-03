import { deleteCard, getCardbyDeck } from './cardData';
import { deleteDeck } from './deckData';

const deleteDecksCards = (deckId) =>
  new Promise((resolve, reject) => {
    getCardbyDeck(deckId)
      .then((cardsArray) => {
        const deleteCardPromises = cardsArray.map((card) =>
          deleteCard(card.firebaseKey)
        );

        Promise.all(deleteCardPromises)
          .then(() => deleteDeck(deckId).then(resolve))
          .catch(reject);
      })
      .catch(reject); 
  });

export default deleteDecksCards;

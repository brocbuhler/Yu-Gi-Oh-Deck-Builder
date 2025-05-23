import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCardGallery = (tf) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards.json?orderBy="fanMade"&equalTo=${tf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

  const createCard = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

  const updateCard = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const deleteCard = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

  const getCardbyDeck = (deckId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards.json?orderBy="deckId"&equalTo="${deckId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

  export { getCardGallery, getCardbyDeck, createCard, updateCard, deleteCard }

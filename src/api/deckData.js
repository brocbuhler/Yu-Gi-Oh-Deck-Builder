import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getDecksGallery = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/decks.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSingleDeck = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/decks.json?orderBy="firebaseKey"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const deckArray = Object.values(data);
        resolve(deckArray[0] || null); 
      })
      .catch(reject);
  });

  const createDeck = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/decks.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

  const updateDeck = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/decks/${payload.firebaseKey}.json`, {
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

const deleteDeck = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/decks/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

  export { getDecksGallery, createDeck, updateDeck, deleteDeck, getSingleDeck}

import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCardGallery = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/library.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

  const getPublicCards = (tf) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/fanLibrary.json?orderBy="public"&equalTo=${tf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

  const getSingleCard = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/fanLibrary.json?orderBy="firebaseKey"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

const getUserCards = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/fanLibrary.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

  const getCardsMakePublic = (uid) =>
    new Promise((resolve, reject) => {
      fetch(`${endpoint}/cards/fanLibrary.json?orderBy="uid"&equalTo="${uid}"`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data)) 
        .catch(reject);
    });

  const copyCardToDeck = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/deckLibrary.json`, {
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

  const createCard = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/fanLibrary.json`, {
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

  const updateCardToDeck = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/deckLibrary/${payload.firebaseKey}.json`, {
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

  const updateCard = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/fanLibrary/${payload.firebaseKey}.json`, {
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

  const updateCopy = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/deckLibrary/${payload.firebaseKey}.json`, {
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
    fetch(`${endpoint}/cards/fanLibrary/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

  const deleteDeckCard = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/deckLibrary/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) 
      .catch(reject);
  });

  const getCardbyDeck = (deckId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cards/deckLibrary.json?orderBy="deckId"&equalTo="${deckId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

  export { getCardGallery, getUserCards, getCardbyDeck, copyCardToDeck, updateCardToDeck, deleteCard, getSingleCard, getCardsMakePublic, getPublicCards, createCard, updateCard, deleteDeckCard, updateCopy }

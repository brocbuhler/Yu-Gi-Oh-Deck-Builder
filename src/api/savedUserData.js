import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;  
  
const getUserGallery = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const allCards = Object.values(data || {});
        const cardsWithoutDeck = allCards.filter((card) => !card.deckId);
        resolve(cardsWithoutDeck);
      })
      .catch(reject);
  });

const getSingleUser = (savedUID) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users.json?orderBy="savedUID"&equalTo="${savedUID}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const user = data && Object.values(data)[0];
        resolve(user || null);
      })
      .catch(reject);
  });

  const saveUser = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users.json`, {
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

    const updateUser = (payload) =>
    new Promise((resolve, reject) => {
      fetch(`${endpoint}/users/${payload.firebaseKey}.json`, {
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
    
    const deleteUser = (firebaseKey) =>
      new Promise((resolve, reject) => {
        fetch(`${endpoint}/users/${firebaseKey}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => resolve(data)) 
          .catch(reject);
      });
  export { saveUser, updateUser, getUserGallery, getSingleUser, deleteUser }

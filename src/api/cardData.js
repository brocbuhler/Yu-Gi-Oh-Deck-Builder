import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

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

  export default getCardGallery

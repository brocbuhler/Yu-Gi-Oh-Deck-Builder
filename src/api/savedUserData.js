import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;  
  

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

  export { saveUser, updateUser }

import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { saveUser, updateUser } from '../api/savedUserData';

export default function PublicButton() {
  const { user } = useAuth();

  const saveUserData = () => {
    const payload = {
      savedDisplayName: user.displayName,
      savedImg: user.photoURL,
      savedUID: user.uid
    };
    console.log(payload)
    saveUser(payload).then(({ name }) => {
      console.log('saveUser response:', name);
      const patchPayload = { ...payload, firebaseKey: name };
      updateUser(patchPayload);
    });
  };

  return (
    <div>
      <Button onClick={saveUserData}>GO PUBLIC</Button>
    </div>
  );
}

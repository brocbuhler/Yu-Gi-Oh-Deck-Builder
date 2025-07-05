import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {

  const iconStyle = {
    width: '36px',   
    height: '36px',  
    marginLeft: '10px',
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
    <h3>Welcome to Yu-Gi-Oh! Deck Builder</h3>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn} style={{background: "#343a40"}}>
        Sign in with Google
        <img src='/icons/Google.png' style={iconStyle}/>
      </Button>
    </div>
  );
}

export default Signin;

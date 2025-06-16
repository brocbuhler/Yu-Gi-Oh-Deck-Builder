import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

const textStyle = {
  color: 'white',
  fontSize: '1.25rem',
  textShadow: '1px 1px 2px black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const iconStyle = {
  width: '36px',   
  height: '36px',  
  marginLeft: '10px',
};


export default function NavBar() {
  return (
    <div
      style={{
        height: '100vh',
        width: '300px',
        backgroundImage: 'linear-gradient(to bottom, #b8860b, #ff8c00)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Link
        href="/"
        className="navbar-brand"
        style={{
          ...textStyle,
          marginBottom: '6rem',
          fontWeight: 'bold',
        }}
      >
        <span style={{ flexGrow: 1 }}>Yu-Gi-Oh! Deck Builder</span>
        <img src="/images/favicon.ico" alt="Icon" style={iconStyle} />
      </Link>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '5rem', flexGrow: 1 }}>
        <Link className="nav-link" href="/deck/fan" style={textStyle}>
          <span>Creations</span>
          <img src="/icons/Hands.png" alt="Hands Icon" style={iconStyle} />
        </Link>
        <Link className="nav-link" href="/card/new" style={textStyle}>
          <span>Build Card</span>
          <img src="/icons/Card.png" alt="Card Icon" style={iconStyle} />
        </Link>
        <Link className="nav-link" href="/deck/new" style={textStyle}>
          <span>Build Deck</span>
          <img src="/icons/Anvil.png" alt="Anvil Icon" style={iconStyle} />
        </Link>
        <Link className="nav-link" href="/profile/public" style={textStyle}>
          <span>Other Builders</span>
          <img src="/icons/Community.png" alt="Community Icon" style={iconStyle} />
        </Link>
        <Link className="nav-link" href="/profile/user" style={textStyle}>
          <span>Account</span>
          <img src="/icons/Account.png" alt="Account Icon" style={iconStyle} />
        </Link>
      </nav>

      <Button
        variant="danger"
        onClick={signOut}
        style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px black' }}
      >
        Sign Out
      </Button>
    </div>
  );
}

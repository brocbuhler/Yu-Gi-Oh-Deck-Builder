"use client";

import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function BuilderGallery({ userObj }) {
  const imgSrc = userObj.Img ? userObj.Img : "/icons/Account.png"

  return (
    <div>
      <Card
        className="h-100 border-1 border-white overflow-hidden"
        style={{ backgroundColor: '#2c2c2c', color: 'white', padding: '1rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <Card.Img
            src={imgSrc}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid white'
            }}
          />
        </div>

        <h1 style={{ textAlign: 'center' }}>{userObj.savedDisplayName}</h1>

        <div
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            borderRadius: '4px',
            background: 'linear-gradient(to right, #fca311, #ff8800)',
            padding: '10px',
          }}
        >
          <Link className="nav-link" href={`/profile/${userObj.savedUID}`}>
            Builder Info
          </Link>
        </div>
      </Card>
    </div>
  );
}

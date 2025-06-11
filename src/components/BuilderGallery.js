"use client";

import Link from 'next/link';
import React from 'react'
import { Card } from 'react-bootstrap';

export default function BuilderGallery({ userObj }) {
  return (
    <div>
    <Card className="h-100 border-1 border-white overflow-hidden">
      <Card.Img src={userObj.savedImg}/>
      <h1>{userObj.savedDisplayName}</h1>
      <div style={{
         border: '2px solid black',
         padding: '8px', 
         borderRadius: '4px', 
         background: 'red', 
         color: 'white'
      }}>
        <Link className="nav-link" href={`/profile/${userObj.savedUID}`}>
          Builder Info
        </Link>
      </div>
    </Card>
    </div>
  )
}

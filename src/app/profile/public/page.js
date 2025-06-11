"use client";

import React, { useEffect, useState } from 'react'
import { getUserGallery } from '../../../api/savedUserData'
import { Col, Row } from 'react-bootstrap'
import BuilderGallery from '../../../components/BuilderGallery'

export default function page() {
  const [builders, setBuilders] = useState([])
  const getGallery = () => {
    getUserGallery().then(setBuilders)
  }

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <Row>
    {builders.map(builder => (
      <Col key={builder.firebaseKey} xs={8} sm={6} md={5} lg={4}>
      <BuilderGallery userObj={builder} update={getGallery}/>
      </Col>
    ))}
    </Row>
  )
}

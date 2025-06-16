"use client";

import React, { useEffect, useState } from 'react'
import { getUserGallery } from '../../../api/savedUserData'
import { Col, Row } from 'react-bootstrap'
import BuilderGallery from '../../../components/BuilderGallery'
import SearchBar from '../../../components/SearchBar';

export default function page() {
  const [builders, setBuilders] = useState([])
  const [searchBuilders, setSearchBuilders] = useState([])
  const [searchState, setSearchState] = useState('')

  const getGallery = () => {
    getUserGallery().then((fetchedBuilders) => {
      setBuilders(fetchedBuilders)
      setSearchBuilders(fetchedBuilders)
    });
  }

  useEffect(() => {
    getGallery();
  }, []);

  useEffect(() => {
      const lowerSearch = searchState.toLowerCase();
      setSearchBuilders(
        builders.filter(builder => builder.savedDisplayName.toLowerCase().includes(lowerSearch))
      )
    }, [searchState, builders])

  return (
  <>
    <SearchBar cardList={setSearchState}/>
    <Row>
    {searchBuilders.map(builder => (
      <Col key={builder.firebaseKey} xs={8} sm={6} md={5} lg={4}>
      <BuilderGallery userObj={builder} update={getGallery}/>
      </Col>
    ))}
    </Row>
  </>
  )
}

import React from 'react'
import { Form } from 'react-bootstrap'

export default function SearchBar({cardList}) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control type='search' placeholder='search' onChange={(e) => cardList(e.target.value)}/>
    </Form>
  )
}

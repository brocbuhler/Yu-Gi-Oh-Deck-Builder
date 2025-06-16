import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function SearchBar({ cardList }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputGroup style={{ transform: 'scale(1.25)', transformOrigin: 'top left' }}>
        <InputGroup.Text style={{ 
          backgroundColor: '#343a40', 
          border: '1px solid #495057',
          height: '2.5rem',
        }}>
          <img
            src="/icons/Glass.png"
            alt="Search Icon"
            style={{ width: '20px', height: '20px'}}
          />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search"
          onChange={(e) => cardList(e.target.value)}
          style={{
            backgroundColor: '#343a40',
            color: 'white',
            border: '1px solid #495057',
            height: '2.5rem',
            fontSize: '1.1rem',
          }}
        />
      </InputGroup>
    </Form>
  );
}

import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function Filters({ filterList }) {
  return (
    <Form>
      <Row className="align-items-end">
        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label>Attack</Form.Label>
            <Form.Control
              placeholder="500"
              name="attack"
              onChange={filterList}
            />
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label>Defense</Form.Label>
            <Form.Control
              placeholder="500"
              name="defense"
              onChange={filterList}
            />
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label>Monster Level</Form.Label>
            <Form.Control
              placeholder="3"
              name="monsterLevel"
              onChange={filterList}
            />
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label>Card Type</Form.Label>
            <Form.Select name="card" onChange={filterList}>
              <option value="">Select</option>
              <option value="Monster">Monster</option>
              <option value="Spell">Spell</option>
              <option value="Trap">Trap</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label>Volume</Form.Label>
            <Form.Select name="vol" onChange={filterList}>
              <option value="">Select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label>Attribute</Form.Label>
            <Form.Select name="attribute" onChange={filterList}>
              <option value="">Select</option>
              <option value="Dark">DARK</option>
              <option value="Divine">DIVINE</option>
              <option value="Earth">EARTH</option>
              <option value="Fire">FIRE</option>
              <option value="Light">LIGHT</option>
              <option value="Water">WATER</option>
              <option value="Wind">WIND</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

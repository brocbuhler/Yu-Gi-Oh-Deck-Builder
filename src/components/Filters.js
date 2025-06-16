import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

export default function Filters({ filterList }) {
  const inputStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    border: '1px solid #495057',
    height: '3rem',          // 2.4rem * 1.25 = 3rem
    fontSize: '1.375rem',    // 1.1rem * 1.25 = 1.375rem
  };

  const labelStyle = {
    color: 'white',
    fontWeight: '600',
  };

  const iconStyle = {
    width: '25px',   // 20px * 1.25 = 25px
    height: '25px',
  };

  return (
    <Form>
      <Row className="align-items-end">
        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label style={labelStyle}>Attack</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: '#343a40', border: '1px solid #495057' }}>
                <img src="/icons/Sword.png" alt="Sword Icon" style={iconStyle} />
              </InputGroup.Text>
              <Form.Control
                placeholder="500"
                name="attack"
                onChange={filterList}
                style={inputStyle}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label style={labelStyle}>Defense</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: '#343a40', border: '1px solid #495057' }}>
                <img src="/icons/Shield.png" alt="Shield Icon" style={iconStyle} />
              </InputGroup.Text>
              <Form.Control
                placeholder="500"
                name="defense"
                onChange={filterList}
                style={inputStyle}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label style={labelStyle}>Monster Level</Form.Label>
            <Form.Control
              placeholder="3"
              name="monsterLevel"
              onChange={filterList}
              style={inputStyle}
            />
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label style={labelStyle}>Card Type</Form.Label>
            <Form.Select
              name="card"
              onChange={filterList}
              style={{
                ...inputStyle,
                paddingTop: '0.375rem',   // 0.3rem * 1.25
                paddingBottom: '0.375rem',
              }}
            >
              <option value="">Select</option>
              <option value="Monster">Monster</option>
              <option value="Spell">Spell</option>
              <option value="Trap">Trap</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label style={labelStyle}>Volume</Form.Label>
            <Form.Select
              name="vol"
              onChange={filterList}
              style={{
                ...inputStyle,
                paddingTop: '0.375rem',
                paddingBottom: '0.375rem',
              }}
            >
              <option value="">Select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs="auto" className="mb-2">
          <Form.Group>
            <Form.Label style={labelStyle}>Attribute</Form.Label>
            <Form.Select
              name="attribute"
              onChange={filterList}
              style={{
                ...inputStyle,
                paddingTop: '0.375rem',
                paddingBottom: '0.375rem',
              }}
            >
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

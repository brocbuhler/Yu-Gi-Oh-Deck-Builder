/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          Yu-gi-oh! Deck Builder
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href="/deck/fan">
              Creations
            </Link>
            <Link className="nav-link" href="/card/new">
              Build Card
            </Link>
            <Link className="nav-link" href="/deck/new">
              Build Deck
            </Link>
            <Link className="nav-link" href="/profile/public">
              Other Builders
            </Link>
            <Link className="nav-link" href="/profile/user">
              Account
            </Link>
          </Nav>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

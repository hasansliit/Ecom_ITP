import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'; // Import Link for routing
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavigationBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" style={{ marginLeft: "20px", fontWeight: "bold" }}>
        Order Management
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ marginLeft: "auto", marginRight: "20px" }}>
          <Nav.Link as={Link} to="/cart" style={{ marginRight: "20px", fontWeight: "bold" }}>
            Shopping Cart
          </Nav.Link>
          <Nav.Link as={Link} to="/bill" style={{ marginRight: "20px", fontWeight: "bold" }}>
            Billing
          </Nav.Link>
          <Nav.Link as={Link} to="/admin" style={{ fontWeight: "bold" }}>
            Track Order
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from 'api/api-authorization/LoginMenu';
import { FaReact } from 'react-icons/fa'
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="box-shadow" variant="light" bg="light" expand="sm" fixed="top">
          <Navbar.Brand href="/"><FaReact /> AspnetReact</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container-fluid">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/campaigns/page/1">Campaigns</Nav.Link>

              <Nav.Item className="ml-auto"></Nav.Item>

              <LoginMenu />
            </Nav>
            {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

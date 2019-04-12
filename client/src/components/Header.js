import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

import {
    logout,
    toggleOpenSignin
 } from './../redux/actions/actions';

import storiesLogo from "../assets/img/stories-logo.svg";

// This component is used as the header of each page
class Header extends Component {
    render() {
        return (
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><img alt="Stories" src={storiesLogo} height="40"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Search</Nav.Link>
                {this.props.isAuth ? <Nav.Link href="/pay">Pay</Nav.Link> : ""}
              </Nav>
              <Nav>
                {this.props.isAuth ?
                <NavDropdown title={"Welcome, " + this.props.user.username + "!"} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/wallet">My wallets</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#"><Button onClick={this.props.logout}>Log out</Button></NavDropdown.Item>
                </NavDropdown> : ""}
                {this.props.isAuth ? "" : <Nav.Link href="#" onClick={this.props.toggleOpenSignin}>Sign in / Sign up</Nav.Link>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {
  logout,
  toggleOpenSignin
})(Header);

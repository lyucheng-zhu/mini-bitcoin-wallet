import React, { Component } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    login,
    toggleCloseSignin,
    toggleOpenSignup
 } from './../redux/actions/actions';

// This component is used to show the signin modal
class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
        username: "",
        password: ""
    }

    this.handleClick = (e) => {
      e.preventDefault();
      this.props.login(this.state.username, this.state.password);
      this.props.toggleCloseSignin();
    };

    this.handleChange = (e) => {
          this.setState(
              {
                  [e.target.name]: e.target.value
              }
          );
          //console.log(this.state);
    };

    this.goToSignup = (e) => {
      e.preventDefault();
      this.props.toggleCloseSignin();
      this.props.toggleOpenSignup();
    };

  }

  render() {
    return (
      <Modal
        show={this.props.modalModeSignin}
        onHide={this.props.toggleCloseSignin}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={this.handleChange} placeholder="Username" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" required/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleClick}>
              Sign in
            </Button>
          </Form>
          <br/>
          <Link href="#" onClick={this.goToSignup}>Don't have an account? Register now.</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.toggleCloseSignin}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
    return {
        modalModeSignin: state.common.modalModeSignin
    };
}

export default connect(mapStateToProps, {
    toggleCloseSignin,
    toggleOpenSignup,
    login
})(Login);

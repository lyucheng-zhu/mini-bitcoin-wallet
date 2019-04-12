import React, { Component } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    signup,
    toggleCloseSignup,
    toggleOpenSignin
 } from './../redux/actions/actions';


// This component is used to show the signup modal
class Signup extends Component {

  constructor(props){
    super(props);

    this.state = {
        username: "",
        password: "",
        comfirmPassword: ""
    }

    this.handleClick = (e) => {
      e.preventDefault();
      this.props.signup(this.state.username, this.state.password);
      this.props.toggleCloseSignup();
    };

    this.handleChange = (e) => {
          this.setState(
              {
                  [e.target.name]: e.target.value
              }
          );
          //console.log(this.state);
    };

    this.goToSignin = (e) => {
      e.preventDefault();
      this.props.toggleCloseSignup();
      this.props.toggleOpenSignin();
    };

  }

  render() {
    return (
      <Modal
        show={this.props.modalModeSignup}
        onHide={this.props.toggleCloseSignup}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign up
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

            <Form.Group controlId="formComfirmPassword">
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control type="password" name="comfirmPassword" onChange={this.handleChange} isInvalid={this.state.password !== this.state.comfirmPassword} placeholder="Comfirm Password" required/>
              <Form.Control.Feedback type="invalid">The passwords you entered do not match.</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.handleClick}>
              Sign up
            </Button>

            <br/>
            <Link href="#" onClick={this.goToSignin}>Already have an account? Sign in now.</Link>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.toggleCloseSignup}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
    return {
        modalModeSignup: state.common.modalModeSignup
    };
}

export default connect(mapStateToProps, {
    toggleCloseSignup,
    signup,
    toggleOpenSignin
})(Signup);

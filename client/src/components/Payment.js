import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Table, Row, Form, Button } from 'react-bootstrap';

import {
  pay
} from './../redux/actions/actions';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payerAddressInput: !this.props.payer ? "" : this.props.payer.address,
      payeeAddressInput: "",
      payerPublicKeyInput: !this.props.payer ? "" : this.props.payer.publicKey,
      payerPrivateKeyInput: !this.props.payer ? "" : this.props.payer.privateKey,
      payingAmountInput: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = (e) => {
          this.setState(
              {
                  [e.target.name]: e.target.value
              }
          );
    };
  }

  // validate the form of inputs
  validate() {
    return {
      payerAddressInput: /^[A-Za-z0-9]+$/.test(this.state.payerAddressInput) && this.state.payerAddressInput.length >= 26 && this.state.payerAddressInput.length <= 35,
      payeeAddressInput: /^[A-Za-z0-9]+$/.test(this.state.payeeAddressInput) && this.state.payeeAddressInput.length >= 26 && this.state.payeeAddressInput.length <= 35,
      payerPublicKeyInput: /^[a-f0-9]+$/.test(this.state.payerPublicKeyInput) && this.state.payerPublicKeyInput.length === 66,
      payerPrivateKeyInput: /^[A-Za-z0-9]+$/.test(this.state.payerPrivateKeyInput) && this.state.payerPrivateKeyInput.length === 52,
      payingAmountInput: /^[0-9]+$/.test(this.state.payingAmountInput)
    };
  }


  handleClick(e) {
    e.preventDefault();
    this.props.pay(this.state);
  }

  render() {
    const validation = this.validate();
    let isDisabled = false;
    Object.keys(validation).forEach(
      (key) => {
        if (!validation[key]){
          isDisabled = true;
        }
      }
    );

    return (
      <Container className="justify-content-md-center">
        <br/>
        <Row className="justify-content-md-center">
          Make a payment now.
        </Row>
        <br/>
               <Form>
                <Form.Group controlId="formPayerWalletAddress">
                  <Form.Label>Payer Wallet Address</Form.Label>
                  <Form.Control type="text" onChange={this.handleChange} value={this.state.payerAddressInput} name="payerAddressInput" isInvalid={!validation.payerAddressInput} placeholder = "Enter your wallet address"/>
                  <Form.Control.Feedback type="invalid">A valid address length must be in the range of 26 and 35.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPayerWalletPublicKey">
                  <Form.Label>Payer Public Key</Form.Label>
                  <Form.Control type="text" onChange={this.handleChange} value={this.state.payerPublicKeyInput} name="payerPublicKeyInput" onChange={this.handleChange} isInvalid={!validation.payerPublicKeyInput} placeholder = "Enter your wallet public key"/>
                  <Form.Control.Feedback type="invalid">The length of a valid public key must be 66.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPayerWalletPrivateKey">
                  <Form.Label>Payer Private Key(WIF)</Form.Label>
                  <Form.Control type="text" onChange={this.handleChange} value={this.state.payerPrivateKeyInput} name="payerPrivateKeyInput" isInvalid={!validation.payerPrivateKeyInput} placeholder = "Enter your wallet private key in Base58 Wallet Import Format"/>
                  <Form.Control.Feedback type="invalid">The length of a valid private key (WIF) must be 52.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPayeeWalletAddress">
                  <Form.Label>Payer Wallet Address</Form.Label>
                  <Form.Control type="text" onChange={this.handleChange} value={this.state.payeeAddressInput} name="payeeAddressInput" isInvalid={!validation.payeeAddressInput} placeholder = "Enter payee wallet address"/>
                  <Form.Control.Feedback type="invalid">A valid address length must be in the range of 26 and 35.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPayingAmountInput">
                  <Form.Label>Paying Amount</Form.Label>
                  <Form.Control type="text" onChange={this.handleChange} value={this.state.payingAmountInput} name="payingAmountInput" isInvalid={!validation.payingAmountInput} placeholder = "Enter paying amount"/>
                  <Form.Control.Feedback type="invalid">The paying amount must be a positive number.</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isDisabled} onClick={this.handleClick}>
                  Pay
                </Button>
              </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    payer: state.auth.user.payer
  }
}

export default connect(mapStateToProps, {pay})(Payment);

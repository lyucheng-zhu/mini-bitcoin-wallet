import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Container, Table, Row, Form, Button } from 'react-bootstrap';
import Search from "./Search";

import {
  choosePayer,
  deleteWallet,
  addWallet
} from './../redux/actions/actions';


// This component is used to show all saved wallets of a user
class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddressInput: "",
      walletPublicKeyInput: "",
      walletPrivateKeyInput: "",
    };

    this.handleAddClick = this.handleAddClick.bind(this);

    this.handleChange = (e) => {
          this.setState(
              {
                  [e.target.name]: e.target.value
              }
          );
    };
  }

  handleChooseClick(index){
    this.props.choosePayer(index);
  }

  handleDeleteClick(walletId){
    this.props.deleteWallet(this.props.user.token, walletId);
  }

  handleAddClick = (e) => {
    e.preventDefault();
    let _wallet = {};
    _wallet.address = this.state.walletAddressInput;
    _wallet.publicKey = this.state.walletPublicKeyInput;
    _wallet.privateKey = this.state.walletPrivateKeyInput;
    _wallet.userId = this.props.user.Id;
    this.props.addWallet(this.props.user.token, _wallet);
  }

  // validate the form of inputs
  validate() {
    return {
      walletAddressInput: /^[A-Za-z0-9]+$/.test(this.state.walletAddressInput) && this.state.walletAddressInput.length >= 26 && this.state.walletAddressInput.length <= 35,
      walletPublicKeyInput: /^[a-f0-9]+$/.test(this.state.walletPublicKeyInput) && this.state.walletPublicKeyInput.length === 66,
      walletPrivateKeyInput: /^[A-Za-z0-9]+$/.test(this.state.walletPrivateKeyInput) && this.state.walletPrivateKeyInput.length === 52,
    };
  }

    render() {
      if (!this.props.user.wallets) {
        return (<Search/>);
      }
        let walletList = this.props.user.wallets.map((wallet, index) => {
          return(
            <tr key={"wallet_" + wallet.id}>
              <td>
                {index + 1}
              </td>
              <td>
                Address: {wallet.address} <br />
              </td>
              <td>
                <button onClick={(e) => this.handleChooseClick(index)}> Choose </button>
              </td>
              <td>
                <button onClick={(e) => this.handleDeleteClick(wallet.Id)}> Delete </button>
              </td>
            </tr>
          );
        });

        let validation = this.validate();
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
              <Row className="justify-content-md-center">
                Welcome, {this.props.user.username}! These are your wallets.
              </Row>
              <br/>
              <Table  striped bordered hover>
                <thead>
                  <td>#</td>
                  <td colspan="3" className="justify-content-md-center">My Wallets</td>
                </thead>
                <tbody>
                  {walletList}
                  <tr><td align="center" colspan="4">My New Wallet</td></tr>
                  <tr><td></td><td colspan="3">
                    <Form>
                      <Form.Group controlId="formWalletAddress">
                        <Form.Label>Wallet Address</Form.Label>
                        <Form.Control type="text" name="walletAddressInput" onChange={this.handleChange} isInvalid={!validation.walletAddressInput} placeholder = "Enter your wallet address"/>
                        <Form.Control.Feedback type="invalid">A valid address length must be in the range of 26 and 35.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formWalletPublicKey">
                        <Form.Label>Public Key</Form.Label>
                        <Form.Control type="text" name="walletPublicKeyInput" onChange={this.handleChange} isInvalid={!validation.walletPublicKeyInput} placeholder = "Enter your wallet public key"/>
                        <Form.Control.Feedback type="invalid">The length of a valid public key must be 66.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formWalletPrivateKey">
                        <Form.Label>Private Key(WIF)</Form.Label>
                        <Form.Control type="text" name="walletPrivateKeyInput" onChange={this.handleChange} isInvalid={!validation.walletPrivateKeyInput} placeholder = "Enter your wallet private key in Base58 Wallet Import Format"/>
                        <Form.Control.Feedback type="invalid">The length of a valid private key (WIF) must be 52.</Form.Control.Feedback>
                      </Form.Group>

                      <Button variant="primary" type="submit" disabled={isDisabled} onClick={this.handleAddClick}>
                        Create
                      </Button>
                    </Form>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    //console.log(state);
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, {
  choosePayer,
  deleteWallet,
  addWallet
})(Wallet);

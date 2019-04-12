import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import bitcoinLogo from "../assets/img/bitcoin-logo.png";

import {
  searchAddress,
  searchTransaction
} from './../redux/actions/actions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.searchInputType = React.createRef();
    this.handleClick = (e) => {
      e.preventDefault();
      if (this.searchInputType.current.value === "address")
        this.props.searchAddress(this.searchInput.current.value);
      else
        this.props.searchTransaction(this.searchInput.current.value);
    }
  }

  render() {
    return (
    <Container className="justify-content-md-center">
      <br/>
      <Row className="justify-content-md-center">
        <Link href="/">
          <Image src={bitcoinLogo} fluid/>
          <br/>
        </Link>
      </Row>
      <Form>
        <Form.Row>
        <Form.Group as={Col} controlId="formSearchContents">
          <Form.Label></Form.Label>
          <Form.Control type="text" ref={this.searchInput} placeholder="Enter an wallet address or a transaction hash" required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formSearchType" xs={3}>
          <Form.Label></Form.Label>
          <Form.Control as={"select"} ref={this.searchInputType} defaultValue="address">
            <option value="address"> Address </option>
            <option value="transaction"> Transaction </option>
          </Form.Control>
        </Form.Group>
        </Form.Row>

        <Form.Row className="justify-content-md-center">
          <Button variant="primary" type="submit" onClick={this.handleClick}>
            Search
          </Button>
        </Form.Row>
      </Form>
    </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchContents: state.searchContents
  }
}

export default connect(mapStateToProps, {searchAddress, searchTransaction})(Search);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';
import Search from "./Search";

import {
  searchTransaction,
  backToIndex
} from './../redux/actions/actions';

class AddressDetail extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(transaction) {
    this.props.searchTransaction(transaction);
  }

    render() {
        //address.transactions is different than address.txrefs, it only includes unique transaction hashes
        console.log(this.props);
        if (!this.props.address.transactions) {
          return (<Search/>);
        }
        const transactionList = this.props.address.transactions.map((transaction, index) => {
          return(
            <tr key={transaction}>
              <td>{index + 1}</td>
              <td>
              <Link to="/transaction" onClick={(e) => {
                e.preventDefault();
                this.handleClick(transaction);
              }}> {transaction} </Link>
              </td>
            </tr>
          );
        });

        return (
          <Container className="justify-content-md-center">
            <br/>
            <Row className="justify-content-md-center">Wallet Details</Row>
            <br/>
            <Table bordered hover>
              <tbody>
                <tr>
                    Address: {this.props.address.address}
                </tr>
                <tr>
                    Balance: {this.props.address.balance}
                </tr>
              </tbody>
            </Table>
            <br/>
            <Row className="justify-content-md-center">Comfirmed Transactions</Row>
            <br/>
            <Table striped bordered hover>
              <tbody>
                <tr><td>#</td><td>Transaction Hash</td></tr>
                {transactionList}
              </tbody>
            </Table>
          </Container>
        );
    }
}

const mapStateToProps = state => {
    //console.log(state);
    return {
        address: state.search.address,
    }
}

export default connect(mapStateToProps, {
  searchTransaction,
  backToIndex
})(AddressDetail);

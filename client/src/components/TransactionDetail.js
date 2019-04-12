import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Table, Row } from 'react-bootstrap';
import Search from "./Search";

// This component is used to display the details of a certain transaction
class TransactionDetail extends Component {
    render() {
      if (!this.props.transaction.payers) {
        return (<Search/>);
      }
      const payerList = this.props.transaction.payers.map((payer, index) => {
        return(
          <tr key={"payer_" + index}>
            <td>
              {index + 1}
            </td>
            <td>
              {payer.address}
            </td>
            <td>
              -{payer.amount}
            </td>
          </tr>
        );
      });

      const payeeList = this.props.transaction.payees.map((payee, index) => {
        return(
          <tr key={"payee_" + index}>
            <td>
              {index + 1}
            </td>
            <td>
              {payee.address}
            </td>
            <td>
              +{payee.amount}
            </td>
          </tr>
        );
      });

        return (
          <Container className="justify-content-md-center">
            <br/>
            <Row className="justify-content-md-center">Transaction</Row>
            <Table  striped bordered hover>
              <tr>Hash: {this.props.transaction.hash}</tr>
              <tr>
                Comfirmed: {this.props.transaction.comfirmed}
              </tr>
              <tr>
                Total amount: {this.props.transaction.total}
              </tr>
              <tr>
                Transaction fees: {this.props.transaction.fees}
              </tr>
            </Table>
            <br/>
            <Row className="justify-content-md-center">Payer</Row>
            <Table  striped bordered hover>
              <thead>
                <td>#</td>
                <td>Wallet Address</td>
                <td>Amount</td>
              </thead>
              <tbody>
                {payerList}
              </tbody>
            </Table>
            <br/>
            <Row className="justify-content-md-center">Payee</Row>
            <Table  striped bordered hover>
              <thead>
                <td>#</td>
                <td>Wallet Address</td>
                <td>Amount</td>
              </thead>
              <tbody>
                {payeeList}
              </tbody>
            </Table>
          </Container>
        );
    }
}

const mapStateToProps = state => {
  console.log(state);
    return {
        transaction: state.search.transaction,
    }
}

export default connect(mapStateToProps, null)(TransactionDetail);

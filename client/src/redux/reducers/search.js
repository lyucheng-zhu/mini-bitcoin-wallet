const initialState = {
    address: {},
    transaction: {}
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_ADDRESS_DETAIL' :
          let _address = {};
          _address.address = action.addressDetail.address;
          _address.balance = action.addressDetail.balance;
          _address.transactions = [];
          action.addressDetail.txrefs.map((txref) => {
            if(! _address.transactions.includes(txref.tx_hash))
              _address.transactions.push(txref.tx_hash);
          });
          console.log(_address.transactions);
          return {
            ...state,
            address: _address
          }
        case 'LOAD_TRANSACTION_DETAIL' :
          let _transaction = {};
          _transaction.hash = action.transactionDetail.hash;
          _transaction.comfirmed = action.transactionDetail.confirmed;
          _transaction.total = action.transactionDetail.total;
          _transaction.fees = action.transactionDetail.fees;
          _transaction.payers = action.transactionDetail.inputs.map((input) => {
            return {
              address: input.addresses,
              amount: input.output_value
            };
          });
          _transaction.payees = action.transactionDetail.outputs.map((output) => {
            return {
              address: output.addresses,
              amount: output.value
            };
          });
          return {
            ...state,
            transaction: _transaction
          }
        default:
            return state
    }
}

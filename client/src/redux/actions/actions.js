/* All redux actions.
   I am using the thunk middlewire to make async action dispatches */

import axios from 'axios';
const { history } = require('../store');
const bitcoin = require("bitcoinjs-lib");
const buffer  = require('buffer');

const API_URL = "http://localhost:5000/api";
const BLOCKCRYPHER_URL = "https://api.blockcypher.com/v1/btc/test3";

// Save the search contents for navigation
export function searchContentsChange(searchInput) {
    return (dispatch) => {
        dispatch({type: 'SEARCH_Contents_CHANGE', searchContents: searchInput})
    }
}

// Get the details of a wallet address
export function searchAddress(address){
  console.log('Searching an address');
  return (dispatch) => {
    console.log(`${BLOCKCRYPHER_URL}/addrs/` + address);
    axios.get(`${BLOCKCRYPHER_URL}/addrs/` + address)
    .then((res) => {
      console.log(res);
      let addressDetail = res.data;
      dispatch({type:'LOAD_ADDRESS_DETAIL', addressDetail: addressDetail});
      history.push('/address');
    }).catch((err) => {
      alert(err);
      console.log(err);
    });
  }
}

// Get the details of a transaction based on its hash
export function searchTransaction(transaction){
  return (dispatch) => {
    console.log('Searching a transaction');
    //console.log(`${BLOCKCRYPHER_URL}/txs/` + transaction);
    axios.get(`${BLOCKCRYPHER_URL}/txs/` + transaction)
    .then((res) => {
      console.log(res);
      let transactionDetail = res.data;
      dispatch({type:'LOAD_TRANSACTION_DETAIL', transactionDetail: transactionDetail});
      history.push('/transaction');
    }).catch((err) => {
      alert(err);
      console.log(err);
    });
  }
}

// Make a payment using BlockCrypher API
export function pay(payment){
  return (dispatch) => {
    console.log('Creating a transaction');
    console.log(payment);
    let key   = bitcoin.ECPair.fromWIF(payment.payerPrivateKeyInput, bitcoin.networks.testnet);

    // 1. Post our simple transaction information to get back the fully built transaction,
    //    includes fees when required.
    function newTransaction() {
      let newtx = {
        "inputs": [{"addresses": [payment.payerAddressInput]}],
        "outputs": [{"addresses": [payment.payeeAddressInput], "value": parseInt(payment.payingAmountInput)}],
      }
      console.log(newtx);
      return axios.post(BLOCKCRYPHER_URL + '/txs/new', JSON.stringify(newtx));
    }

    // 2. Sign the hexadecimal strings returned with the fully built transaction and include
    //    the source public address.
    function signAndSend(newtx) {
    	newtx = newtx.data;
      if (checkError(newtx)) return;
      newtx.pubkeys     = [];
      newtx.signatures  = newtx.tosign.map(function(tosign) {
        newtx.pubkeys.push(payment.payerPublicKeyInput);
        let signWithHashType = bitcoin.script.signature.encode(key.sign(new buffer.Buffer(tosign, "hex")),  bitcoin.Transaction.SIGHASH_NONE).toString("hex");
        console.log(signWithHashType);
        return signWithHashType.substring(0, signWithHashType.length - 2);
      });
      return axios.post(BLOCKCRYPHER_URL + "/txs/send", JSON.stringify(newtx)).catch(error => console.log(error.response.data.errors));
    }

    // 3. Open a websocket to wait for confirmation the transaction has been accepted in a block.
    function waitForConfirmation(finaltx) {
      console.log(finaltx);
      finaltx = finaltx.data;
      if (checkError(finaltx)) return;
      alert("Transaction " + finaltx.tx.hash + " to " + payment.payeeAddressInput + " of " +
            finaltx.tx.outputs[0].value/100000000 + " BTC sent.");
      alert("Waiting for confirmation... (may take > 10 min)");
      return finaltx.tx.hash;
    }

    function checkError(msg) {
      if (msg.errors && msg.errors.length) {
        console.log("Errors occured!!/n" + msg.errors.join("/n"));
        return true;
      }
    }

    newTransaction()
    .then(signAndSend).catch(error => console.log(error))
    .then(waitForConfirmation).catch(error => console.log(error))
    .then((transaction) => {
      axios.get(`${BLOCKCRYPHER_URL}/txs/` + transaction)
      .then((res) => {
        console.log(res);
        let transactionDetail = res.data;
        dispatch({type:'LOAD_TRANSACTION_DETAIL', transactionDetail: transactionDetail});
        history.push('/transaction');
      }).catch((err) => {
        alert(err);
        console.log(err);
      });
    });
  }
}


// Sign in
export function login(username, password){
  return (dispatch) => {
    console.log('Loging in...');
    axios({
      url: API_URL + "/user/login",
      method: "post",
      data: JSON.stringify({
        user:{
          "username" : username,
          "password" : password
        }
      }),
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((res) => {
      let user = res.data.user;
      if (!user) {
        alert("Sorry, your username and/or password are wrong! Please check again.");
      } else {
        console.log(user);
        localStorage.setItem("auth", JSON.stringify(user));
        dispatch({type: 'LOG_IN', user: user});
      }
    }).catch((err)=>{
      alert(err);
      console.log(err);
    });
  }
}

// Sign up
export function signup(username, password){
  return (dispatch) => {
    console.log('Signing up...');
    axios({
      url: API_URL + "/user/signup",
      method: "post",
      data: JSON.stringify({
        user:{
          "username" : username,
          "password" : password
        }
      }),
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((res) => {
      let user = res.data.user;
      if (!user) {
        alert("Sorry, your username and/or password are wrong! Please check again.");
      } else {
        localStorage.setItem("auth", JSON.stringify(user));
        dispatch({type: 'LOG_IN', user});
        history.push('/');
      }
    }).catch((err)=>{
      alert(err);
      console.log(err);
    });
  }
}

// Log out
export function logout(){
  return (dispatch) => {
    console.log('Loging out...');
    dispatch({type: 'LOG_OUT'});
    history.push('/');
  }
}

// Choose a saved wallet as payer
export function choosePayer(index){
  console.log("Choosing wallet " + index + "as payer...");
  return (dispatch) => {
    dispatch({type: 'CHOOSE_PAYER', index: index});
    history.push('/pay');
  }
}

// Delete a saved wallet
export function deleteWallet(token, walletId){
  return (dispatch) => {
    console.log("Deleting wallet " + walletId + "...");
    axios({
      url: API_URL + "/wallet/" + walletId,
      method: "delete",
      headers: {Authorization: "Bearer " + token}
    }).then((res) => {
      let error = res.data.err;
      if (!!error) {
        alert(error);
        console.log(error);
      } else {
        dispatch({type: 'DELETE_WALLET', walletId: walletId});
        //history.push('/wallet');
      }
    }).catch((err)=>{
      alert(err);
      console.log(err);
    });
  }
}

// Add a saved wallet
export function addWallet(token, wallet){
  return (dispatch) => {
    console.log("Adding a wallet...");
    axios({
      url: API_URL + "/wallet",
      method: "post",
      data: JSON.stringify({
        wallet: wallet
      }),
      headers : {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((res) => {
      let error = res.data.err;
      if (!!error) {
        alert(error);
        console.log(error);
      } else {
        let _wallet = res.data.wallet;
        dispatch({type: 'ADD_WALLET', wallet: _wallet});
        //history.push('/wallet');
      }
    }).catch((err)=>{
      alert(err);
      console.log(err);
    });
  }
}

// Back to main page
export function backToIndex() {
    return (dispatch) => {
        history.push("/");
    }
}

// Signin modal close
export function toggleCloseSignin() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL_SIGNIN', modalModeSignin: false})
    }
}

// Signin modal open
export function toggleOpenSignin() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL_SIGNIN', modalModeSignin: true})
    }
}

// Signup modal close
export function toggleCloseSignup() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL_SIGNUP', modalModeSignup: false})
    }
}

// Signup modal open
export function toggleOpenSignup() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL_SIGNUP', modalModeSignup: true})
    }
}

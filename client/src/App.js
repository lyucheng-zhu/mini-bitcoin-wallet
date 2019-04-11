import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header';
import Search from './components/Search'
import AddressDetail from './components/AddressDetail'
import TransactionDetail from './components/TransactionDetail'
import Payment from './components/Payment'
import Wallet from './components/Wallet'
import Login from './components/Login'
import Signup from './components/Signup'

import requireAuthentication from './utils/requireAuth'

class App extends Component {
    render() {
        //const pathname = window.location.pathname
        return (
            <div>
                <Header />
                <Login />
                <Signup />
                <Switch>
                    <Route exact path="/" component={Search} />
                    <Route exact path="/address" component={AddressDetail} />
                    <Route exact path="/transaction" component={TransactionDetail} />
                    <Route exact path="/pay" component={requireAuthentication(Payment)} />
                    <Route exact path="/wallet" component={requireAuthentication(Wallet)} />
                    <Route exact path="/signup" component={Signup} />
                    <Route path="**" component={Search} />
                </Switch>
            </div>
        );
    }
}

export default App;

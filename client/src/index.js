import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, Router } from 'react-router-dom';

import './assets/css/bootstrap.min.css';

import App from './App.js';

import { store, history } from './redux/store';

import { getUser } from './redux/actions/actions'

// The Redux store/state is re-initialized on reload so we need to reload auth
if(localStorage.auth) {
    console.log('first dispatch');
    // update localstorage
    console.log(JSON.parse(localStorage.auth));
    store.dispatch({type: 'LOG_IN', user: JSON.parse(localStorage.auth)});
}

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

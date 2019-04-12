import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import decode from "jwt-decode";

import {
    logout
 } from './../redux/actions/actions';

export default function (Componentz) {

  class AuthWrapper extends Component {

        componentWillMount() {
            if (!this.props.isAuth || !this.props.token || this.isTokenExpired(this.props.token)) {
                console.log(this.props.isAuth);
                this.props.logout();
            }
        }

        // Check if token is expired
        isTokenExpired(token){
          try {
            const decoded = decode(token);
            return (decoded.exp < Date.now() / 1000);
          } catch (err) {
            console.log("expired check failed!");
            return true;
          }
        }

        render () {
            return(
            <Componentz {...this.props} />
            )
        }
    }

    const mapStateToProps = state => {
        console.log(state);
        return {
            isAuth: state.auth.isAuth,
            token: state.auth.user.token
        }
    }

    return connect(mapStateToProps, { logout })(AuthWrapper)
}

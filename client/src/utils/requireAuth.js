import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import {
    logout
 } from './../redux/actions/actions';

export default function (Componentz) {

  class AuthWrapper extends Component {

        componentWillMount() {
            if (!this.props.isAuth) {
                console.log(this.props.isAuth);
                this.props.logout();
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
            isAuth: state.auth.isAuth
        }
    }

    return connect(mapStateToProps, { logout })(AuthWrapper)
}

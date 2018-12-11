//THIS IS SIMPLE VERSION OF PROTECTED ROUTER HOC
//IT CAN BE MODIFIED BY ADDING SOME SPECIFIC SERVER API FOR
//CHECKING VALIDITY OF TOKENS 
import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

//Utils
import getLocalState from '../utils/getLocalState';
import getItem from '../utils/getItem';

//Actions
import setUserData from '../actions/setUserData';
import setUserTokens from '../actions/setUserTokens';
import logOut from '../actions/logOut';

export default function (WrappedComponent) {
    class checkLocalStateHOC extends Component {
        constructor(props) {
            super(props);

            this._check = this._check.bind(this);
            this._checkAndRedirect = this._checkAndRedirect.bind(this);
            this._checkForLocalState = this._checkForLocalState.bind(this);
            this._checkAndValidateTokens = this._checkAndValidateTokens.bind(this);
        }

        componentDidMount() {
            this._checkAndRedirect();
        }

        componentDidUpdate() {
            this._checkAndRedirect();
        }

        _checkForLocalState() {
            const localState = getLocalState();
            if(localState === undefined) {
                return false;
            } else {
                return true;
            }
        }

        _checkAndValidateTokens() {
            try {
                const accessToken = getItem('access-token');
                const refreshToken = getItem('refresh-token');

                //This is simple method of checking user local tokens!!!
                //Modification can goes here 
                const splittedAccessToken = accessToken.split(' ');
                const splittedRefreshToken = refreshToken.split(' ');

                if(splittedAccessToken[1].length < 200 || splittedAccessToken[1].length > 200) {
                    return false;
                } else if(splittedRefreshToken[1].length < 200 || splittedRefreshToken[1].length > 200) {
                    return false;
                } else {
                    return true;
                }
                //Modification can goes here
            } catch(err) { //Get info about user every time decorated component renders and write it into redux store
                return false;
            }
        }

        _check() {
            return this._checkForLocalState() && this._checkAndValidateTokens() ? true : false;
        }
        
        _checkAndRedirect() {
            if(!this._check()) {
                this.props.logOut();
                this.props.redirectToSignin();
            } else {
                const accessToken = getItem('access-token');
                const refreshToken = getItem('refresh-token');
                
                //Set state to authenticated and then show top menu
                this.props.setUserData(getLocalState().auth.session.user.data); //While the functionality is not ready, put the data from the local storage here.
                this.props.setUserTokens({ accessToken, refreshToken });
            }
        }

        render() {
            return this._check() ? <WrappedComponent {...this.props}/> : null
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        setUserData: (data) => {
            dispatch(setUserData(data));
        },
        setUserTokens: (tokens) => {
            dispatch(setUserTokens(tokens));
        },
        redirectToSignin: () => {
            dispatch(push('/signin'))
        },
        logOut: () => {
            dispatch(logOut());
        }
    })

    return connect(null, mapDispatchToProps)(checkLocalStateHOC)
}
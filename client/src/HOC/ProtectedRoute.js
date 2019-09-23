import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

// Actions
import { push } from 'connected-react-router';
import refreshTokens from '../actions/refreshTokens';
import setUserData from '../actions/setUserData';
import logOut from '../actions/logOut';

// Constants
import RESET_REFRESHED from '../constants/RESET_REFRESHED';

// Utils
import isExpiredToken from '../utils/isExpiredToken';
import getLocalState from '../utils/getLocalState';
import getItem from '../utils/getItem';

// Styles
import { styles } from '../assets/jss/styles';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (WrappedComponent) {
    class ProtectRoute extends Component {
        constructor(props) {
            super(props);
            this._check = this._check.bind(this);
            this._logOut = this._logOut.bind(this);
            this._checkForLocalState = this._checkForLocalState.bind(this);
            this._getDecodedLocalTokens = this._getDecodedLocalTokens.bind(this);
            this._checkForTokensRefresh = this._checkForTokensRefresh.bind(this);
        }

        componentWillMount() {
            this._refreshTokens();
            this._logOut();
        }

        componentDidUpdate(prevProps) {
            if(prevProps.auth.refreshTokens.loading) {
                this.props.resetRefreshed();
            }
        }

        _checkForTokensRefresh() {
            if (this._check()) { // If local state and tokens are whole
                const accessToken = getItem('access-token');
                const refreshToken = getItem('refresh-token');  
                if (isExpiredToken(accessToken)) {
                    if (isExpiredToken(refreshToken)) {
                        return false; // Both tokens are expired, need to logIn again 
                    } else {
                        return true; // That's the case when need to send request for new tokens
                    }
                } else {
                    return false; // Everything OK, still can use access token
                }
            } else {
                return false;
            }
        }

        _refreshTokens() {
            if (this._checkForTokensRefresh()) { // Validation for sending a request for updating tokens
                // Need to use api request for getting new tokes
                const refreshToken = getItem('refresh-token');
                this.props.refreshTokens(refreshToken);
            }
        }

        _checkForLocalState() {
            const localState = getLocalState();
            if (localState === undefined) {
                return false;
            } else {
                return true;
            }
        }

        _getDecodedLocalTokens() { // Check if tokens are consists in local storage
            try {
                const accessToken = getItem('access-token');
                const refreshToken = getItem('refresh-token');

                const pureAccessToken = accessToken.split(' ')[1];
                const pureRefreshToken = refreshToken.split(' ')[1];

                const decodedAccessToken = jwtDecode(pureAccessToken);
                const decodedRefreshToken = jwtDecode(pureRefreshToken);

                return { decodedAccessToken, decodedRefreshToken }
            } catch (err) {
                return false;
            }
        }

        _check() { // Check if tokens and copy of local state are whole
            return this._checkForLocalState() && this._getDecodedLocalTokens() ? true : false;
        }

        _logOut() {
            if (!this._check()) {
                this.props.logOut();
                this.props.redirectToSignin();
            }
        }

        render() {
            const { auth, classes } = this.props;
            if(this._check()) {
                if(this._checkForTokensRefresh()) {
                    if(auth.refreshTokens.loading) {
                        return <div className={classes.loader}>
                                    <CircularProgress/>
                                </div>
                    } else if(auth.refreshTokens.refreshed) {
                        return <WrappedComponent {...this.props} />
                    } else {
                        return null;
                    }
                } else {
                    return <WrappedComponent {...this.props} />
                }
            } else {
                return null;
            }
        }
    }

    const mapStateToProps = (state) => ({
        auth: state.auth
    });

    const mapDispatchToProps = (dispatch) => ({
        refreshTokens: (refreshToken) => {
            dispatch(refreshTokens(refreshToken));
        },
        setUserData: (data) => {
            dispatch(setUserData(data));
        },
        resetRefreshed: () => {
            dispatch({ type: RESET_REFRESHED });
        },
        redirectToSignin: () => {
            dispatch(push('/signin'))
        },
        logOut: () => {
            dispatch(logOut());
        }
    })

    ProtectRoute = withStyles(styles)(ProtectRoute);
    return connect(mapStateToProps, mapDispatchToProps)(ProtectRoute)
}
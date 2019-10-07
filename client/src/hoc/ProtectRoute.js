import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

// Actions
import { push } from 'connected-react-router';
import refreshTokens from '../actions/refreshTokens';
import logOut from '../actions/logOut';

// Constants
import RESET_REFRESHED from '../constants/RESET_REFRESHED';

// Utils
import isExpiredToken from '../utils/isExpiredToken';
import getLocal from '../utils/getLocal';

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
            this._checkId = this._checkId.bind(this);
            this._checkLocalTokens = this._checkLocalTokens.bind(this);
            this._checkTokensRefresh = this._checkTokensRefresh.bind(this);
        }

        componentDidMount() {
            this._refreshTokens();
            this._logOut();
        }

        componentDidUpdate(prevProps) {
            if(prevProps.auth.refreshTokens.loading) {
                this.props.resetRefreshed();
            }
        }

        _checkTokensRefresh() {
            if (this._check()) { // If id and tokens are whole
                const accessToken = getLocal('access-token');
                const refreshToken = getLocal('refresh-token');  
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
            if (this._checkTokensRefresh()) { // Validation for sending a request for updating tokens
                // Need to use api request for getting new tokes
                const refreshToken = getLocal('refresh-token');
                this.props.refreshTokens(refreshToken);
            }
        }

        _checkLocalTokens() { // Check if tokens are consists in local storage
            try {
                const accessToken = getLocal('access-token');
                const refreshToken = getLocal('refresh-token');
                const pureAccessToken = accessToken.split(' ')[1];
                const pureRefreshToken = refreshToken.split(' ')[1];
                
                jwtDecode(pureAccessToken);
                jwtDecode(pureRefreshToken);

                return true;
            } catch (err) {
                return false;
            }
        }

        _checkId() {
            return getLocal('id') ? true : false;
        }

        _check() { // Check if tokens and id are whole
            console.log(this._checkId())
            return this._checkId() && this._checkLocalTokens();
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
                if(this._checkTokensRefresh()) {
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
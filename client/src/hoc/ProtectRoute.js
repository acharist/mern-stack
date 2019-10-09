import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

// Actions
import { push } from 'connected-react-router';
import refreshTokens from '../actions/refreshTokens';
import logOut from '../actions/logOut';
import request from '../actions/request';

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

// Constants
import REFRESH_SESSION_DATA_REQUEST from '../constants/REFRESH_SESSION_DATA_REQUEST';
import REFRESH_SESSION_DATA_SUCCESS from '../constants/REFRESH_SESSION_DATA_SUCCESS';
import REFRESH_SESSION_DATA_FAILURE from '../constants/REFRESH_SESSION_DATA_FAILURE';

// Components
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (WrappedComponent) {
    class ProtectRoute extends Component {
        constructor(props) {
            super(props);
            this.logOut = this.logOut.bind(this);
            this.checkId = this.checkId.bind(this);
            this.checkLocalTokens = this.checkLocalTokens.bind(this);
            this.accessToken = getLocal('access-token');
            this.refreshToken = getLocal('refresh-token');
            this.id = getLocal('id');
        }

        async componentDidMount() {
            if (this.checkId() && this.checkLocalTokens()) { // If id and tokens are whole   
                if (isExpiredToken(this.refreshToken)) this.logOut();
                if (isExpiredToken(this.accessToken)) {
                    await this.props.refreshTokens(this.refreshToken);
                }
            } else {
                this.logOut();
            }

            if(!this.props.auth.session.user.data) {
                await this.props.request(`/api/user/${this.id}`, 'get')(REFRESH_SESSION_DATA_REQUEST, REFRESH_SESSION_DATA_SUCCESS, REFRESH_SESSION_DATA_FAILURE);
            }
        }

        checkLocalTokens() { // Check if tokens are consists in local storage
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

        checkId() {
            return getLocal('id') ? true : false;
        }

        logOut() {
            this.props.logOut();
            this.props.redirectToSignin();
        }

        render() {
            const { auth, classes } = this.props;
            if (auth.refreshTokens.loading || auth.session.loading) return <div className={classes.loader}><CircularProgress /></div>
            if (!auth.session.loading && !auth.session.user.data) return null;
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => ({
        auth: state.auth
    });

    const mapDispatchToProps = (dispatch) => ({
        request: (url, method, params, headers) => {
            return (REQEST, SUCCESS, FAILURE) => {
                return dispatch(request(url, method, params, headers)(REQEST, SUCCESS, FAILURE));
            }
        },
        refreshTokens: (refreshToken) => {
            return dispatch(refreshTokens(refreshToken));
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
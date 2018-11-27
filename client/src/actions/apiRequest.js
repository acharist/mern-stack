import axios from 'axios';
import jwtDecode from 'jwt-decode';
import isToken from '../utils/isToken';
import getItem from '../utils/getItem';

//Actions
import { push } from 'connected-react-router';
import setUserTokens from './setUserTokens';
import disableSession from './disableSession';
import refreshTokens from './refreshTokens';

// const currentTime = new Date().getTime() / 1000;

//Simple 'request' function that makes a request to the specified url
//For more convenience there is using 'carrying'
const request = (url, method, accessToken) => {
    return (REQUEST, SUCCESS, FAILURE) => {
        return (dispatch) => {
            dispatch({ type: REQUEST });
            axios.defaults.headers.common['authorization'] = accessToken;
            axios[method](url)
                .then((res) => {
                    dispatch({ type: SUCCESS, payload: res.data });
                })
                .catch((err) => {
                    dispatch({ type: FAILURE, payload: err.response.data });
                });
        }
    }
}

//More complex 'request' function which makes request for refreshing tokens, and then make usual request for specified url
const requestWithTokensRefresh = (url, method, request) => {
    return (REQUEST, SUCCESS, FAILURE) => {
        return (dispatch) => {
            if(isToken('refresh-token')) {
                const refreshToken = getItem('refresh-token');
                const decodedRefreshToken = jwtDecode(refreshToken);
                if(new Date().getTime() / 1000 > decodedRefreshToken.exp) {
                    dispatch(push('/signin'));
                } else {
                    //Wait for asynchronous processing of tokens
                    const tokensPromise = new Promise((res, rej) => {
                        dispatch(refreshTokens(refreshToken, [res, rej])) //this is async refresh
                    });
                    tokensPromise
                        //If success, make new request on the same url
                        .then(() => {
                            const accessToken = getItem('access-token');
                            const refreshToken = getItem('refresh-token');
                            dispatch(setUserTokens({ accessToken, refreshToken }));
                            request(url, method, accessToken)(REQUEST, SUCCESS, FAILURE)(dispatch);
                        })
                        //Else, tell user, that this is some error
                        .catch(() => {
                            //err - refreshTokens error
                            dispatch(disableSession());
                            dispatch(push('/signin'));
                        });
                }
            } else {
                dispatch(push('/signin'));
            }
        }
    }
}

//The main function (action) that determines which request should be executed 
export default (url, method = 'get') => {
    return (REQUEST, SUCCESS, FAILURE) => {
        return (dispatch) => {
            if(isToken('access-token')) {
                const accessToken = getItem('access-token');
                const decodedAccessToken = jwtDecode(accessToken);

                if(new Date().getTime() / 1000 > decodedAccessToken.exp) { // Истек access токен
                    console.log('With Refresh token')
                    requestWithTokensRefresh(url, method, request)(REQUEST, SUCCESS, FAILURE)(dispatch)
                } else {
                    console.log('With Access token')
                    const accessToken = getItem('access-token');
                    request(url, method, accessToken)(REQUEST, SUCCESS, FAILURE)(dispatch);
                }
            } else {
                requestWithTokensRefresh(url, method, request)(REQUEST, SUCCESS, FAILURE)(dispatch)
            }
        }
    }
}
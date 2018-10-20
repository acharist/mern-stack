import SIGNIN_USER_REQUEST from '../constants/SIGNIN_USER_REQUEST';
import SIGNIN_USER_SUCCESS from '../constants/SIGNIN_USER_SUCCESS';
import SIGNIN_USER_FAILURE from '../constants/SIGNIN_USER_FAILURE';

import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';
import { push } from 'connected-react-router';

import enableSession from './enableSession';

export default (email, password) => {
    return (dispach) => {
        dispach({ type: SIGNIN_USER_REQUEST });

        axios.post('/api/auth/signin', {
            email,
            password
        })
        .then((data) => {
            saveTokenToStorage('access-token', data.data.accessToken);
            saveTokenToStorage('refresh-token', data.data.refreshToken);
            const { accessToken, refreshToken } = data.data;
             
            dispach(push('/'));
            // dispach({ type: SIGNIN_USER_SUCCESS, payload: { accessToken, refreshToken } });

            dispach({ type: SIGNIN_USER_SUCCESS });
            dispach(enableSession({ accessToken, refreshToken }));
        })
        .catch(err => { 
            const { data, status, statusText } = err.response;
            dispach({ type: SIGNIN_USER_FAILURE, payload: { formMessage: data.message, status, statusText } });  
        });
    }
}
import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';
import { push } from 'connected-react-router';

import enableSession from './enableSession';

export default (name, email, password) => {
    return (dispach) => {
        dispach({ type: SIGNUP_USER_REQUEST });

        axios.post('/api/auth/signup', {
            name,
            email,
            password
        })
        .then((data) => {
            saveTokenToStorage('access-token', data.data.accessToken);
            saveTokenToStorage('refresh-token', data.data.refreshToken);
            const { accessToken, refreshToken } = data.data;

            dispach(push('/'));
            // dispach({ type: SIGNUP_USER_SUCCESS, payload: { accessToken, refreshToken } });

            dispach({ type: SIGNUP_USER_SUCCESS });
            dispach(enableSession({ accessToken, refreshToken })); //Enable session after success auth
        })
        .catch(err => {
            const { data, status, statusText } = err.response;
            dispach({ type: SIGNUP_USER_FAILURE, payload: { formMessage: data.message, status, statusText } }); 
        });
    }
}
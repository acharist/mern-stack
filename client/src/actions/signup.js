import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';
import { push } from 'connected-react-router';

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
            
            dispach(push('/'));
            dispach({ type: SIGNUP_USER_SUCCESS, payload: data });
        })
        .catch(err => { dispach({ type: SIGNUP_USER_FAILURE, payload: err.response }) });
    }
}
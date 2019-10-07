import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

import axios from 'axios';
import { push } from 'connected-react-router';

import setUserData from './setUserData';
import setLocal from '../utils/setLocal';

export default (name, email, password) => {
    return (dispach) => {
        dispach({ type: SIGNUP_USER_REQUEST });

        return axios.post('/api/auth/signup', {
            name,
            email,
            password
        })
        .then((data) => {
            const { accessToken, refreshToken } = data.data;
            setLocal('access-token', `Bearer ${accessToken}`);
            setLocal('refresh-token', `Bearer ${refreshToken}`);
            dispach({ type: SIGNUP_USER_SUCCESS });
            dispach(setUserData(data.data.data));
            setLocal('id', data.data.data._id);  
            dispach(push('/'));
        })
        .catch(err => {
            const { data, status, statusText } = err.response;
            dispach({ type: SIGNUP_USER_FAILURE, payload: { formMessage: data.message, status, statusText } }); 
        });
    }
}
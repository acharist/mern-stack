import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

import { store } from '../store/store';

import axios from 'axios';
import { push } from 'connected-react-router';

import setUserData from './setUserData';
import saveLocal from '../utils/saveLocal';

export default (name, email, password) => {
    return (dispach) => {
        dispach({ type: SIGNUP_USER_REQUEST });

        axios.post('/api/auth/signup', {
            name,
            email,
            password
        })
        .then((data) => {
            const { accessToken, refreshToken } = data.data;
            saveLocal('access-token', `Bearer ${accessToken}`);
            saveLocal('access-token', `Bearer ${refreshToken}`);

            dispach({ type: SIGNUP_USER_SUCCESS });
            dispach(setUserData(data.data.data));
            saveLocal('id', data.data.data._id);
            
            saveLocal('state', store.getState(), true);
            dispach(push('/'));
        })
        .catch(err => {
            const { data, status, statusText } = err.response;
            dispach({ type: SIGNUP_USER_FAILURE, payload: { formMessage: data.message, status, statusText } }); 
        });
    }
}
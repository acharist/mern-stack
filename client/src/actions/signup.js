import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

import { store } from '../store/store';

import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';
import saveStateToStorage from '../utils/saveStateToStorage';
import { push } from 'connected-react-router';

import setUserTokens from './setUserTokens';
import setUserData from './setUserData';

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
            
            saveTokenToStorage('access-token', accessToken);
            saveTokenToStorage('refresh-token', refreshToken);

            
            dispach({ type: SIGNUP_USER_SUCCESS });
            dispach(setUserTokens({ accessToken, refreshToken })); //Enable session after success auth
            dispach(setUserData(data.data.data));
            
            //After successfully changing the state, save its local copy (for user session)
            saveStateToStorage(store.getState());
            dispach(push('/'));
        })
        .catch(err => {
            const { data, status, statusText } = err.response;
            dispach({ type: SIGNUP_USER_FAILURE, payload: { formMessage: data.message, status, statusText } }); 
        });
    }
}
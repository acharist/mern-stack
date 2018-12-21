import SIGNIN_USER_REQUEST from '../constants/SIGNIN_USER_REQUEST';
import SIGNIN_USER_SUCCESS from '../constants/SIGNIN_USER_SUCCESS';
import SIGNIN_USER_FAILURE from '../constants/SIGNIN_USER_FAILURE';

import { store } from '../store/store';

import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';
import saveStateToStorage from '../utils/saveStateToStorage';
import { push } from 'connected-react-router';

import setUserData from './setUserData';

export default (email, password) => {
    return (dispach) => {
        dispach({ type: SIGNIN_USER_REQUEST });

        axios.post('/api/auth/signin', {
            email,
            password
        })
        .then((data) => {
            const { accessToken, refreshToken } = data.data;

            saveTokenToStorage('access-token', accessToken);
            saveTokenToStorage('refresh-token', refreshToken);
            
            
            dispach({ type: SIGNIN_USER_SUCCESS });
            dispach(setUserData(data.data.data));
            
            //After successfully changing the state, save its local copy
            saveStateToStorage(store.getState());
            dispach(push('/'));
        })
        .catch(err => { 
            const { data, status, statusText } = err.response;
            dispach({ type: SIGNIN_USER_FAILURE, payload: { formMessage: data.message, status, statusText } });  
        });
    }
}
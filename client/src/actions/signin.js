import SIGNIN_USER_REQUEST from '../constants/SIGNIN_USER_REQUEST';
import SIGNIN_USER_SUCCESS from '../constants/SIGNIN_USER_SUCCESS';
import SIGNIN_USER_FAILURE from '../constants/SIGNIN_USER_FAILURE';

import { store } from '../store/store';

import axios from 'axios';
import setLocal from '../utils/setLocal';
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
            setLocal('access-token', `Bearer ${accessToken}`);
            setLocal('access-token', `Bearer ${refreshToken}`);
            dispach({ type: SIGNIN_USER_SUCCESS });
            dispach(setUserData(data.data.data));
            setLocal('id', data.data.data._id);
            
            setLocal('state', store.getState(), true);
            dispach(push('/'));
        })
        .catch(err => { 
            const { data, status, statusText } = err.response;
            dispach({ type: SIGNIN_USER_FAILURE, payload: { formMessage: data.message, status, statusText } });  
        });
    }
}
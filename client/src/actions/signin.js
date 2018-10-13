import SIGNIN_USER_REQUEST from '../constants/SIGNIN_USER_REQUEST';
import SIGNIN_USER_SUCCESS from '../constants/SIGNIN_USER_SUCCESS';
import SIGNIN_USER_FAILURE from '../constants/SIGNIN_USER_FAILURE';

import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';
import { push } from 'connected-react-router'

export default (email, password) => {
    return (dispach) => {
        dispach({ type: SIGNIN_USER_REQUEST });

        axios.post('/api/auth/signin', {
            email,
            password
        })
        .then((data) => {
            saveTokenToStorage(data.data.token);
             
            dispach(push('/'));
            dispach({ type: SIGNIN_USER_SUCCESS, payload: data });
        })
        .catch(err => { dispach({ type: SIGNIN_USER_FAILURE, payload: err.response }) });
    }
}
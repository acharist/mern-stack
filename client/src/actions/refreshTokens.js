import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';
import { push } from 'connected-react-router';
import isFuncrion from '../utils/isFunction';
import logOut from '../actions/logOut';

import REFRESH_TOKENS_REQUEST from '../constants/REFRESH_TOKENS_REQUEST';
import REFRESH_TOKENS_SUCCESS from '../constants/REFRESH_TOKENS_SUCCESS';
import REFRESH_TOKENS_FAILURE from '../constants/REFRESH_TOKENS_FAILURE';

export default (refreshToken, callback) => { //requestWait is an array and there is other res/rej async callbacks
    return (dispach) => {
        dispach({ type: REFRESH_TOKENS_REQUEST })

        const options = {
            method: 'POST',
            headers: { 'authorization': refreshToken },
            url: '/api/auth/refresh-tokens'
        }
        axios(options)
        .then((res) => {
            const { accessToken, refreshToken } = res.data;
            saveTokenToStorage('access-token', accessToken);
            saveTokenToStorage('refresh-token', refreshToken);
            dispach({ type: REFRESH_TOKENS_SUCCESS });
            if(isFuncrion(callback)) {
                callback();
            } 
        })
        .catch((err) => {
            dispach({ type: REFRESH_TOKENS_FAILURE, payload: err.data }); 
            dispach(logOut());
            dispach(push('/signin'))
        });
    }
}
import axios from 'axios';
import setLocal from '../utils/setLocal';
import { push } from 'connected-react-router';
import logOut from '../actions/logOut';

import REFRESH_TOKENS_REQUEST from '../constants/REFRESH_TOKENS_REQUEST';
import REFRESH_TOKENS_SUCCESS from '../constants/REFRESH_TOKENS_SUCCESS';
import REFRESH_TOKENS_FAILURE from '../constants/REFRESH_TOKENS_FAILURE';

export default (refreshToken) => { //requestWait is an array and there is other res/rej async callbacks
    return (dispach) => {
        dispach({ type: REFRESH_TOKENS_REQUEST })

        const options = {
            method: 'POST',
            headers: { 'authorization': refreshToken },
            url: '/api/auth/refresh-tokens'
        }

        return axios(options)
            .then((res) => {
                const { accessToken, refreshToken } = res.data;
                setLocal('access-token', `Bearer ${accessToken}`);
                setLocal('access-token', `Bearer ${refreshToken}`);
                dispach({ type: REFRESH_TOKENS_SUCCESS });
            })
            .catch((err) => {
                dispach({ type: REFRESH_TOKENS_FAILURE, payload: err.data });
                dispach(logOut());
                dispach(push('/signin'))
            });
    }
}
import axios from 'axios';
import saveTokenToStorage from '../utils/saveTokenToStorage';

import REFRESH_TOKENS from '../constants/REFRESH_TOKENS';

export default (refreshToken, requestWait) => { //requestWait is an array and there is other res/rej async callbacks
    return (dispach) => {
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
            dispach({ type: REFRESH_TOKENS });
            requestWait[0](res); //Call async res
        })
        .catch((err) => {
            requestWait[1](err); //Call async rej
        });
    }
}
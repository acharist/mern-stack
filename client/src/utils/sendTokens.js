import axios from 'axios';
import jwtDecode from 'jwt-decode';
const currentTime = new Date().getTime() / 1000;
const accessTokenURL = '/api/auth/check-access';
const refreshTokensURL = '/api/auth/refresh-tokens';

const sendToken = (url) => {
    axios.post(url, {
        headers: {
            'x-authorization': accessToken
        }
    }).then((data) => {
        //new tokens
    }).catch((err) => {
        throw new Error('Something bad');
    });
}

export default (url) => {
    //Get token from storage
    const accessToken = localStorage.getItem('access-token');
    const refreshTokens = localStorage.getItem('refresh-token');
    if (accessToken) {
        const pureAccessToken = accessToken.split(' ')[1];
        const decodedAccessToken = jwtDecode(pureAccessToken);

        if (decodedAccessToken.exp > currentTime) {
            //ok
            sendToken('/api/auth/');
        } else {
            //not ok
            if(refreshTokens) {

            } else {
                throw new Error(`Not authorized (Don\'t have refresh token)`);
            }
        }
    } else {
        throw new Error(`Not authorized (Don\'t have access token)`);
    }
    if (!accessToken || !refreshTokens) {
        //send refresh token with axios, to get new tokens
        axios.post(url, {
            headers: {
                'x-authorization': refreshTokens
            }
        }).then((data) => {
            //new tokens
        }).catch((err) => {
            throw new Error('Something bad');
        });
    }

    // if(refreshTokens === null) {
    //     throw new Error(`Not authorized (Don\'t have ${name})`);
    // } else {
    //     const pureToken = token.split(' ')[1];
    //     const decoded = jwtDecode(pureToken);
    //     const currentTime = new Date().getTime() / 1000;

    //     if(decoded.exp > currentTime) {

    //     }
    //     console.log(`${currentTime} ${decoded.exp}`)
    // }
    // axios.post(url, null, {
    //     headers: {

    //     }
    // })
}
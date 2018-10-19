import axios from 'axios';
import jwtDecode from 'jwt-decode';
const currentTime = new Date().getTime() / 1000;

export default (url) => {
    //Get token from storage
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');
    if(accessToken) {
        const pureAccessToken = accessToken.split(' ')[1];
        const decodedAccessToken = jwtDecode(pureAccessToken);
        
        if(currentTime > decodedAccessToken.exp) {
            // throw new Error('Not authorized (Expired access-token)');
            if(refreshToken) {
                const pureRefreshToken = refreshToken.split(' ')[1];
                const decodedRefreshToken = jwtDecode(pureRefreshToken);
                
                if(currentTime < decodedRefreshToken.exp) {
                    //send refresh token with axios, to get new tokens
                    axios.post(url, {
                        headers: {
                            'x-authorization': refreshToken
                        }
                    }).then((data) => {
                        //new tokens
                    }).catch((err) => {
                        throw new Error('Something bad');
                    });
                } 
            } else {
                throw new Error('Not authorized (Don\'t have refresh-token.)');
            }
        } else {
            return;
        }
    } else {
        throw new Error('Not authorized (Don\'t have access-token.)');
    }
    
    // if(refreshToken === null) {
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
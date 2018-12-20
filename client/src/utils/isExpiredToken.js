import jwtDecode from 'jwt-decode';

export default (token) => {
    const pureToken = token.split(' ');
    const decodedToken = jwtDecode(pureToken[1]);

    if(new Date().getTime() / 1000 > decodedToken.exp) {
        return true;
    } else {
        return false;
    }
}
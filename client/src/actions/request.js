import axios from 'axios';
import getLocal from '../utils/getLocal';

export default (url, method, params, headers) => {
    return (REQUEST, SUCCESS, FAILURE) => {
        return (dispatch) => {
            dispatch({ type: REQUEST });
            const accessToken = getLocal('access-token');
            axios.defaults.headers.common['authorization'] = accessToken;
            return axios[method](url, params, headers)
                .then((res) => {
                    dispatch({ type: SUCCESS, payload: res.data });
                })
                .catch((err) => {
                    dispatch({ type: FAILURE, payload: err.response.data });
                    throw err;
                })
        }
    }
}
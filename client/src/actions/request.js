import axios from 'axios';
import getItem from '../utils/getItem';
import isFuncrion from '../utils/isFunction';

export default (url, method, params, headers, callback) => {
    return (REQUEST, SUCCESS, FAILURE) => {
        return (dispatch) => {
            dispatch({ type: REQUEST, payload: true });
            const accessToken = getItem('access-token');
            axios.defaults.headers.common['authorization'] = accessToken;

            axios[method](url, params, headers)
                .then((res) => {
                    console.log(res.data)
                    dispatch({ type: SUCCESS, payload: res.data });
                    //Call callback if ok
                    if(isFuncrion(callback)) {
                        callback();
                    } 
                })
                .catch((err) => {
                    dispatch({ type: FAILURE, payload: err.response.data });
                });
        }
    }
}
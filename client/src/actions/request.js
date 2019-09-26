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

// .then((res) => {
//     if(callbacks.succsess) {
//         callbacks.succsess();
//     }
// })
// .catch((err) => {
//     if(typeof callbacks === 'object' && (callbacks.failure && isFuncrion(callbacks.succsess))) {
//         callbacks.failure();
//     }
// });

// import axios from 'axios';
// import getItem from '../utils/getItem';

// export default (url, method, params, headers) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const accessToken = getItem('access-token');
//             axios.defaults.headers.common['authorization'] = accessToken;
//             const response = await axios[method](url, params, headers);
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
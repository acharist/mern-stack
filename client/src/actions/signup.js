import POST_USER_DATA_REQUEST from '../constants/POST_USER_DATA_REQUEST';
import POST_USER_DATA_SUCCESS from '../constants/POST_USER_DATA_SUCCESS';
import POST_USER_DATA_FAILURE from '../constants/POST_USER_DATA_FAILURE';

import axios from 'axios';

export default (name, email, password) => {
    return (dispach) => {
        dispach({ type: POST_USER_DATA_REQUEST });

        axios.post('/api/signup', {
            name,
            email,
            password
        })
        .then(data => { dispach({ type: POST_USER_DATA_SUCCESS, payload: data }) })
        .catch(err => { dispach({ type: POST_USER_DATA_FAILURE, payload: err.response }) });
    }
}
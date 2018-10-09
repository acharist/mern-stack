//constants
import POST_USER_DATA_REQUEST from '../constants/POST_USER_DATA_REQUEST';
import POST_USER_DATA_SUCCESS from '../constants/POST_USER_DATA_SUCCESS';
import POST_USER_DATA_FAILURE from '../constants/POST_USER_DATA_FAILURE';

const initialState = {
    loading: false,
    error: false,
    payload: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case POST_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                payload: action.payload
            }
        case POST_USER_DATA_FAILURE:
            return {
                ...state,
                error: true,
                loading: false,
                payload: action.payload
            }
        default:
            return state;
    }
}
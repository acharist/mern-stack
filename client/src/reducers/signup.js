//constants
import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

const initialState = {
    loading: false,
    error: false,
    payload: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                payload: action.payload
            }
        case SIGNUP_USER_FAILURE:
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
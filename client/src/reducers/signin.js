//constants
import SIGNIN_USER_REQUEST from '../constants/SIGNIN_USER_REQUEST';
import SIGNIN_USER_SUCCESS from '../constants/SIGNIN_USER_SUCCESS';
import SIGNIN_USER_FAILURE from '../constants/SIGNIN_USER_FAILURE';

const initialState = {
    loading: false,
    error: false,
    payload: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIGNIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                payload: action.payload
            }
        case SIGNIN_USER_FAILURE:
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
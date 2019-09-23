// constants
import GET_USERS_REQUEST from '../constants/GET_USERS_REQUEST';
import GET_USERS_SUCCESS from '../constants/GET_USERS_SUCCESS';
import GET_USERS_FAILURE from '../constants/GET_USERS_FAILURE';
import GET_USER_ID from '../constants/GET_USER_ID';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: '',
    userId: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorData: ''
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false,
                errorData: '',
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                data: '',
                error: true,
                errorData: action.payload
            }
        case GET_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state;
    }
}
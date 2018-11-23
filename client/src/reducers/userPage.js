//constants
import GET_USER_REQUEST from '../constants/GET_USER_REQUEST';
import GET_USER_SUCCESS from '../constants/GET_USER_SUCCESS';
import GET_USER_FAILURE from '../constants/GET_USER_FAILURE';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorData: ''
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false,
                errorData: '',
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                data: '',
                error: true,
                errorData: action.payload
            }
        default:
            return state;
    }
}
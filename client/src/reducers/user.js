// Constants
import GET_USER_REQUEST from '../constants/GET_USER_REQUEST';
import GET_USER_SUCCESS from '../constants/GET_USER_SUCCESS';
import GET_USER_FAILURE from '../constants/GET_USER_FAILURE';
import SET_POST_ID from '../constants/SET_POST_ID';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: '',
    postId: ''
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
                data: action.payload.data,
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
        case SET_POST_ID:
            return {
                ...state,
                postId: action.payload
            }
        default:
            return state;
    }
}
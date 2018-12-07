//Constants
import CREATE_POST_REQUEST from '../constants/CREATE_POST_REQUEST';
import CREATE_POST_SUCCESS from '../constants/CREATE_POST_SUCCESS';
import CREATE_POST_FAILURE from '../constants/CREATE_POST_FAILURE';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false,
                errorData: ''
            }
        case CREATE_POST_FAILURE:
            return { 
                ...state,
                loading: false,
                error: true,
                errorData: action.payload,
                data: ''
            }
        default:
            return state;
    }
}
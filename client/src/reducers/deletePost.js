//Constants
import DELETE_POST_REQUEST from '../constants/DELETE_POST_REQUEST';
import DELETE_POST_SUCCESS from '../constants/DELETE_POST_SUCCESS';
import DELETE_POST_FAILURE from '../constants/DELETE_POST_FAILURE';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false,
                errorData: ''
            }
        case DELETE_POST_FAILURE:
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
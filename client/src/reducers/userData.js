// Constants
import UPDATE_INFO_REQUEST from '../constants/UPDATE_INFO_REQUEST';
import UPDATE_INFO_SUCCESS from '../constants/UPDATE_INFO_SUCCESS';
import UPDATE_INFO_FAILURE from '../constants/UPDATE_INFO_FAILURE';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INFO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false,
                errorData: ''
            }
        case UPDATE_INFO_FAILURE:
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
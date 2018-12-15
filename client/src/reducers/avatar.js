//Constants
import UPDATE_AVATAR_REQUEST from '../constants/UPDATE_AVATAR_REQUEST';
import UPDATE_AVATAR_SUCCESS from '../constants/UPDATE_AVATAR_SUCCESS';
import UPDATE_AVATAR_FAILURE from '../constants/UPDATE_AVATAR_FAILURE';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AVATAR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_AVATAR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false,
                errorData: ''
            }
        case UPDATE_AVATAR_FAILURE:
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
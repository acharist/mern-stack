//constants
import REFRESH_TOKENS_REQUEST from '../constants/REFRESH_TOKENS_REQUEST';
import REFRESH_TOKENS_SUCCESS from '../constants/REFRESH_TOKENS_SUCCESS';
import REFRESH_TOKENS_FAILURE from '../constants/REFRESH_TOKENS_FAILURE';
import RESET_REFRESHED from '../constants/RESET_REFRESHED';

const initialState = {
    loading: false,
    refreshed: false,
    error: false,
    errorData: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_TOKENS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REFRESH_TOKENS_SUCCESS:
            return {
                ...state,
                loading: false,
                refreshed: true,
                errorData: ''
            }
        case REFRESH_TOKENS_FAILURE:
            return {
                ...state,
                error: true,
                loading: false,
                errorData: action.payload,
                refreshed: false
            }
        case RESET_REFRESHED:
            return {
                ...state,
                refreshed: false
            }
        default:
            return state;
    }
}
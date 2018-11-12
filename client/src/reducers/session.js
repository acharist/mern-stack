//constants
import ENABLE_SESSION from '../constants/ENABLE_SESSION';
import DISABLE_SESSION from '../constants/DISABLE_SESSION';
import REFRESH_TOKENS from '../constants/REFRESH_TOKENS';

const initialState = {
    isAuthenticated: false,
    tokensRefreshed: false,
    user: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ENABLE_SESSION:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case DISABLE_SESSION:
            return {
                ...state,
                isAuthenticated: false,
                tokensRefreshed: false,
                user: ''
            }
        case REFRESH_TOKENS:
            return {
                ...state,
                tokensRefreshed: true,
            }
        default:
            return state;
    }
}
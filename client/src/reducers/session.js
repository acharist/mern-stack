//constants
import ENABLE_SESSION from '../constants/ENABLE_SESSION';
import DISABLE_SESSION from '../constants/DISABLE_SESSION';

const initialState = {
    isAuthenticated: false,
    user: ''
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
                user: action.payload
            }
        default:
            return state;
    }
}
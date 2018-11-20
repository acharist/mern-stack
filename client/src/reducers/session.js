//constants
import DISABLE_SESSION from '../constants/DISABLE_SESSION';
import REFRESH_TOKENS from '../constants/REFRESH_TOKENS';
import SET_USER_DATA from '../constants/SET_USER_DATA';
import SET_USER_TOKENS from '../constants/SET_USER_TOKENS';
import LOGOUT from '../constants/LOGOUT';

const initialState = {
    isAuthenticated: false,
    tokensRefreshed: false,
    user: {
        tokens: '',
        data: ''
    },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_TOKENS:
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...state.user,
                    tokens: action.payload
                }
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
        case SET_USER_DATA:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload
                }
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                tokensRefreshed: false,
                user: {
                    ...state.user,
                    tokens: '',
                    data: ''
                },
            }
        default:
            return state;
    }
}
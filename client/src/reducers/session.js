//constants
import DISABLE_SESSION from '../constants/DISABLE_SESSION';
import SET_USER_DATA from '../constants/SET_USER_DATA';
import LOGOUT from '../constants/LOGOUT';

import REFRESH_SESSION_DATA_REQUEST from '../constants/REFRESH_SESSION_DATA_REQUEST';
import REFRESH_SESSION_DATA_SUCCESS from '../constants/REFRESH_SESSION_DATA_SUCCESS';
import REFRESH_SESSION_DATA_FAILURE from '../constants/REFRESH_SESSION_DATA_FAILURE';

const initialState = {
    isAuthenticated: false,
    tokensRefreshed: false,
    loading: false,
    errorData: '',
    error: false,
    user: {
        data: ''
    },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DISABLE_SESSION:
            return {
                ...state,
                isAuthenticated: false,
                tokensRefreshed: false,
                user: ''
            }
        case SET_USER_DATA:
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...state.user,
                    data: action.payload
                }
            }
        case REFRESH_SESSION_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REFRESH_SESSION_DATA_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: false,
                errorData: '',
                user: {
                    ...state.user,
                    data: action.payload.data
                }
            }
        case REFRESH_SESSION_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorData: action.payload,
                user: {
                    ...state.user,
                    data: ''
                }
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                tokensRefreshed: false,
                user: {
                    ...state.user,
                    data: ''
                },
            }
        default:
            return state;
    }
}
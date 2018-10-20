//constants
import SIGNIN_USER_REQUEST from '../constants/SIGNIN_USER_REQUEST';
import SIGNIN_USER_SUCCESS from '../constants/SIGNIN_USER_SUCCESS';
import SIGNIN_USER_FAILURE from '../constants/SIGNIN_USER_FAILURE';

import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

const initialState = {
    signin: {
        loading: false,
        error: false,
        errorData: ''
    },
    signup: {
        loading: false,
        error: false,
        errorData: ''
    },
    isAuthenticated: false,
    user: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_USER_REQUEST:
            return {
                ...state,
                signin: {
                    ...state.signin,
                    loading: true
                }
            }
        case SIGNIN_USER_SUCCESS:
            return {
                ...state,
                signin: {
                    ...state.signin,
                    loading: false,
                    errorData: ''
                },
                isAuthenticated: true,
                user: action.payload
            }
        case SIGNIN_USER_FAILURE:
            return {
                ...state,
                signin: {
                    ...state.signin,
                    error: true,
                    loading: false,
                    errorData: action.payload
                },
                isAuthenticated: false,
                user: ''
            }

        case SIGNUP_USER_REQUEST:
            return {
                ...state,
                signup: {
                    ...state.signin,
                    loading: true
                }
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                signup: {
                    ...state.signin,
                    loading: false,
                    errorData: ''
                },
                isAuthenticated: true,
                user: action.payload
            }
        case SIGNUP_USER_FAILURE:
            return {
                ...state,
                signup: {
                    ...state.signin,
                    error: true,
                    loading: false,
                    errorData: action.payload
                },
                isAuthenticated: false,
                user: ''
            }
        default:
            return state;
    }
}
//constants
import SIGNUP_USER_REQUEST from '../constants/SIGNUP_USER_REQUEST';
import SIGNUP_USER_SUCCESS from '../constants/SIGNUP_USER_SUCCESS';
import SIGNUP_USER_FAILURE from '../constants/SIGNUP_USER_FAILURE';

const initialState = {
    loading: false,
    data: '',
    error: false,
    errorData: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
}
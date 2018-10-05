//constants
import OPEN_DRAWER from '../constants/OPEN_DRAWER';
import CLOSE_DRAWER from '../constants/CLOSE_DRAWER';

const initialState = {
    isDrawerOpen: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, isDrawerOpen: action.payload }
        case CLOSE_DRAWER:
            return { ...state, isDrawerOpen: action.payload }
        default:
            return state;
    }
}
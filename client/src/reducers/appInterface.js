//constants
import OPEN_DRAWER from '../constants/OPEN_DRAWER';
import CLOSE_DRAWER from '../constants/CLOSE_DRAWER';
import OPEN_TOP_MENU from '../constants/OPEN_TOP_MENU';
import CLOSE_TOP_MENU from '../constants/CLOSE_TOP_MENU';

const initialState = {
    isDrawerOpen: false,
    isTopMenuOpen: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, isDrawerOpen: action.payload }
        case CLOSE_DRAWER:
            return { ...state, isDrawerOpen: action.payload }
        case OPEN_TOP_MENU:
            return { ...state, isTopMenuOpen: action.payload }
        case CLOSE_TOP_MENU:
            return { ...state, isTopMenuOpen: action.payload }
        default:
            return state;
    }
}
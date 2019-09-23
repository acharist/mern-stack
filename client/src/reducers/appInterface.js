// Constants
import CLOSE_DELETE_POST_DIALOG from '../constants/CLOSE_DELETE_POST_DIALOG';
import OPEN_DELETE_POST_DIALOG from '../constants/OPEN_DELETE_POST_DIALOG';
import CLOSE_ERROR_SNACKBAR from '../constants/CLOSE_ERROR_SNACKBAR';
import OPEN_ERROR_SNACKBAR from '../constants/OPEN_ERROR_SNACKBAR';
import CLOSE_POST_DIALOG from '../constants/CLOSE_POST_DIALOG';
import OPEN_POST_DIALOG from '../constants/OPEN_POST_DIALOG';
import CLOSE_TOP_MENU from '../constants/CLOSE_TOP_MENU';
import OPEN_TOP_MENU from '../constants/OPEN_TOP_MENU';
import CLOSE_DRAWER from '../constants/CLOSE_DRAWER';
import OPEN_DRAWER from '../constants/OPEN_DRAWER';

const initialState = {
    isDeletePostDialogOpen: false,
    isErrorSnackbarOpen: false,
    isPostDialogOpen: false,
    isTopMenuOpen: false,
    isDrawerOpen: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DELETE_POST_DIALOG:
            return { ...state, isDeletePostDialogOpen: action.payload }
        case CLOSE_DELETE_POST_DIALOG:
            return { ...state, isDeletePostDialogOpen: action.payload }
        case OPEN_ERROR_SNACKBAR:
            return { ...state, isErrorSnackbarOpen: action.payload }
        case CLOSE_ERROR_SNACKBAR:
            return { ...state, isErrorSnackbarOpen: action.payload }
        case OPEN_POST_DIALOG:
            return { ...state, isPostDialogOpen: action.payload }
        case CLOSE_POST_DIALOG:
            return { ...state, isPostDialogOpen: action.payload }
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
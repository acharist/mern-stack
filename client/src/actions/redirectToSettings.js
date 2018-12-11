import TO_SETTINGS from '../constants/TO_SETTINGS';
import closeTopMenu from './closeTopMenu';
import { push } from 'connected-react-router';

export default (userId) => {
    return (dispatch) => {    
        dispatch(closeTopMenu());
        dispatch({ type: TO_SETTINGS });
        dispatch(push(`/user/${userId}/settings`));
    }
}
import LOGOUT from '../constants/LOGOUT';
import closeTopMenu from './closeTopMenu';
import { push } from 'connected-react-router';

export default () => {
    return (dispatch) => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('state');
    
        dispatch(closeTopMenu());
        dispatch({ type: LOGOUT });
        dispatch(push('/signin'));
    }
}
import SET_USER_DATA from '../constants/SET_USER_DATA';
import getItem from '../utils/getItem';

export default (data) => {
    return (dispatch) => {
        const cachedData = {
            avatarUrl: getItem('avatarUrl'),
            articles: getItem('articles'),
            _id: getItem('_id'),
            name: getItem('name'),
            email: getItem('email')
        }

        dispatch({
            type: SET_USER_DATA,
            payload: data || cachedData
        });
    }
}
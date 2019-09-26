import SET_USER_DATA from '../constants/SET_USER_DATA';
import getLocal from '../utils/getLocal';

export default (data) => {
    return (dispatch) => {
        const cachedData = {
            avatarUrl: getLocal('avatarUrl'),
            articles: getLocal('articles'),
            _id: getLocal('_id'),
            name: getLocal('name'),
            email: getLocal('email')
        }
        dispatch({
            type: SET_USER_DATA,
            payload: data || cachedData
        });
    }
}
import SET_POST_ID from '../constants/SET_POST_ID';

export default (id) => {
    return {
        type: SET_POST_ID,
        payload: id
    }
}
import GET_USER_ID from '../constants/GET_USER_ID';

export default (id) => {
    return {
        type: GET_USER_ID,
        payload: id
    }
}
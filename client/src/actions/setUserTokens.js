import SET_USER_TOKENS from '../constants/SET_USER_TOKENS';

export default (tokens) => {
    return {
        type: SET_USER_TOKENS,
        payload: tokens
    }
}
import ENABLE_SESION from '../constants/ENABLE_SESSION';

export default (tokens) => {
    return {
        type: ENABLE_SESION,
        payload: tokens
    }
}
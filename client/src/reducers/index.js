import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

//Reducers
import refreshTokens from './refreshTokens';
import appInterface from './appInterface';
import signup from './signup';
import signin from './signin';
import session from './session';
import createPost from './createPost';
import deletePost from './deletePost';
import avatar from './avatar';
import userData from './userData';
import homePage from './homePage';
import user from './user';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  appInterface,
    auth: combineReducers({
        signin,
        signup,
        session,
        refreshTokens
    }),
    pages: combineReducers({
        homePage,
        userPage: combineReducers({
            user,
            post: combineReducers({
                create: createPost,
                delete: deletePost 
            })
        }),
        settingsPage: combineReducers({
            avatar,
            data: userData
        })
    })
});

export default createRootReducer;
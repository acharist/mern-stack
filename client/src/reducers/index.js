import { combineReducers } from 'redux';

//Reducers
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

export default combineReducers({
    appInterface,
    auth: combineReducers({
        signin,
        signup,
        session
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
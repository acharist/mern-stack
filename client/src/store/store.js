import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk'

import rootReducer from '../reducers/index';
const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(rootReducer), //Connect roote reducer and history
    composeWithDevTools(
        applyMiddleware( //Compose several middlewares
            thunk,
            routerMiddleware(history)
        ),
    ),
);

export {
    store,
    history
};
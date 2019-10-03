import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history'
import createRootReducer from '../reducers/index';

import thunk from 'redux-thunk';
const history = createBrowserHistory()

const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware( // Compose several middlewares
            thunk,
            routerMiddleware(history)
        ),
    ),
);

export {
    store,
    history
};
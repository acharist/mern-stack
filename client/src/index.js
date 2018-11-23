import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

//Store
import { store, history } from './store/store';

//Pages
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Home from './containers/Home';
import User from './containers/User';

//Matherial theme config
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

//Current user id ↓↓↓
const userId = store.getState().pages.homePage.userId;
console.log(userId)

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
                <div>
                    <Switch>           
                        <Route exact path="/" render={() => ( <Home/> )}/>
                        <Route path="/signup" render={() => ( <Signup/> )}/>
                        <Route path="/signin" render={() => ( <Signin/> )}/>
                        <Route path="/:id" render={({ match }) => ( <User match={match}/> )}/>
                    </Switch>
                </div>
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));
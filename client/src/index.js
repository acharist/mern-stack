import React from 'react';
import ReactDOM from 'react-dom';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

// Styles
import './assets/css/index.css';

// Store
import { store, history } from './store/store';

// Pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import User from './pages/User';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Matherial theme config
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import ProtectRoute from './hoc/ProtectRoute';

// Decorated routes
const ProtectedHome = ProtectRoute(Home);
const ProtectedUser = ProtectRoute(User);
const ProtectedSettings = ProtectRoute(Settings);

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
                <div>
                    <Switch>           
                        <Route exact path="/" render={() => ( <ProtectedHome/> )}/>
                        <Route path="/signup" render={() => ( <Signup/> )}/>
                        <Route path="/signin" render={() => ( <Signin/> )}/>
                        <Route path="/user/:id/settings" render={({ match }) => ( <ProtectedSettings match={match}/> )}/>
                        <Route path="/user/:id" render={({ match }) => ( <ProtectedUser match={match}/> )}/>
                        <Route render={() => ( <NotFound/> )}/>
                    </Switch>
                </div>
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));
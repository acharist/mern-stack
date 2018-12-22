import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

//Store
import { store, history } from './store/store';

//Pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import User from './pages/User';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

//Matherial theme config
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import ProtectedRoute from './HOC/ProtectedRoute';

//Decorated routes
const ProtectedHome = ProtectedRoute(Home);
const ProtectedUser = ProtectedRoute(User);
const ProtectedSettings = ProtectedRoute(Settings);

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
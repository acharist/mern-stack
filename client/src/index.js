import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

//Store
import { store, history } from './store/store';

//Pages
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';

//Matherial theme config
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

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
                        <Route exact path="/" render={() => ( <Home/> )}/>
                        <Route path="/signup" render={() => ( <Signup/> )}/>
                        {/* <Route path="/signin" render={() => ( <Signin/> )}/> */}
                    </Switch>
                </div>
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));
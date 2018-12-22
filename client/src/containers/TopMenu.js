import { connect } from 'react-redux';

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import getLocalState from '../utils/getLocalState';

//Icons
import People from '@material-ui/icons/People';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

//Styles
import { styles } from '../assets/jss/styles';

//Actions
import logOut from '../actions/logOut';
import redirectToSettings from '../actions/redirectToSettings';
import { push } from 'connected-react-router';

class TopMenu extends Component {
    state = {
        localState: getLocalState()
    }

    render() {
        const { classes, children, userName, userEmail, logOut, redirectToSettings } = this.props;
        const localState = getLocalState();

        return (
            <div>
                <Paper className={classes.topMenu}>
                    <Paper className={classNames(classes.topMenuHead, classes.flex, classes.alignItemsCenter)}>
                        {/* Avatar component ↓↓↓ */}
                                          {children}
                        {/* Avatar component ↑↑↑ */}
                        <div className={classes.userInfo}>
                            <Typography variant="h6" className={classes.userName}>
                                {userName}
                            </Typography>
                            <Typography className={classes.userEmail}>
                                {userEmail}
                            </Typography>
                        </div>
                    </Paper>
                    <MenuList>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <People />
                            </ListItemIcon>
                            <ListItemText inset primary="Друзья" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText inset primary="Настройки" onClick={() => redirectToSettings(localState.auth.session.user.data._id)} />
                        </MenuItem>
                        <MenuItem className={classes.menuItem} onClick={logOut}>
                            <ListItemIcon className={classes.icon}>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText inset primary="Выйти" />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    appInterface: state.appInterface,
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    redirectToSettings: (id) => {
        if(id.length) {
            dispatch(redirectToSettings(id));
        } else {
            dispatch(push('/signin'));
        }
    },
    redirectToSignin: () => {
        dispatch(push('/signin'));
    },
    logOut: () => {
        dispatch(logOut());
    }
});

TopMenu = withStyles(styles)(TopMenu);
export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
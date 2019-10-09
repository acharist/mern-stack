import React, { Component } from 'react';
import classNames from 'classnames';

//Styles
import { styles } from '../assets/jss/styles';

// Utils
import getLocal from '../utils/getLocal';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Actions
import logOut from '../actions/logOut';
import redirectToSettings from '../actions/redirectToSettings';
import closeTopMenu from '../actions/closeTopMenu';

// Components
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

//Icons
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

class TopMenu extends Component {
    render() {
        const { classes, children, userName, userEmail, logOut, redirectToSettings } = this.props;
        const id = getLocal('id');
        return (
            <div>
                <Paper className={classes.topMenu}>
                    <Paper className={classNames(classes.topMenuHead, classes.flex, classes.alignItemsCenter)}>
                        {children}
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
                                <Settings />
                            </ListItemIcon>
                            <ListItemText inset primary="Настройки" onClick={() => redirectToSettings(id)} />
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
    appInterface: state.appInterface
});

const mapDispatchToProps = (dispatch) => ({
    redirectToSettings: (id) => {
        dispatch(closeTopMenu());
        dispatch(redirectToSettings(id));
    },
    logOut: () => {
        dispatch(closeTopMenu());
        dispatch(logOut());
    }
});

TopMenu = withStyles(styles)(TopMenu);
export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
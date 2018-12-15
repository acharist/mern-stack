import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { push } from 'connected-react-router';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

import TopMenu from './TopMenu'

//Actions
import openTopMenu from '../actions/openTopMenu';
import closeTopMenu from '../actions/closeTopMenu';

import { connect } from 'react-redux';
import { styles } from '../assets/jss/styles';

class ButtonAppBar extends Component {
    state = {
        anchorEl: null
    }

    render() {
        const { classes, openDrawer, 
            openTopMenu, closeTopMenu, title, 
            redirectToSignin, redirectToSignup, auth,
             appInterface } = this.props;

        const authButtons = (
            <div>
                <Button color="inherit" onClick={redirectToSignin}>Вход</Button>
                <Button color="inherit" onClick={redirectToSignup}>Регистрация</Button>
            </div>
        );

        const menu = (
            <div>
                <IconButton onClick={openTopMenu}
                  color="inherit" aria-haspopup="true"
                  aria-owns={appInterface.isTopMenuOpen ? 'menu-appbar' : undefined}
                  color="inherit"
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}>

                <Avatar className={classes.avatar} alt="Remy Sharp" src={auth.session.user.data.avatarUrl } />

                </IconButton>
                <Popper className={classes.popper} open={appInterface.isTopMenuOpen} anchorEl={this.anchorEl} placement="bottom">
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps}>
                            <ClickAwayListener onClickAway={closeTopMenu}>
                                <TopMenu userName={auth.session.user.data.name} userEmail={auth && auth.session.user.data.email}>
                                    <Avatar alt="Remy Sharp" src={auth && auth.session.user.data.avatarUrl} />
                                </TopMenu>
                            </ClickAwayListener>
                        </Fade>
                    )}
                </Popper>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={openDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            {title}
                        </Typography>
                        {auth && auth.session.isAuthenticated ? menu : authButtons}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    appInterface: state.appInterface,
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    openTopMenu: () => {
        dispatch(openTopMenu());
    },
    closeTopMenu: () => {
        dispatch(closeTopMenu());
    },
    redirectToSignin: () => {
        dispatch(push('/signin'));
    },
    redirectToSignup: () => {
        dispatch(push('/signup'));
    }
});

ButtonAppBar = withStyles(styles)(ButtonAppBar);
export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
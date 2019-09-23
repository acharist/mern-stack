import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import { styles } from '../assets/jss/styles';

// Utils
import getLocalState from '../utils/getLocalState';

// Actions
import { push } from 'connected-react-router';
import openTopMenu from '../actions/openTopMenu';
import closeTopMenu from '../actions/closeTopMenu';
import request from '../actions/request';

// Constants
import GET_USER_REQUEST from '../constants/GET_USER_REQUEST';
import GET_USER_SUCCESS from '../constants/GET_USER_SUCCESS';
import GET_USER_FAILURE from '../constants/GET_USER_FAILURE';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Containers
import TopMenu from './TopMenu';

// Components
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Popper from '@material-ui/core/Popper';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

class ButtonAppBar extends Component {
    constructor(props) {
        super(props);
        this.localState = getLocalState();
        this.state = {
            anchorEl: null
        }
		this.changeLocation = this.changeLocation.bind(this);
    }

    changeLocation() {
        this.props.closeTopMenu();
        this.props.changeLocation(this.localState.auth.session.user.data._id);
        this.props.request(`/api/user/${this.localState.auth.session.user.data._id}`, 'get')(GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE);
    }

    render() {
        const { classes, openDrawer, auth,
            openTopMenu, closeTopMenu, title, 
            redirectToSignin, redirectToSignup,
             appInterface } = this.props;

        const localState = getLocalState();
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
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}>
                <Avatar className={classes.avatar} alt="User" src={localState && auth.session.user.data.avatarUrl} />
                </IconButton>
                <Popper className={classes.popper} open={appInterface.isTopMenuOpen} anchorEl={this.anchorEl} placement="bottom">
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps}>
                            <ClickAwayListener onClickAway={closeTopMenu}>
                                <TopMenu userName={localState && auth.session.user.data.name} userEmail={localState && auth.session.user.data.email}>
                                    <Avatar className={classes.cursorPointer} alt="User" src={localState && auth.session.user.data.avatarUrl} onClick={this.changeLocation}/>
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
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {title}
                        </Typography>
                        {localState && localState.auth.session.isAuthenticated ? menu : authButtons}
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
    request: (url, method) => {
		return (REQEST, SUCCESS, FAILURE) => {
			dispatch(request(url, method)(REQEST, SUCCESS, FAILURE))
		}
	},
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
    },
    changeLocation: (id) => {
        dispatch(push(`/user/${id}`));
    }
});

ButtonAppBar = withStyles(styles)(ButtonAppBar);
export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
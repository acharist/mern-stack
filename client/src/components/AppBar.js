import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Avatar from '@material-ui/core/Avatar'
import { push } from 'connected-react-router';

import { connect } from 'react-redux';

import { styles } from '../assets/jss/appBar';

class ButtonAppBar extends Component {
    render() {
        const { classes, openDrawer, title, redirectToSignin, redirectToSignup } = this.props;
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
                        {/* <Button color="inherit">
                            <Avatar alt="Remy Sharp" src="" className={classes.avatar} />
                        </Button> */}
                        <Button color="inherit" onClick={redirectToSignin}>Вход</Button>
                        <Button color="inherit" onClick={redirectToSignup}>Регистрация</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    redirectToSignin: () => {
        dispatch(push('/signin'));
    },
    redirectToSignup: () => {
        dispatch(push('/signup'));
    }
});

ButtonAppBar = withStyles(styles)(ButtonAppBar);
export default connect(null, mapDispatchToProps)(ButtonAppBar);
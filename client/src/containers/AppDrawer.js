import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import { styles } from '../assets/jss/styles';

// Actions
import { push } from 'connected-react-router';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

// Icons
import Home from '@material-ui/icons/Home';

class AppDrawer extends Component {
    render() {
        const { classes, closeDrawer, isDrawerOpen, redirectToHome } = this.props;
        const sideList = (
            <div className={classes.list}>
                <List component="nav">
                    <ListItem button onClick={redirectToHome}>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Главная" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                    <div tabIndex={0} role="button">
                        {sideList}
                    </div>
                </Drawer>
            </div>
        ); 
    }
}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    redirectToHome: () => {
        dispatch(push('/'));
    }
});

AppDrawer = withStyles(styles)(AppDrawer);
export default connect(null, mapDispatchToProps)(AppDrawer);
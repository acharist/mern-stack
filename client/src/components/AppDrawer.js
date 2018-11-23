import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { styles } from '../assets/jss/styles';
import { push } from 'connected-react-router';

class AppDrawer extends Component {
    constructor(props) {
        super(props);
    }
    
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
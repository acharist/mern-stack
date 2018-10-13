import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/ChatBubble';
import PeopleIcon from '@material-ui/icons/People';

import { styles } from '../assets/jss/appDrawer';

const TemporaryDrawer = ({ classes, closeDrawer, isDrawerOpen }) => {
    const sideList = (
        <div className={classes.list}>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Чат" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Друзья" />
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

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
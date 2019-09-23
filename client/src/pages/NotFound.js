import React, { Component } from 'react';

// Styles
import { styles } from '../assets/jss/styles';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';

// Containers
import AppBar from '../containers/AppBar';
import AppDrawer from '../containers/AppDrawer';

class NotFound extends Component {
    render() {
        const { appInterface, openDrawer, closeDrawer } = this.props;
        return (
            <div>
                <AppBar title="404" openDrawer={openDrawer}/>
                <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
	appInterface: state.appInterface,
	pages: state.pages,
});

const mapDispatchToProps = (dispatch) => ({
	openDrawer: () => {
		dispatch(openDrawer());
	},
	closeDrawer: () => {
		dispatch(closeDrawer());
	},
});

NotFound = withStyles(styles)(NotFound);
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

//Constants
import GET_USER_REQUEST from '../constants/GET_USER_REQUEST';
import GET_USER_SUCCESS from '../constants/GET_USER_SUCCESS';
import GET_USER_FAILURE from '../constants/GET_USER_FAILURE';

//Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import apiRequest from '../actions/apiRequest';

//Styles
import { styles } from '../assets/jss/styles';

class Settings extends Component {
    componentWillMount() {
        const pathname = this.props; //Get curl path
        const id = pathname.match.params.id; //Segmented url    
        this.props.apiRequest(`/api/user/${id}`, 'get')(GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE);
        //Get user with typed url
        //if user exists, render component. Otherwise, redirect to 404
    }

    render() {
        const { classes, appInterface, openDrawer, closeDrawer, pages } = this.props;
        return (
            <div>
                <AppBar title="Настройки" openDrawer={openDrawer}/>
                <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
	appInterface: state.appInterface,
	pages: state.pages,
});

const mapDispatchToProps = (dispatch) => ({
    apiRequest: (url, method, params) => {
		return (REQEST, SUCCESS, FAILURE) => {
			dispatch(apiRequest(url, method, params)(REQEST, SUCCESS, FAILURE));
		}
    },
	openDrawer: () => {
		dispatch(openDrawer());
	},
	closeDrawer: () => {
		dispatch(closeDrawer());
	},
});

Settings = withStyles(styles)(Settings);
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
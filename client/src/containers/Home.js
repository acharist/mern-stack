import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

//Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import enableSession from '../actions/enableSession';
import disableSession from '../actions/disableSession';

import { push } from 'connected-react-router';

import apiRequest from '../actions/apiRequest';
import refreshTokens from '../actions/refreshTokens';
import GET_USERS_REQUEST from '../constants/GET_USERS_REQUEST';
import GET_USERS_SUCCESS from '../constants/GET_USERS_SUCCESS';
import GET_USERS_FAILURE from '../constants/GET_USERS_FAILURE';

class Home extends Component {
	constructor(props) {
		super(props);	
	}

	componentWillMount() {
		this.props.apiRequest('/api/user/users', 'get')(GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE);
	}

	render() {
		const { appInterface, openDrawer, closeDrawer } = this.props;
		return (
			<div className="Home">
				<AppBar title="Webripple" openDrawer={openDrawer}/>
				<AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	appInterface: state.appInterface,
	auth: state.auth,
	tokensRefreshed: props.tokensRefreshed
});

const mapDispatchToProps = (dispatch) => ({
	openDrawer: () => {
		dispatch(openDrawer());
	},
	closeDrawer: () => {
		dispatch(closeDrawer());
	},
	apiRequest: (url, method) => {
		return (REQEST, SUCCESS, FAILURE) => {
			dispatch(apiRequest(url, method)(REQEST, SUCCESS, FAILURE));
		}
	},
	enableSession: (tokens) => {
		dispatch(enableSession(tokens));
	},
	disableSession: () => {
		dispatch(disableSession());
	},
	refreshTokens: (refreshToken, url) => {
		dispatch(refreshTokens(refreshToken, url));
	},

	redirectToSignin: () => {
		dispatch(push('/signin'));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
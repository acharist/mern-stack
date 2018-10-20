import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

//Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';

import { push } from 'connected-react-router';

//Utils
// import sendTokens from '../utils/sendTokens';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	// componentWillMount() {
	// 	try {
	// 		sendTokens();
	// 	} catch(err) {
	// 		console.log(err.message)
	// 		this.props.redirectToSignin();
	// 	}
	// }

	render() {
		const { page, openDrawer, closeDrawer } = this.props;
		return (
			<div className="Home">
				<AppBar title="Webripple" openDrawer={openDrawer}/>
				<AppDrawer isDrawerOpen={page.isDrawerOpen} closeDrawer={closeDrawer}/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	page: state.page
});

const mapDispatchToProps = (dispatch) => ({
	openDrawer: () => {
		dispatch(openDrawer());
	},
	closeDrawer: () => {
		dispatch(closeDrawer());
	},
	redirectToSignin: () => {
		dispatch(push('/signin'))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

//Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';

class Home extends Component {
	constructor(props) {
		super(props);
	}

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
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, { Component } from 'react';
import { connect } from 'react-redux';

//components
import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

//actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';

class Home extends Component {
	constructor(props) {
		super(props);
		
		this.openDrawer = this.openDrawer.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);
	}

	openDrawer() {
		this.props.openDrawer();
	}
	
	closeDrawer() {
		this.props.closeDrawer();
	}

	render() {
		return (
			<div className="Home">
				<AppBar openDrawer={this.openDrawer}/>
				<AppDrawer isDrawerOpen={this.props.page.isDrawerOpen} closeDrawer={this.closeDrawer}/>
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
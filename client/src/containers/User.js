import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import apiRequest from '../actions/apiRequest';

//Constants
import GET_USER_REQUEST from '../constants/GET_USER_REQUEST';
import GET_USER_SUCCESS from '../constants/GET_USER_SUCCESS';
import GET_USER_FAILURE from '../constants/GET_USER_FAILURE';

//Styles
import { styles } from '../assets/jss/styles';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const pathname = this.props;
        const id = pathname.match.params.id;
        this.props.apiRequest(`/api/user/${id}`, 'get')(GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE);
        //Get user with typed url
        //if user exists, render component. Otherwise, redirect to 404
    }

    render() {
        return (
            <div>
                User page
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    userPage: state.userPage
});

const mapDispatchToProps = (dispatch) => ({
    apiRequest: (url, method) => {
		return (REQEST, SUCCESS, FAILURE) => {
			dispatch(apiRequest(url, method)(REQEST, SUCCESS, FAILURE));
		}
	},
});

User = withStyles(styles)(User);
export default connect(mapStateToProps, mapDispatchToProps)(User);
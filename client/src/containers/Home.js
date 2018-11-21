import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

//Icons
import PersonAdd from '@material-ui/icons/PersonAdd';
import Message from '@material-ui/icons/Message';

//Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import setUserTokens from '../actions/setUserTokens';
import disableSession from '../actions/disableSession';

import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { styles } from '../assets/jss/styles';

import classNames from 'classnames';

import apiRequest from '../actions/apiRequest';
import refreshTokens from '../actions/refreshTokens';
import GET_USERS_REQUEST from '../constants/GET_USERS_REQUEST';
import GET_USERS_SUCCESS from '../constants/GET_USERS_SUCCESS';
import GET_USERS_FAILURE from '../constants/GET_USERS_FAILURE';

class Home extends Component {
	constructor(props) {
		super(props);	
		this.showUsers = this.showUsers.bind(this);
	}

	componentWillMount() {
		this.props.apiRequest('/api/user/users', 'get')(GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE);
	}

	showUsers(users, classes) {
		const arrOfUsers = [];
		users.forEach((user, index) => {
			arrOfUsers.push(
				
				<Card className={classNames(classes.card, classes.sMargin, classes.flex)} key={index}>
					<CardActionArea className={classNames(classes.w50, classes.h100)}>
						<CardMedia
						className={classNames(classes.w100, classes.h100)}
						image={user.avatarUrl}
						title="Contemplative Reptile"
						/>
					</CardActionArea>
					<div className={classNames(classes.flex, classes.w50, classes.flexColumn)}>
						<CardContent className={classes.cardContent}>
							<Typography gutterBottom variant="title" component="h3">
								{user.name}
							</Typography>
							<Typography component="p">
								{user.city || 'Город не указан'}
							</Typography>
						</CardContent>
						<CardActions className={classNames(classes.flex, classes.alignItemsStart, classes.flexColumn)}>
							<Button className={classNames(classes.w100, classes.flex, classes.justifyContentStart, classes.sFont)} size="small" color="primary">
								<Message className={classes.xsMargin}/>
								Написать сообщение
							</Button>
							<Button className={classNames(classes.w100, classes.flex, classes.justifyContentStart, classes.sFont)} size="small" color="primary">
								<PersonAdd className={classes.xsMargin}/>
								Добавить в друзья
							</Button>
						</CardActions>
					</div>
			</Card>)
		});

		return arrOfUsers
	}

	render() {
		const { classes, appInterface, openDrawer, closeDrawer, pages } = this.props;
		return (
			<div className="Home">
				<AppBar title="Webripple" openDrawer={openDrawer}/>
				<AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

				{pages.homePage.loading && <div className={classes.loader}>
                    <CircularProgress/>
                </div>}

				<div className={classNames(classes.cardsArea, classes.flex, classes.flexWrap)}>
					{!!pages.homePage.data.length && this.showUsers(pages.homePage.data.users, classes)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	appInterface: state.appInterface,
	pages: state.pages,
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
	setUserTokens: (tokens) => {
		dispatch(setUserTokens(tokens));
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

Home = withStyles(styles)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
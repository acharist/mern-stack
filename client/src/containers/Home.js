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
import getUserId from '../actions/getUserId';

import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { styles } from '../assets/jss/styles';

import classNames from 'classnames';

import apiRequest from '../actions/apiRequest';
import GET_USERS_REQUEST from '../constants/GET_USERS_REQUEST';
import GET_USERS_SUCCESS from '../constants/GET_USERS_SUCCESS';
import GET_USERS_FAILURE from '../constants/GET_USERS_FAILURE';

class Home extends Component {
	constructor(props) {
		super(props);	
		this.showUsers = this.showUsers.bind(this);
		this.changeLocation = this.changeLocation.bind(this);
	}

	componentDidMount() {
		this.props.apiRequest('/api/user/users', 'get')(GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE);
	}

	changeLocation(event) {
		let counter = 0
		while(true) {
			if(event.target.hasAttribute('data-key')) {
				this.props.changeLocation(event.target.getAttribute("data-key"));
				break;
			} else {
				if(counter > 5) {
					break
				} else {
					counter++;
				}
				event.target = event.target.parentNode;
			}
		}
	}

	showUsers(users, classes) {
		const arrOfUsers = [];
		users.forEach((user, index) => {
			arrOfUsers.push(
				
				<Card className={classNames(classes.card, classes.sMargin, classes.flex)} key={user._id}>
					<CardActionArea data-key={user._id} onClick={this.changeLocation}
						className={classNames(classes.w50, classes.mh100)}>
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
				<AppBar title="Главная" openDrawer={openDrawer}/>
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
	getUserId: (id) => {
		console.log(id)
		dispatch(getUserId(id));
	},
	changeLocation: (id) => {
		dispatch(push(`/${id}`));
	}
});

Home = withStyles(styles)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
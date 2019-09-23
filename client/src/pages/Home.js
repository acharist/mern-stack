import React, { Component } from 'react';
import classNames from 'classnames';

//Styles
import { styles } from '../assets/jss/styles';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

//Containers
import AppBar from '../containers/AppBar';
import AppDrawer from '../containers/AppDrawer';

//Components
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

//Icons
import SubdirectoryArrowRight from '@material-ui/icons/SubdirectoryArrowRight';

//Actions
import { push } from 'connected-react-router';
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import getUserId from '../actions/getUserId';
import request from '../actions/request';

//Constants
import GET_USERS_REQUEST from '../constants/GET_USERS_REQUEST';
import GET_USERS_SUCCESS from '../constants/GET_USERS_SUCCESS';
import GET_USERS_FAILURE from '../constants/GET_USERS_FAILURE';

class Home extends Component {
	constructor(props) {
		super(props);	
		this.showUsers = this.showUsers.bind(this);
		this.changeLocation = this.changeLocation.bind(this);
	}

	async componentWillMount() {
		await this.props.request('/api/user/users', 'get')(GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE);
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
		const arrayOfUsers = [];
		users.forEach((user) => {
			arrayOfUsers.push(
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
							<Typography gutterBottom variant="h6">
								{user.name}
							</Typography>
							<Typography variant="body1" style={{ marginBottom: 5 }}>
								{user.age ? `${user.age} лет` : 'Возраст не указан'}
							</Typography>
							<Typography variant="body1">
								{user.city || 'Город не указан'}
							</Typography>
						</CardContent>
						<CardActions className={classNames(classes.flex, classes.alignItemsStart, classes.flexColumn)}>
							<Button className={classNames(classes.w100, classes.flex, classes.justifyContentStart, classes.sFont)} size="small" color="primary" data-key={user._id} onClick={this.changeLocation}>
								<SubdirectoryArrowRight className={classes.xsMargin}/>
								Посмотреть профиль
							</Button>
						</CardActions>
					</div>
			</Card>)
		});

		return arrayOfUsers
	}

	render() {
		const { classes, appInterface, openDrawer, closeDrawer, pages } = this.props;
		return (
			<div className="Home">
				{pages.homePage.loading && <div className={classes.loader}>
                    <CircularProgress/>
                </div>}
				
				<AppBar title="Главная" openDrawer={openDrawer}/>
				<AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

				<div className={classNames(classes.cardsArea, classes.flex, classes.flexWrap)}>
					{pages.homePage.data && this.showUsers(pages.homePage.data.users, classes)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	appInterface: state.appInterface,
	pages: state.pages
});

const mapDispatchToProps = (dispatch) => ({
	request: (url, method, params, headers, callback) => {
        return (REQEST, SUCCESS, FAILURE) => {
            return dispatch(request(url, method, params, headers, callback)(REQEST, SUCCESS, FAILURE));
        }
    },
	openDrawer: () => {
		dispatch(openDrawer());
	},
	closeDrawer: () => {
		dispatch(closeDrawer());
	},
	getUserId: (id) => {
		dispatch(getUserId(id));
	},
	changeLocation: (id) => {
		dispatch(push(`/user/${id}`));
	}
});

Home = withStyles(styles)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
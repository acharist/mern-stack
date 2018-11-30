import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

//Constants
import GET_USER_REQUEST from '../constants/GET_USER_REQUEST';
import GET_USER_SUCCESS from '../constants/GET_USER_SUCCESS';
import GET_USER_FAILURE from '../constants/GET_USER_FAILURE';

//Actions
import { push } from 'connected-react-router';
import apiRequest from '../actions/apiRequest';
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import openPostDialog from '../actions/openPostDialog';
import closePostDialog from '../actions/closePostDialog';

//Styles
import { styles } from '../assets/jss/styles';

import classNames from 'classnames';

class User extends Component {
    constructor(props) {
        super(props);
        this.async = this.async.bind(this);
        this.createPosts = this.createPosts.bind(this);
        this.postDialog = this.postDialog.bind(this);
    }

    componentWillMount() {
        const pathname = this.props;
        const id = pathname.match.params.id;
        this.props.apiRequest(`/api/user/${id}`, 'get')(GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE);
        //Get user with typed url
        //if user exists, render component. Otherwise, redirect to 404
    }

    postDialog() {
        const { closePostDialog, appInterface } = this.props;
        return (
            <Dialog
            open={appInterface.isPostDialogOpen}
            onClose={closePostDialog}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Создание</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Колличество символов не должно привышать 120.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Заголовок"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Содержание"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePostDialog} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={closePostDialog} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    createPosts(user, classes) {
        const posts = [];
        user.articles.forEach((post) => {
            posts.push(
                <Card className={classNames(classes.w100, classes.flex, classes.post)} key={post._id}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="title" component="h3">
                            {post.title}
                        </Typography>
                        <Typography component="p">
                            {post.content}
                        </Typography>
                    </CardContent>
                </Card>
            );
        })

        return posts
    }

    async(user, classes) {
        const { openPostDialog, closePostDialog, appInterface } = this.props;
        return (
            <div>
                <div style={{ padding: 12, marginTop: 20 }}>
                    <Grid container spacing={24} justify="center">
                        <Grid item xl={2} lg={3} md={3} sm={5} xs={12}>
                            <Card>
                                <CardMedia
                                    style={{ width: '100%', minWidth: '100%',  height: '300px' }}
                                    image={user.avatarUrl}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <div className={classNames(classes.flex, classes.alignItemsCenter)}>
                                        <Typography gutterBottom variant="title" className={classes.userName} component="h2">
                                            {`${user.name},`}
                                        </Typography>
                                        <Typography component="p" className={classes.userAge}>
                                            {user.age || 'Возраст не указан'}
                                        </Typography>
                                    </div>
                                    <Typography component="p" className={classes.userCity}>
                                        {user.city || 'Город не указан'}
                                    </Typography>
                                </CardContent>
                                <Divider light />
                                <CardContent>
                                    User friends is here
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={8} lg={7} md={7} sm={5} xs={12} className={classNames(classes.alignItemsCenter, classes.flex, classes.flexColumn)}>
                            {this.createPosts(user, classes)}
                            {/* Add article button */}
                            <Button onClick={openPostDialog} variant="contained" color="primary" className={classes.button}>
                                Новый пост +
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    render() {
        const { classes, appInterface, openDrawer, closeDrawer, pages } = this.props;
        return (
            <div>
                {pages.userPage.loading && <div className={classes.loader}>
                    <CircularProgress/>
                </div>}

                <AppBar title={pages.userPage.data && pages.userPage.data.user.name} openDrawer={openDrawer}/>
				<AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>
                {this.postDialog()}
                {pages.userPage.data && this.async(pages.userPage.data.user, classes)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    appInterface: state.appInterface,
    pages: state.pages
});

const mapDispatchToProps = (dispatch) => ({
    apiRequest: (url, method) => {
		return (REQEST, SUCCESS, FAILURE) => {
			dispatch(apiRequest(url, method)(REQEST, SUCCESS, FAILURE));
		}
    },
    openDrawer: () => {
		dispatch(openDrawer());
	},
	closeDrawer: () => {
		dispatch(closeDrawer());
    },
    openPostDialog: () => {
        dispatch(openPostDialog());
    },
    closePostDialog: () => {
        dispatch(closePostDialog());
    }
});

User = withStyles(styles)(User);
export default connect(mapStateToProps, mapDispatchToProps)(User);
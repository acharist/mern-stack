import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

//Constants
import UPDATE_AVATAR_REQUEST from '../constants/UPDATE_AVATAR_REQUEST';
import UPDATE_AVATAR_SUCCESS from '../constants/UPDATE_AVATAR_SUCCESS';
import UPDATE_AVATAR_FAILURE from '../constants/UPDATE_AVATAR_FAILURE';
import REFRESH_SESSION_DATA_REQUEST from '../constants/REFRESH_SESSION_DATA_REQUEST';
import REFRESH_SESSION_DATA_SUCCESS from '../constants/REFRESH_SESSION_DATA_SUCCESS';
import REFRESH_SESSION_DATA_FAILURE from '../constants/REFRESH_SESSION_DATA_FAILURE';

//Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import apiRequest from '../actions/apiRequest';

//Icons
import CloudUpload from '@material-ui/icons/CloudUpload';

//Styles
import { styles } from '../assets/jss/styles';

import classNames from 'classnames';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.auth.session.user.data.name, 
            email: this.props.auth.session.user.data.email,
            password: '',
            age: this.props.auth.session.user.data.age,
            city: this.props.auth.session.user.data.city
        }

        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.sendAvatar = this.sendAvatar.bind(this);

        this.avatarInput = React.createRef();
    }

    handleInfoChange(event) {
        return (type) => {
            this.setState({[type]: event.target.value});
        }
    }

    sendAvatar() {
        const id = this.props.auth.session.user.data._id;
        const headers = { 'Content-Type': 'multipart/form-data' }
        const formData = new FormData();
        formData.append('avatar', this.avatarInput.current.files[0]);
        this.props.apiRequest(`/api/user/${id}/settings/avatar`, 'post', formData, { headers },
            this.props.apiRequest(`/api/user/${id}`, 'get', null, null, 
                () => { window.location.reload() }
            )(REFRESH_SESSION_DATA_REQUEST, REFRESH_SESSION_DATA_SUCCESS, REFRESH_SESSION_DATA_FAILURE)
        )(UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAILURE);
    }

    render() {
        const { classes, appInterface, openDrawer, closeDrawer, auth } = this.props;

        return (
            <div>
                <AppBar title="Настройки" openDrawer={openDrawer}/>
                <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

                <div style={{ padding: 12, marginTop: 20 }}>
                    <Grid container spacing={24} justify="center">
                        <Grid item xs={10}>
                            <Paper className={classes.innerPadding}>
                                <Typography variant="subtitle1" component="h2" className={classes.settingsTitle}>
                                    Изображение профиля
                                </Typography>
                                <form>
                                    <input
                                        accept="image/*"
                                        className={classes.none}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        name="avatar"
                                        ref={this.avatarInput}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button style={{ marginBottom: 40 }} variant="contained" component="span" className={classNames(classes.w100)}>
                                            <CloudUpload style={{ color: '#9E9E9E' }}/>
                                        </Button>
                                    </label>
                                    <div className={classNames(classes.flex, classes.justifyContentEnd)}>
                                        <Button onClick={this.sendAvatar} variant="contained" color="primary" style={{ marginRight: 5 }}>Отправить</Button>
                                        <Button variant="contained" color="primary">Отменить</Button>
                                    </div>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={10}>
                            <Paper className={classes.innerPadding}>
                                <Typography variant="subtitle1" component="h2" className={classes.settingsTitle}>
                                    Персональная информация
                                </Typography>
                                <form style={{ marginBottom: 40 }}>
                                    <TextField
                                        id="standard-name"
                                        label="Имя"
                                        className={classNames(classes.personalInfoTextField, classes.w100)}
                                        value={this.state.name}
                                        onChange={(event) => { this.handleInfoChange(event)('name') }}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="standard-name"
                                        label="E-mail"
                                        className={classNames(classes.personalInfoTextField, classes.w100)}
                                        value={this.state.email}
                                        onChange={(event) => { this.handleInfoChange(event)('email') }}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="standard-name"
                                        label="Пароль"
                                        className={classNames(classes.personalInfoTextField, classes.w100)}
                                        value={this.state.password}
                                        onChange={(event) => { this.handleInfoChange(event)('password') }}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="standard-name"
                                        label="Возраст"
                                        className={classNames(classes.personalInfoTextField, classes.w100)}
                                        value={this.state.age}
                                        onChange={(event) => { this.handleInfoChange(event)('age') }}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="standard-name"
                                        label="Город"
                                        className={classNames(classes.personalInfoTextField, classes.w100)}
                                        value={this.state.city}
                                        onChange={(event) => { this.handleInfoChange(event)('city') }}
                                        margin="normal"
                                    />
                                </form>
                                <div className={classNames(classes.flex, classes.justifyContentEnd)}>
                                    <Button variant="contained" color="primary" style={{ marginRight: 5 }}>Отправить</Button>
                                    <Button variant="contained" color="primary">Отменить</Button>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
	appInterface: state.appInterface,
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    apiRequest: (url, method, params, headers, callback) => {
		return (REQEST, SUCCESS, FAILURE) => {
			dispatch(apiRequest(url, method, params, headers, callback)(REQEST, SUCCESS, FAILURE));
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
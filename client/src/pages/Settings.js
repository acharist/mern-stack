import React, { Component } from 'react';
import classNames from 'classnames';

// Styles
import { styles } from '../assets/jss/styles';

// Utils
import isExpiredToken from '../utils/isExpiredToken';
import getLocal from '../utils/getLocal';

// Actions
import refreshTokens from '../actions/refreshTokens';
import closeDrawer from '../actions/closeDrawer';
import openDrawer from '../actions/openDrawer';
import request from '../actions/request';

// Constants
import UPDATE_INFO_REQUEST from '../constants/UPDATE_INFO_REQUEST';
import UPDATE_INFO_SUCCESS from '../constants/UPDATE_INFO_SUCCESS';
import UPDATE_INFO_FAILURE from '../constants/UPDATE_INFO_FAILURE';
import UPDATE_AVATAR_REQUEST from '../constants/UPDATE_AVATAR_REQUEST';
import UPDATE_AVATAR_SUCCESS from '../constants/UPDATE_AVATAR_SUCCESS';
import UPDATE_AVATAR_FAILURE from '../constants/UPDATE_AVATAR_FAILURE';
import REFRESH_SESSION_DATA_REQUEST from '../constants/REFRESH_SESSION_DATA_REQUEST';
import REFRESH_SESSION_DATA_SUCCESS from '../constants/REFRESH_SESSION_DATA_SUCCESS';
import REFRESH_SESSION_DATA_FAILURE from '../constants/REFRESH_SESSION_DATA_FAILURE';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Containers
import AppBar from '../containers/AppBar';
import AppDrawer from '../containers/AppDrawer';

// Components
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

// Icons
import CloudUpload from '@material-ui/icons/CloudUpload';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.auth.session.user.data.name || '', 
            email: this.props.auth.session.user.data.email || '',
            password: '',
            age: this.props.auth.session.user.data.age || '',
            city: this.props.auth.session.user.data.city || ''
        }

        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.sendAvatar = this.sendAvatar.bind(this);
        this.sendInfo = this.sendInfo.bind(this);

        this.accessToken = getLocal('access-token');
        this.refreshToken = getLocal('refresh-token');
        this._id = getLocal('id');

        this.avatarInput = React.createRef();
    }

    async componentDidMount() {
        if(!this.props.auth.session.user.data) {
			await this.props.request(`/api/user/${this._id}`, 'get')(REFRESH_SESSION_DATA_REQUEST, REFRESH_SESSION_DATA_SUCCESS, REFRESH_SESSION_DATA_FAILURE);
		}
    }

    handleInfoChange(event) {
        return (type) => {
            this.setState({[type]: event.target.value});
        }
    }

    async sendAvatar() {
        const headers = { 'Content-Type': 'multipart/form-data' }
        const formData = new FormData();
        formData.append('avatar', this.avatarInput.current.files[0]);
        if (isExpiredToken(this.accessToken)) {
            await this.props.refreshTokens(this.refreshToken);
        }
        await this.props.request(`/api/user/${this._id}/settings/avatar`, 'post', formData, { headers })(UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAILURE);
        await this.props.request(`/api/user/${this._id}`, 'get')(REFRESH_SESSION_DATA_REQUEST, REFRESH_SESSION_DATA_SUCCESS, REFRESH_SESSION_DATA_FAILURE);
    }

    async sendInfo() {
        const data = {
            name: this.state.name || '', 
            email: this.state.email || '',
            password: '' || '',
            age: this.state.age || '',
            city: this.state.city || ''
        }
        
        if (isExpiredToken(this.accessToken)) {
            await this.props.refreshTokens(this.refreshToken);
        }
        await this.props.request(`/api/user/${this._id}/settings/common`, 'post', data)(UPDATE_INFO_REQUEST, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAILURE);
        await this.props.request(`/api/user/${this._id}`, 'get')(REFRESH_SESSION_DATA_REQUEST, REFRESH_SESSION_DATA_SUCCESS, REFRESH_SESSION_DATA_FAILURE);
    }

    render() {
        const { classes, appInterface, openDrawer, closeDrawer, pages, auth } = this.props;
        const message = pages.settingsPage.data.errorData && pages.settingsPage.data.errorData.message;
        if (pages.settingsPage.avatar.loading || pages.settingsPage.data.loading || auth.session.loading) return <div className={classes.loader}><CircularProgress /></div>
        if (!auth.session.loading && !auth.session.user.data) return null;
        return (
            <div>
                <AppBar title="Настройки" openDrawer={openDrawer}/>
                <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

                <div style={{ padding: 12, marginTop: 20 }}>
                    <Grid container spacing={24} justify="center">
                        <Grid item xs={10}>
                            <Paper className={classes.innerPadding}>
                                <Typography variant="subtitle1" className={classes.settingsTitle}>
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
                                <Typography variant="subtitle1" className={classes.settingsTitle}>
                                    Персональная информация
                                </Typography>
                                <form style={{ marginBottom: 40 }}>

                                    <FormControl error={message.match(/name/i) ? true : false} className={classes.personalInfoTextField} aria-describedby="component-name">
                                        <InputLabel htmlFor="name">Имя</InputLabel>
                                        <Input id="name" type="name" value={this.state.name} onChange={(event) => { this.handleInfoChange(event)('name') }} />
                                        <FormHelperText error={message.match(/name/i) ? true : false} id="component-name">
                                            {message.match(/name/i) ? message : null}
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl error={message.match(/email/i) ? true : false} className={classes.personalInfoTextField} aria-describedby="component-email">
                                        <InputLabel htmlFor="email">E-mail</InputLabel>
                                        <Input id="email" type="email" value={this.state.email} onChange={(event) => { this.handleInfoChange(event)('email') }} />
                                        <FormHelperText error={message.match(/email/i) ? true : false} id="component-email">
                                            {message.match(/email/i) ? message : null}
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl error={message.match(/password/i) ? true : false} className={classes.personalInfoTextField} aria-describedby="component-password">
                                        <InputLabel htmlFor="password">Пароль</InputLabel>
                                        <Input id="password" type="password" value={this.state.password} onChange={(event) => { this.handleInfoChange(event)('password') }} />
                                        <FormHelperText error={message.match(/password/i) ? true : false} id="component-password">
                                            {message.match(/password/i) ? message : null}
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl error={message.match(/age/i) ? true : false} className={classes.personalInfoTextField} aria-describedby="component-age">
                                        <InputLabel htmlFor="age">Возраст</InputLabel>
                                        <Input id="age" type="age" value={this.state.age} onChange={(event) => { this.handleInfoChange(event)('age') }} />
                                        <FormHelperText error={message.match(/age/i) ? true : false} id="component-age">
                                            {message.match(/age/i) ? message : null}
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl error={message.match(/city/i) ? true : false} className={classes.personalInfoTextField} aria-describedby="component-city">
                                        <InputLabel htmlFor="city">Город</InputLabel>
                                        <Input id="city" type="city" value={this.state.city} onChange={(event) => { this.handleInfoChange(event)('city') }} />
                                        <FormHelperText error={message.match(/city/i) ? true : false} id="component-city">
                                            {message.match(/city/i) ? message : null}
                                        </FormHelperText>
                                    </FormControl>

                                </form>
                                <div className={classNames(classes.flex, classes.justifyContentEnd)}>
                                    <Button onClick={this.sendInfo} variant="contained" color="primary" style={{ marginRight: 5 }}>Отправить</Button>
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
    pages: state.pages,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    request: (url, method, params, headers) => {
        return (REQEST, SUCCESS, FAILURE) => {
            return dispatch(request(url, method, params, headers)(REQEST, SUCCESS, FAILURE));
        }
    },
    refreshTokens: (refreshToken, callback) => {
        return dispatch(refreshTokens(refreshToken, callback));
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
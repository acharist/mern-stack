import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';

//Components
import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';
import ErrorSnackbar from '../components/ErrorSnackbar';

import { styles } from '../assets/jss/styles';

//Actions
import signup from '../actions/signup';
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import openErrorSnackbar from '../actions/openErrorSnackbar';

//Utils
// import sendTokens from '../utils/sendToken';

class Signup extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            password: ''
        }
       
        this.sendData = this.sendData.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentDidUpdate(prevProps) {
        let status = this.props.auth.signup.errorData && this.props.auth.signup.errorData.status;
        const { appInterface, openErrorSnackbar } = this.props;

        (status >= 500 && !appInterface.isErrorSnackbarOpen && prevProps.auth.signup.loading) &&  openErrorSnackbar()
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }
    
    handleChangeEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }
    
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    sendData() {
        this.props.authUser(this.state.name, this.state.email, this.state.password);
    }
    
    render() {
        const { classes, appInterface, auth, openDrawer, closeDrawer } = this.props;
        const message = auth.signup.errorData && auth.signup.errorData.formMessage;
        const status = auth.signup.errorData && auth.signup.errorData.status;

        return (
            <div>
                <div>  
                    <ErrorSnackbar/>
                    {signup.loading && <div className={classes.loader}>
                        <CircularProgress/>
                    </div>}

                    <AppBar title="Регистрация" openDrawer={openDrawer}/>
                    <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

                    <Paper className={classes.authOverlay} elevation={1}>
                        <form className={classes.form}>
                            <FormControl required error={(status < 500) && message.match(/name/i) ? true : false} className={classes.textField} aria-describedby="component-name">
                                <InputLabel htmlFor="name">Имя</InputLabel>
                                <Input id="name" value={this.state.name} onChange={this.handleChangeName} />
                                <FormHelperText error={(status < 500) && message.match(/name/i) ? true : false} id="component-name">
                                    {(status < 500) && message.match(/name/i) ? message : null}
                                </FormHelperText>
                            </FormControl>

                            <FormControl required error={(status < 500) && message.match(/email/i) ? true : false} className={classes.textField} aria-describedby="component-email">
                                <InputLabel htmlFor="email">E-mail</InputLabel>
                                <Input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} />
                                <FormHelperText error={(status < 500) && message.match(/email/i) ? true : false} id="component-email">
                                    {(status < 500) && message.match(/email/i) ? message : null}
                                </FormHelperText>
                            </FormControl>

                            <FormControl required error={(status < 500) && message.match(/password/i) ? true : false} className={`${classes.textField} ${classes.bottomGutter}`} aria-describedby="component-password">
                                <InputLabel htmlFor="password">Пароль</InputLabel>
                                <Input id="password" type="password" value={this.state.password} onChange={this.handleChangePassword} />
                                <FormHelperText error={(status < 500) && message.match(/password/i) ? true : false} id="component-password">
                                    {(status < 500) && message.match(/password/i) ? message : null}
                                </FormHelperText>
                            </FormControl>
                            
                            <Button onClick={this.sendData} variant="contained" color="primary" className={classes.button}>
                                Отправить
                            </Button>
                        </form>
                    </Paper>

                    <div className={classes.backgroundOverlay}></div>

                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    appInterface: state.appInterface,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    openDrawer: () => {
        dispatch(openDrawer());
    },
    closeDrawer: () => {
        dispatch(closeDrawer());
    },
    authUser: (name, email, password) => {
        dispatch(signup(name, email, password));
    },
    openErrorSnackbar: () => {
        dispatch(openErrorSnackbar());
    }
});

Signup = withStyles(styles)(Signup);
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
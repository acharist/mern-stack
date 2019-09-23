import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import { styles } from '../assets/jss/styles';

// Higher-Order Components
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Actions
import openErrorSnackbar from '../actions/openErrorSnackbar';
import closeDrawer from '../actions/closeDrawer';
import openDrawer from '../actions/openDrawer';
import signin from '../actions/signin';

// Containers
import ErrorSnackbar from '../containers/ErrorSnackbar';
import AppDrawer from '../containers/AppDrawer';
import AppBar from '../containers/AppBar';

// Components
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

class Signin extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: ''
        }
       
        this.sendData = this.sendData.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentDidUpdate(prevProps) {
        let status = this.props.auth.signin.errorData && this.props.auth.signin.errorData.status;
        const { appInterface, openErrorSnackbar } = this.props;

        (status >= 500 && !appInterface.isErrorSnackbarOpen && prevProps.auth.signin.loading) &&  openErrorSnackbar()
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
        this.props.authUser(this.state.email, this.state.password);
    }
    
    render() {
        const { classes, auth, appInterface, closeDrawer, openDrawer } = this.props;
        const message = auth.signin.errorData && auth.signin.errorData.formMessage;
        const status = auth.signin.errorData && auth.signin.errorData.status;

        return (
            <div>
                <div> 
                    <ErrorSnackbar/>
                    {/* {(status >= 500 && !appInterface.isErrorSnackbarOpen) &&  openErrorSnackbar()} */}
                    
                    {signin.loading && <div className={classes.loader}>
                        <CircularProgress/>
                    </div>}

                    <AppBar title="Вход" openDrawer={openDrawer}/>
				    <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

                    <Paper className={classes.authOverlay} elevation={1}>
                        <form className={classes.form}>
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
        )
    }
}

Signin.propTypes = {
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
    authUser: (email, password) => {
        dispatch(signin(email, password));
    },
    openErrorSnackbar: () => {
        dispatch(openErrorSnackbar());
    }
});

Signin = withStyles(styles)(Signin);
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
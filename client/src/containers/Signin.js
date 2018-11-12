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

import { styles } from '../assets/jss/auth';

//Components
import AppBar from '../components/AppBar';
import AppDrawer from '../components/AppDrawer';

//Actions
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';
import signin from '../actions/signin';

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

        return (
            <div>
                <div>  
                    
                    {signin.loading && <div className={classes.loader}>
                        <CircularProgress/>
                    </div>}

                    <AppBar title="Вход" openDrawer={openDrawer}/>
				    <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

                    <Paper className={classes.authOverlay} elevation={1}>
                        <form className={classes.form}>
                            <FormControl required error={message.match(/email/i) ? true : false} className={classes.textField} aria-describedby="component-email">
                                <InputLabel htmlFor="email">E-mail</InputLabel>
                                <Input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} />
                                <FormHelperText error={message.match(/email/i) ? true : false} id="component-email">
                                    {message.match(/email/i) ? message : null}
                                </FormHelperText>
                            </FormControl>

                            <FormControl required error={message.match(/password/i) ? true : false} className={`${classes.textField} ${classes.bottomGutter}`} aria-describedby="component-password">
                                <InputLabel htmlFor="password">Пароль</InputLabel>
                                <Input id="password" type="password" value={this.state.password} onChange={this.handleChangePassword} />
                                <FormHelperText error={message.match(/password/i) ? true : false} id="component-password">
                                    {message.match(/password/i) ? message : null}
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
    }
});

Signin = withStyles(styles)(Signin);
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
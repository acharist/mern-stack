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

import { styles } from '../assets/jss/auth';

//Actions
import signup from '../actions/signup';
import openDrawer from '../actions/openDrawer';
import closeDrawer from '../actions/closeDrawer';

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

        return (
            <div>
                <div>  
                    
                    {signup.loading && <div className={classes.loader}>
                        <CircularProgress/>
                    </div>}

                    <AppBar title="Регистрация" openDrawer={openDrawer}/>
                    <AppDrawer isDrawerOpen={appInterface.isDrawerOpen} closeDrawer={closeDrawer}/>

                    <Paper className={classes.authOverlay} elevation={1}>
                        <form className={classes.form}>
                            <FormControl required error={(message && message.match(/name/i)) ? true : false} className={classes.textField} aria-describedby="component-name">
                                <InputLabel htmlFor="name">Имя</InputLabel>
                                <Input id="name" value={this.state.name} onChange={this.handleChangeName} />
                                <FormHelperText error={(message && message.match(/name/i)) ? true : false} id="component-name">
                                    {(message && message.match(/name/i)) ? message : null}
                                </FormHelperText>
                            </FormControl>

                            <FormControl required error={(message && message.match(/email/i)) ? true : false} className={classes.textField} aria-describedby="component-email">
                                <InputLabel htmlFor="email">E-mail</InputLabel>
                                <Input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} />
                                <FormHelperText error={(message && message.match(/email/i)) ? true : false} id="component-email">
                                    {(message && message.match(/email/i)) ? message : null}
                                </FormHelperText>
                            </FormControl>

                            <FormControl required error={(message && message.match(/password/i)) ? true : false} className={`${classes.textField} ${classes.bottomGutter}`} aria-describedby="component-password">
                                <InputLabel htmlFor="password">Пароль</InputLabel>
                                <Input id="password" type="password" value={this.state.password} onChange={this.handleChangePassword} />
                                <FormHelperText error={(message && message.match(/password/i)) ? true : false} id="component-password">
                                    {(message && message.match(/password/i)) ? message : null}
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
    }
});

Signup = withStyles(styles)(Signup);
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
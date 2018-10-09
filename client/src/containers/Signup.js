import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import { styles } from '../assets/jss/auth';

//Actions
import signup from '../actions/signup';

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
            emailError: false
        });
        console.log(this.state)
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
        const { classes, signup } = this.props;
        const message = signup.payload && signup.payload.data.message;
        console.log(signup)
        return (
            <div>
                {signup.loading && <div className={classes.loader}>
                    <CircularProgress/>
                </div>}
                <Paper className={classes.authOverlay} elevation={1}>
                    <Typography component="h1" className={classes.title}>
                        Регистрация
                    </Typography>
                    <form className={classes.form}>
                        <FormControl required error={message.match(/name/i) ? true : false} className={classes.textField} aria-describedby="component-name">
                            <InputLabel htmlFor="name">Имя</InputLabel>
                            <Input id="name" value={this.state.name} onChange={this.handleChangeName} />
                            <FormHelperText error={message.match(/name/i) ? true : false} id="component-name">
                                {message.match(/name/i) ? message : null}
                            </FormHelperText>
                        </FormControl>

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
        )
    }
}

const mapStateToProps = (state) => ({
    signup: state.signup
});

const mapDispatchToProps = (dispatch) => ({
    authUser: (name, email, password) => {
        dispatch(signup(name, email, password));
    }
});

Signup = withStyles(styles)(Signup);
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
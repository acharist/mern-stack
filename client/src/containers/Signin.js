import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'redux';

import { styles } from '../assets/jss/auth';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }

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
            email: event.target.value
        });
    }
    
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.signUpOverlay} elevation={1}>
                    <Typography component="h1" className={classes.title}>
                        Вход
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            id="standard-email-input"
                            label="E-mail"
                            className={classes.textField}
                            value={this.state.email}
                            type="email"
                            onChange={this.handleChangeEmail}
                            margin="normal"
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={`${classes.textField} ${classes.bottomGutter}`}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" className={classes.button}>
                            Отправить
                        </Button>
                    </form>
                </Paper>
                <div className={classes.backgroundOverlay}></div>
            </div>
        )
    }
}

export default withStyles(styles)(Signup);
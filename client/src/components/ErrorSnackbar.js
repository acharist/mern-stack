import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { styles } from '../assets/jss/styles';
import { connect } from 'react-redux';

//Actions
import openErrorSnackbar from '../actions/openErrorSnackbar';
import closeErrorSnackbar from '../actions/closeErrorSnackbar';

class ErrorSnackbar extends Component {
    render() {
        const { appInterface, openErrorSnackbar, closeErrorSnackbar, classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={appInterface.isErrorSnackbarOpen}
                    autoHideDuration={4000}
                    onClose={closeErrorSnackbar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Server error!</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={closeErrorSnackbar}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={closeErrorSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    appInterface: state.appInterface
});

const mapDispatchToProps = (dispatch) => ({
    openErrorSnackbar: () => {
        dispatch(openErrorSnackbar());
    },
    closeErrorSnackbar: () => {
        dispatch(closeErrorSnackbar());
    }
});

ErrorSnackbar = withStyles(styles)(ErrorSnackbar);
export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Actions
import openDeletePostDialog from '../actions/openDeletePostDialog';
import closeDeletePostDialog from '../actions/closeDeletePostDialog';

class DeletePostDialog extends Component {
    render() {
        const { appInterface, openDeletePostDialog, closeDeletePostDialog, deletePost } = this.props;
        return (
            <div>
                <Dialog
                open={appInterface.isDeletePostDialogOpen}
                onClose={closeDeletePostDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Удаление"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалть данный пост?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDeletePostDialog} color="primary">
                        Отмена
                        </Button>
                        <Button onClick={deletePost} color="primary" autoFocus>
                        Удалть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    appInterface: state.appInterface
});

const mapDispatchToProps = (dispatch) => ({
    openDeletePostDialog: () => {
        dispatch(openDeletePostDialog());
    },
    closeDeletePostDialog: () => {
        dispatch(closeDeletePostDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePostDialog);
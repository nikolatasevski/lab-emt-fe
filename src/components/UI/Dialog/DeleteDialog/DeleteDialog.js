import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../../store/actions";

const DeleteDialog = (props) => {

    const handleDeleteBook = () => {
        props.deleteBook(props.currentBook.id);
        props.handleClose();
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete book {props.currentBook ? props.currentBook.name : null}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteBook} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        error: state.bookReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBook: (bookId) => dispatch(actions.deleteBook(bookId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteDialog));

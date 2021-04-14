import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../../store/actions";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "95%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const FormDialog = (props) => {
    const classes = useStyles();
    const [bookName, setBookName] = useState('');
    const [availableCopies, setAvailableCopies] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        if(props.isEdit){
            setBookName(props.currentBook.name);
            setAvailableCopies(props.currentBook.availableCopies);
            setCategory(props.currentBook.category);
            setAuthor(props.currentBook.authorId);
        }else{
            setBookName('');
            setAvailableCopies('');
            setCategory('');
            setAuthor('');
        }
    }, [props])

    const handleSubmit = () => {
        if(props.isEdit){
            props.editBook(props.currentBook.id, bookName, availableCopies, category, author)
        }else{
            props.createBook(bookName, availableCopies, category, author)
        }
        props.handleClose();
    }

    return (
        <div>
            <Dialog maxWidth={"sm"} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.isEdit ? "Edit Book" : "Add New Book"}</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Book Name"
                            value={bookName}
                            onChange={(event) => setBookName(event.target.value)}
                            type="text"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Available Copies"
                            value={availableCopies}
                            onChange={(event) => setAvailableCopies(event.target.value)}
                            type="number"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            {props.categories ? props.categories.map((category, index) => (
                                <MenuItem key={index} value={category}>{category}</MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Author</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        >
                            {props.authors ? props.authors.map(author => (
                                <MenuItem key={author.id} value={author.id}>{author.name + " " + author.surname}</MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {props.isEdit ? "Edit" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.bookReducer.categories,
        error: state.bookReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBook: (name, availableCopies, category, authorId) => dispatch(actions.createBook(name, availableCopies, category, authorId)),
        editBook: (id, name, availableCopies, category, authorId) => dispatch(actions.editBook(id, name, availableCopies, category, authorId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormDialog));

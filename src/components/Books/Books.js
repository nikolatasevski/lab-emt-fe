import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {connect, useDispatch} from "react-redux";
import * as actions from '../../store/actions/index';
import AddIcon from '@material-ui/icons/Add';
import FormDialog from "../UI/Dialog/FormDialog/FormDialog";
import DeleteDialog from "../UI/Dialog/DeleteDialog/DeleteDialog";
import * as actionTypes from '../../store/actionTypes';


const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
    tableHead: {
        backgroundColor: "lightgray"
    }
});

const Books = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [currentBook, setCurrentBook] = useState(null);

    const handleClickOpen = (isEdit, book) => {
        setIsEdit(isEdit);
        setCurrentBook(book)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenDeleteDialog = (book) => {
        setCurrentBook(book);
        setOpenDeleteDialog(true);
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }

    useEffect(() => {
        props.getBooks();
        props.getAuthors();
        props.getCategories();
    }, []);

    const handleMarkAsTaken = (bookId) => {
        props.markAsTaken(bookId)
    }

    const handleChangePage = (event, newPage) => {
        dispatch({type: actionTypes.UPDATE_PAGE_DATA, page: newPage, rowsPerPage: props.rowsPerPage})
        props.getBooks();
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch({type: actionTypes.UPDATE_PAGE_DATA, page: 0, rowsPerPage: parseInt(event.target.value, 10)})
        props.getBooks()
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Available Copies</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Author</TableCell>
                            {
                                props.role ? props.role[0] === "ROLE_LIBRARIAN" ?
                                    <TableCell align="right">
                                        <IconButton color={"primary"} onClick={() => handleClickOpen(false, null)}>
                                            <AddIcon/>
                                        </IconButton>
                                        <FormDialog currentBook={currentBook}
                                                    authors={props.authors}
                                                    categories={props.categories}
                                                    isEdit={isEdit}
                                                    open={open}
                                                    handleClose={handleClose}/>
                                    </TableCell> : null : null
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.books ? props.books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell component="th" scope="row">
                                    {book.id}
                                </TableCell>
                                <TableCell align="right">{book.name}</TableCell>
                                <TableCell align="right">{book.availableCopies}</TableCell>
                                <TableCell align="right">{book.category}</TableCell>
                                <TableCell align="right">{book.authorName + " " + book.authorSurname}</TableCell>
                                {
                                    props.role ? props.role[0] === "ROLE_LIBRARIAN" ?
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleMarkAsTaken(book.id)}>
                                                <CheckCircleIcon style={{color: "green"}}/>
                                            </IconButton>
                                            <IconButton onClick={() => handleClickOpen(true, book)}>
                                                <EditIcon color={"primary"}/>
                                            </IconButton>
                                            <IconButton onClick={() => handleClickOpenDeleteDialog(book)}>
                                                <DeleteIcon color={"secondary"}/>
                                            </IconButton>
                                            <DeleteDialog currentBook={currentBook}
                                                          open={openDeleteDialog}
                                                          handleClose={handleCloseDeleteDialog}/>
                                        </TableCell> : null : null
                                }
                            </TableRow>
                        )) : null}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={props.totalBooks}
                                page={props.page}
                                rowsPerPageOptions={[5, 10, 15, {label: 'All', value: props.totalBooks}]}
                                onChangePage={handleChangePage}
                                rowsPerPage={props.rowsPerPage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        books: state.bookReducer.books,
        totalBooks: state.bookReducer.totalBooks,
        rowsPerPage: state.bookReducer.rowsPerPage,
        page: state.bookReducer.page,
        categories: state.bookReducer.categories,
        authors: state.bookReducer.authors,
        error: state.bookReducer.error,
        role: state.authReducer.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBooks: () => dispatch(actions.getBooks()),
        markAsTaken: (bookId) => dispatch(actions.markBookAsTaken(bookId)),
        getCategories: () => dispatch(actions.getCategories()),
        getAuthors: () => dispatch(actions.getAuthors())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Books));

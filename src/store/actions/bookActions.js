import {API_DRIVER, setAuthToken} from "../../config";
import * as actionTypes from '../actionTypes'
import store from "../store";

export const getBooks = () => {
    console.log("GET BOOKS CALL")
    let state = store.getState().bookReducer;
    return dispatch => {
        API_DRIVER.get("api/book/user", {params: {
                page: state.page,
                size: state.rowsPerPage
            }})
            .then(response => {
                dispatch({
                    type: actionTypes.GET_BOOKS_SUCCESS,
                    totalBooks: response.data.totalElements,
                    books: response.data.content
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.GET_BOOKS_ERROR})
            })
    }
};

export const getCategories = () => {
    console.log("GET CATEGORIES CALL")

    return dispatch => {
        API_DRIVER.get("api/book/user/categories")
            .then(response => {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_SUCCESS,
                    categories: response.data
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.GET_CATEGORIES_ERROR})
            })
    }
}

export const markBookAsTaken = (bookId) => {
    return dispatch => {
        API_DRIVER.patch("api/book/librarian/takeBook", {id: bookId})
            .then(response => {
                dispatch({
                    type: actionTypes.MARK_AS_TAKEN_SUCCESS,
                    id: bookId
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.MARK_AS_TAKEN_ERROR})
            })
    }
}

export const createBook = (name, availableCopies, category, authorId) => {
    setAuthToken();

    const createBookDto = {
        name: name,
        availableCopies: availableCopies,
        category: category,
        authorId: authorId
    }
    return dispatch => {
        API_DRIVER.post("api/book/librarian", createBookDto)
            .then(response => {
                dispatch({
                    type: actionTypes.CREATE_BOOK_SUCCESS,
                    book: response.data
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.CREATE_BOOK_ERROR})
            })
    }
}

export const editBook = (id, name, availableCopies, category, authorId) => {
    const editBookDto = {
        id: id,
        name: name,
        availableCopies: availableCopies,
        category: category,
        authorId: authorId
    }

    return dispatch => {
        API_DRIVER.patch("api/book/librarian", editBookDto)
            .then(response => {
                dispatch({
                    type: actionTypes.EDIT_BOOK_SUCCESS,
                    book: response.data,
                    id: id
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.EDIT_BOOK_ERROR})
            })
    }
};

export const deleteBook = (bookId) => {
    return dispatch => {
        API_DRIVER.delete("api/book/librarian/" + bookId)
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_BOOK_SUCCESS,
                    id: bookId
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.DELETE_BOOK_ERROR})
            })
    }
}

export const getAuthors = () => {
    console.log("GET AUTHORS CALL")

    return dispatch => {
        API_DRIVER.get("api/author")
            .then(response => {
                dispatch({
                    type: actionTypes.GET_AUTHORS_SUCCESS,
                    authors: response.data
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.GET_AUTHORS_ERROR})
            })
    }
}




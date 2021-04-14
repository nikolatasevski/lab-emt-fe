import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    books: [],
    categories: [],
    authors: [],
    currentBook: {},
    totalBooks: 0,
    page: 0,
    rowsPerPage: 5,
    error: false
};

const updatePageData = (state, action) => {
    return updateObject(state, {
        error: false,
        page: action.page,
        rowsPerPage: action.rowsPerPage
    })
}

const getBooks = (state, action) => {
    return updateObject(state,
        {
            books: action.books,
            totalBooks: action.totalBooks,
            error: false
        });
};

const getBooksError = (state, action) => {
    return updateObject(state,
        {
            error: true
        });
};

const getCategories = (state, action) => {
    return updateObject(state, {
        categories: action.categories,
        error: false
    });
};

const getCategoriesError = (state, action) => {
    return updateObject(state,
        {
            error: true
        });
};

const getAuthors = (state, action) => {
    return updateObject(state, {
        authors: action.authors,
        error: false
    })
}

const getAuthorsError = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const markBookAsTaken = (state, action) => {
    const tempBooksArray = [...state.books];
    const tempBook = tempBooksArray.find(book => book.id === action.id);
    tempBook.availableCopies = tempBook.availableCopies - 1;
    return updateObject(state, {books: tempBooksArray, error: false});
};

const markBookAsTakenError = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const createBook = (state, action) => {
    /*const tempBooksArray = [...state.books];
    const tmpBook = {
        ...action.book,
        authorId: action.book.author.id,
        authorName: action.book.author.name,
        authorSurname: action.book.author.surname
    }

    tempBooksArray.push(tmpBook);*/
    return updateObject(state, {totalBooks: state.totalBooks + 1})
}

const createBookError = (state, action) => {
    return updateObject(state, {error: true});
}

const editBook = (state, action) => {
    const tempBooksArray = [...state.books];
    const tempBooks = tempBooksArray.filter(book => book.id !== action.id);
    const tmpBook = {
        ...action.book,
        authorId: action.book.author.id,
        authorName: action.book.author.name,
        authorSurname: action.book.author.surname
    }

    tempBooks.push(tmpBook);
    return updateObject(state, {books: tempBooks, error: false})
};

const editBookError = (state, action) => {
    return updateObject(state, {
        error: true
    })
};

const deleteBook = (state, action) => {
    const tempBooksArray = [...state.books];
    const tempBooks = tempBooksArray.filter(book => book.id !== action.id);
    return updateObject(state, {books: tempBooks, error: false});
}

const deleteBookError = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BOOKS_SUCCESS:
            return getBooks(state, action);
        case actionTypes.GET_BOOKS_ERROR:
            return getBooksError(state, action);
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return getCategories(state, action);
        case actionTypes.GET_CATEGORIES_ERROR:
            return getCategoriesError(state, action);
        case actionTypes.MARK_AS_TAKEN_SUCCESS:
            return markBookAsTaken(state, action);
        case actionTypes.MARK_AS_TAKEN_ERROR:
            return markBookAsTakenError(state, action);
        case actionTypes.CREATE_BOOK_SUCCESS:
            return createBook(state, action);
        case actionTypes.CREATE_BOOK_ERROR:
            return createBookError(state, action);
        case actionTypes.EDIT_BOOK_SUCCESS:
            return editBook(state, action);
        case actionTypes.EDIT_BOOK_ERROR:
            return editBookError(state, action);
        case actionTypes.DELETE_BOOK_SUCCESS:
            return deleteBook(state, action);
        case actionTypes.DELETE_BOOK_ERROR:
            return deleteBookError(state, action);
        case actionTypes.GET_AUTHORS_SUCCESS:
            return getAuthors(state, action);
        case actionTypes.GET_AUTHORS_ERROR:
            return getAuthorsError(state, action);
        case actionTypes.UPDATE_PAGE_DATA:
            return updatePageData(state, action);
        default:
            return state;
    }
};

export default bookReducer;

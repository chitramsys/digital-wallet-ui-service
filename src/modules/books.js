import { SUCCESS_SUFFIX } from 'redux-axios-middleware';

const LIST_BOOKS = 'LIST_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';

const booksReducer = (state = [], action) => {
  switch (action.type) {
  case LIST_BOOKS + SUCCESS_SUFFIX:
    return action.payload.data;

  case DELETE_BOOK:
    return state.filter((book) => book.id !== action.payload.book.id);

  default:
    return state;
  }
};

export default booksReducer;

export const allBooks = () => ({
  type: LIST_BOOKS,
  payload: {
    request: {
      url: '/demo/books',
    },
  },
});

export const addBook = book => {
  return {
    type: ADD_BOOK,
    payload: {
      request: {
        url: '/demo/books',
        method: 'POST',
        data: book,
      },
    },
  }
};

export const deleteBook = book => {
  return {
    type: DELETE_BOOK,
    payload: {
      book,
      request: {
        url: `/demo/books/${book.id}`,
        method: 'DELETE',
      },
    },
  }
};

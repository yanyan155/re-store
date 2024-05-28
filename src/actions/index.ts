import { Dispatch } from "redux";

import {
  Error,
  BookId,
  Book,
  typeBookstoreService,
  ActionTypes,
} from "../types";

const booksRequested = () => {
  return {
    type: ActionTypes["FETCH_BOOKS_REQUEST"],
  };
};

const booksLoaded = (newBooks: Book[]) => {
  return {
    type: ActionTypes["FETCH_BOOKS_SUCCESS"],
    payload: newBooks,
  };
};

const booksError = (error: Error) => {
  return {
    type: ActionTypes["FETCH_BOOKS_FAILURE"],
    payload: error,
  };
};

export const bookAddedToCart = (bookId: BookId) => {
  return {
    type: ActionTypes["BOOK_ADDED_TO_CART"],
    payload: bookId,
  };
};

export const bookRemovedFromCart = (bookId: BookId) => {
  return {
    type: ActionTypes["BOOK_REMOVED_FROM_CART"],
    payload: bookId,
  };
};

export const allBooksRemovedFromCart = (bookId: BookId) => {
  return {
    type: ActionTypes["ALL_BOOKS_REMOVED_FROM_CART"],
    payload: bookId,
  };
};

// const fetchBooksOld = (bookstoreService, dispatch) => () => {
//   dispatch(booksRequested());
//   bookstoreService
//     .getBooks()
//     .then((data: Book[]) => dispatch(booksLoaded(data)))
//     .catch((err: Error) => dispatch(booksError(err)));
// };

const fetchBooks = (bookstoreService: typeBookstoreService) => () => (
  dispatch: Dispatch
) => {
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then((data: Book[]) => dispatch(booksLoaded(data)))
    .catch((err: Error) => dispatch(booksError(err)));
};

export { fetchBooks };

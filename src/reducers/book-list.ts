import { ActionTypes, ActionsFetch, AppState, BooksList } from "../types";

const updateBookList = (state: AppState, action: ActionsFetch): BooksList => {
  if (state === undefined) {
    return {
      books: [],
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case ActionTypes.FETCH_BOOKS_REQUEST:
      return {
        books: [],
        loading: true,
        error: null,
      };

    case ActionTypes.FETCH_BOOKS_SUCCESS:
      return {
        books: action.payload,
        loading: false,
        error: null,
      };

    case ActionTypes.FETCH_BOOKS_FAILURE:
      return {
        books: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state.bookList;
  }
};

export default updateBookList;

import BookstoreService from "./services/bookstore-service";

export type Error = typeof Error;
export type BookId = number;
export type BookTitle = string;
export interface Book {
  id: BookId;
  title: BookTitle;
  author: string;
  price: number;
  coverImage: string;
}
export type typeBookstoreService = InstanceType<typeof BookstoreService>;

export enum ActionTypes {
  "FETCH_BOOKS_REQUEST" = "FETCH_BOOKS_REQUEST",
  "FETCH_BOOKS_SUCCESS" = "FETCH_BOOKS_SUCCESS",
  "FETCH_BOOKS_FAILURE" = "FETCH_BOOKS_FAILURE",
  "BOOK_ADDED_TO_CART" = "BOOK_ADDED_TO_CART",
  "BOOK_REMOVED_FROM_CART" = "BOOK_REMOVED_FROM_CART",
  "ALL_BOOKS_REMOVED_FROM_CART" = "ALL_BOOKS_REMOVED_FROM_CART",
  "DELAYED_ACTION" = "DELAYED_ACTION",
}

interface ActionFetchBooksAndDelayed {
  type: ActionTypes.FETCH_BOOKS_REQUEST | ActionTypes.DELAYED_ACTION;
}

interface ActionFetchSuccess {
  type: ActionTypes.FETCH_BOOKS_SUCCESS;
  payload: Books;
}

interface ActionErrorFetch {
  type: ActionTypes.FETCH_BOOKS_FAILURE;
  payload: Error;
}

export interface ActionCartManipulation {
  type:
    | ActionTypes.BOOK_ADDED_TO_CART
    | ActionTypes.BOOK_REMOVED_FROM_CART
    | ActionTypes.ALL_BOOKS_REMOVED_FROM_CART;
  payload: BookId;
}

export type Actions = ActionsFetch | ActionCartManipulation;

export type ActionsFetch =
  | ActionFetchBooksAndDelayed
  | ActionFetchSuccess
  | ActionErrorFetch;

export type GetBook = Promise<Books>;
export type Books = Book[];

export interface CartItem {
  id: BookId;
  title: BookTitle;
  count: number;
  total: number;
}
export type CartItems = CartItem[];

export interface ShoppingCart {
  cartItems: CartItems;
  orderTotal: number;
}
export interface BooksList {
  books: Books;
  loading: boolean;
  error: null | Error;
}

export interface AppState {
  bookList: BooksList;
  shoppingCart: ShoppingCart;
}

export type DispatchType = (args: Actions) => Actions;

// https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
// https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/

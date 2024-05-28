import updateBookList from "./book-list";
import updateShoppingCart from "./shopping-cart";

import {
  Actions,
  AppState,
  ActionCartManipulation,
  ActionsFetch,
} from "../types";

const reducer = (state: AppState, action: Actions) => {
  return {
    bookList: updateBookList(state, action as ActionsFetch),
    shoppingCart: updateShoppingCart(state, action as ActionCartManipulation),
  };
};

export default reducer;

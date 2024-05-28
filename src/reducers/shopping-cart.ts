import {
  ActionTypes,
  ActionCartManipulation,
  AppState,
  BookId,
  CartItem,
  CartItems,
  Book,
} from "../types";

const updateCartItems = (cartItems: CartItems, item: CartItem, idx: number) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  if (idx === -1) {
    return [...cartItems, item];
  }

  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};

const updateCartItem = (book: Book, item = {}, quantity: number) => {
  // @ts-ignore
  const { id = book.id, count = 0, title = book.title, total = 0 } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price,
  };
};

const updateOrder = (state: AppState, bookId: BookId, quantity: number) => {
  const {
    bookList: { books },
    shoppingCart: { cartItems, orderTotal },
  } = state;

  const book = books.find(({ id }) => id === bookId) as Book;
  const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quantity);
  return {
    orderTotal: orderTotal + quantity * book.price,
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
  };
};

const updateShoppingCart = (
  state: AppState,
  action: ActionCartManipulation
) => {
  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0,
    };
  }

  switch (action.type) {
    case ActionTypes.BOOK_ADDED_TO_CART:
      return updateOrder(state, action.payload, 1);

    case ActionTypes.BOOK_REMOVED_FROM_CART:
      return updateOrder(state, action.payload, -1);

    case ActionTypes.ALL_BOOKS_REMOVED_FROM_CART:
      const item = state.shoppingCart.cartItems.find(
        ({ id }) => id === action.payload
      ) as CartItem;
      return updateOrder(state, action.payload, -item.count);

    default:
      return state.shoppingCart;
  }
};

export default updateShoppingCart;

import { createStore, applyMiddleware, Middleware, Reducer } from "redux";
import thunkMiddleware, {
  ThunkAction,
  ThunkDispatch,
  ThunkMiddleware,
} from "redux-thunk";
import { AppState, Actions, DispatchType, ActionTypes } from "./types";

import reducer from "./reducers";

// https://stackoverflow.com/questions/66920571/how-to-type-redux-thunk-with-middleware-in-typescript
const logMiddleware: Middleware<{}, AppState> = ({ getState }) => (
  next: DispatchType
) => (action: Actions) => {
  console.log(action.type, getState());
  return next(action);
};

const stringMiddleware = () => (next: DispatchType) => (action: Actions) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }

  return next(action);
};

// https://stackoverflow.com/questions/64857870/how-to-dispatch-thunkaction-with-redux-thunk-and-typescript
const store = createStore(
  // https://redux.js.org/api/createstore
  reducer as Reducer<AppState, Actions>,
  applyMiddleware(
    //  https://stackoverflow.com/questions/64857870/how-to-dispatch-thunkaction-with-redux-thunk-and-typescript
    thunkMiddleware as ThunkMiddleware<AppState, Actions, any>,
    stringMiddleware,
    logMiddleware
  )
);

export const delayedActionCreator = (
  timeout: number
): ThunkAction<void, AppState, unknown, Actions> => (dispatch) => {
  setTimeout(
    () =>
      dispatch({
        type: ActionTypes["DELAYED_ACTION"],
      }),
    timeout
  );
};
// https://stackoverflow.com/questions/64857870/how-to-dispatch-thunkaction-with-redux-thunk-and-typescript
(store.dispatch as ThunkDispatch<AppState, unknown, Actions>)(
  delayedActionCreator(3000)
);

export default store;

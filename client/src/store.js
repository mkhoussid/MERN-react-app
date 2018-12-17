import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //we dont have to put index.js because its called index.js

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === "production"
      ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()) ||
          compose
      : compose
  )
); //spread operator '...'

export default store;

// // ----------------------------------------------------------------------------

// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState = {};
// const composeEnhancers =
//   process.env.NODE_ENV === "production"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//     : compose;

// export default () => {
//   const store = createStore(
//     combineReducers({
//       rootReducer,
//       initialState
//     }),
//     composeEnhancers(applyMiddleware(thunk))  z
//   );

//   return store;
// };

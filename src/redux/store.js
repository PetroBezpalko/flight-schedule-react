import { createStore } from "redux";
import { flightReducer } from "./reducers/flightReducer";

const initialState = {
  flights: [],
  way: "departure",
  isFetched: false,
  error: false,
  errorMessage: "",
  toggleFetching: false,
};

const store = createStore(
  flightReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

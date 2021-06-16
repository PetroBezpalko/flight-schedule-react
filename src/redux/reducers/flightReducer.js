import { ActionTypes } from "../constants/actionTypes";

export const flightReducer = (state, { type, payload }) => {
  switch (type) {
    case ActionTypes.FLIGHTS:
      return { ...state, flights: payload, isFetched: true, error: false };
    case ActionTypes.WAY:
      return {
        ...state,
        flights: [],
        way: payload,
        toggleFetching: !state.toggleFetching,
        isFetched: false,
        error: false,
      };
    case ActionTypes.TRIGGER_FETCHING:
      return {
        ...state,
        flights: [],
        toggleFetching: !state.toggleFetching,
        isFetched: false,
        error: false,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        flights: [],
        isFetched: true,
        error: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

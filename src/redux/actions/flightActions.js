import { ActionTypes } from "../constants/actionTypes";

export const receivedFlights = (flights) => {
  return {
    type: ActionTypes.FLIGHTS,
    payload: flights,
  };
};

export const toggleWay = (way) => {
  return {
    type: ActionTypes.WAY,
    payload: way,
  };
};

export const triggerFetching = () => {
  return {
    type: ActionTypes.TRIGGER_FETCHING,
  };
};

export const errorHappened = (err) => {
  return {
    type: ActionTypes.ERROR,
    payload: err,
  };
};

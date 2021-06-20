import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./search.css";
import {
  receivedFlights,
  triggerFetching,
  errorHappened,
} from "../../redux/actions/flightActions";

function Search() {
  const [inputVal, setInputVal] = useState("");
  const inputValModified = inputVal.replaceAll(" ", "").toLowerCase();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const toFrom = state.way === "departure" ? "To" : "From";
  const howMuchToSlice = inputValModified.length === 1 ? 1 : 2;

  function currentFormatedDate() {
    const dateObj = new Date();
    let day = dateObj.getUTCDate();
    let month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return day + "-" + month + "-" + year;
  }

  function handleInputChange(e) {
    setInputVal(e.target.value);
  }

  function handleSearchClick() {
    dispatch(triggerFetching());
  }

  // The function customFilter below is used to return flights that match the data typed by user.
  function customFilter(flight) {
    // If inputVal is true it means that the user typed some data and we need to filter our flights in accordance.
    if (inputVal) {
      return (
        // Here we compare the data typed by the user with the city name of the flight.
        // If the condition below is true, we return the flight.
        inputValModified ===
          flight[`airport${toFrom}ID.city`]
            .toLowerCase()
            .slice(0, inputValModified.length) ||
        // Otherwise, we check the data typed by the user with the flight number. And to be returned,
        // the flight must meet two of the following criteria.
        // First, we check if the first or the first and the second characters of the data typed by the user
        // is equal to the carrierID of the flight. If the condition is met, we continue to the second step.
        (inputValModified.slice(0, howMuchToSlice) ===
          flight["carrierID.IATA"].toLowerCase().slice(0, howMuchToSlice) &&
          // The second step checks if the data that follows the carrierID is equal to the flight number.
          // If the two of the last criteria are met, we return the flight.
          inputValModified.slice(2) ===
            flight.fltNo.slice(0, inputValModified.slice(2).length))
      );
    } else {
      return flight;
    }
  }

  function fetchData() {
    axios
      .get(`https://api.iev.aero/api/flights/${currentFormatedDate()}`)
      .then((res) => {
        dispatch(
          receivedFlights(
            res.data.body[state.way].filter((flight) => {
              return customFilter(flight);
            })
          )
        );
      })
      .catch((err) => {
        dispatch(errorHappened(err));
        console.log("Error:", err);
      });
  }

  useEffect(() => {
    fetchData();
  }, [state.toggleFetching, inputVal]);

  return (
    <div className="form-wrapper">
      <div className="input-group mb-3">
        <i className="fas fa-search fa-1.5x"></i>
        <input
          id="search"
          type="text"
          value={inputVal}
          className="form-control"
          placeholder="Номер рейсу або місто"
          onChange={handleInputChange}
        />
        <button
          id="button"
          className="btn btn-primary"
          type="button"
          onClick={handleSearchClick}
        >
          Пошук
        </button>
      </div>
    </div>
  );
}

export default Search;

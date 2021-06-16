import React from "react";
import "./row.css";

function Row({ time, direction, flight, company, status, message }) {
  if (message) {
    return <h5>{message}</h5>;
  } else {
    return (
      <tr>
        <td>{time}</td>
        <td>{direction}</td>
        <td>{flight}</td>
        <td>{company}</td>
        <td>{status}</td>
      </tr>
    );
  }
}

export default Row;

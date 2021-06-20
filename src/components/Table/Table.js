import React from "react";
import "./table.css";
import { Row } from "../";
import { useSelector } from "react-redux";

function Table() {
  const data = useSelector((state) => state);
  const way = data.way === "departure" ? "To" : "From";
  const flightTime =
    data.way === "departure" ? "timeDepShedule" : "timeToStand";
  const category = data.way === "departure" ? "'ВІДПРАВЛЕННЯ'" : "'ПРИБУТТЯ'";

  // "display"(the function below) is the function that returns either a table with a list of flights or a message.
  // The way it works:
  // - checks if there are any flights in the state/data,
  //    if the array of flights is not empty then it returns the table
  //    (which is passed to the function as an argument) with the list of flights;
  // - otherwise, checks if data was fetched and there is no error, if both criteria are true then returns responsible message.
  // - otherwise, checks if there was an error, if true, then display the error;
  // - otherwise, it means that the data is being fetched, and therefore the program displays "Loading..." message.
  const display = (table) => {
    if (data.flights.length > 0) {
      return table;
    } else if (data.isFetched && !data.error) {
      return (
        <Row
          message={`Рейсів за вказаними даними у категорії ${category} немає.`}
        />
      );
    } else if (data.error) {
      return (
        <Row
          message={`Сталась помилка. Будь ласка, спробуйте пізніше. ${data.errorMessage}`}
        />
      );
    } else {
      return <Row message={"Loading..."} />;
    }
  };

  function formatTime(actual) {
    let date = new Date(actual);
    /* date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);  */
    date.setTime(date.getTime());
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes}`;
  }

  function formatStatus(status) {
    switch (status) {
      case "LN":
        return "Прибув";
      case "ON":
        return "Вчасно";
      case "DP":
        return "Вилетів";
      case "CK":
        return "Реєстрація";
      case "FR":
        return "В польоті";
      case "GC":
        return "Посадка";
      default:
        return status;
    }
  }

  return display(
    <table>
      <thead>
        <tr>
          <th>ЧАС</th>
          <th>НАПРЯМОК</th>
          <th>РЕЙС</th>
          <th>КОМПАНІЯ</th>
          <th>СТАТУС</th>
        </tr>
      </thead>
      <tbody>
        {data.flights.map((flight) => {
          const {
            ID,
            [flightTime]: actual,
            [`airport${way}ID.city`]: city,
            [`airport${way}ID.IATA`]: directionAbbriviation,
            "carrierID.IATA": carrierID,
            fltNo,
            airline: {
              en: { name: company },
            },
            status,
          } = flight;

          const formatedTime = formatTime(actual);
          const formatedStatus = formatStatus(status);

          return (
            <Row
              key={ID}
              time={formatedTime}
              direction={`${city} (${directionAbbriviation})`}
              flight={`${carrierID} ${fltNo}`}
              company={company}
              status={formatedStatus}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;

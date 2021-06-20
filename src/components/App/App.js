import React from "react";
import "./app.css";
import img1 from "../../images/airplane.jpg";
import { Search, Options, Table, Footer } from "../";

function App() {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <img className="airplane-img" src={img1} alt="airplane.jpg" />
        <h1 className="heading">Розклад аеропорт “Київ”</h1>
        <div className="container">
          <Search />
          <Options />
          <Table />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;

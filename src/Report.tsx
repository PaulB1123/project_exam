import React, { useState, useContext } from "react";
import "./App.css";
import "./Componets/Styles/global.css";
import Navigation from "./Componets/Navigation/Navigation";
import Header from "./Componets/Header/Header";
import FilterComponent from "./Componets/Filters/Filter";
import Dashboard from "./Componets/Dashboard/Dashboard";
import useLocalStorage from "use-local-storage";
import { useParams, useLocation } from "react-router-dom";
import ClientContext from "./Data/ClientContext";

function Report() {
  const params = useParams();
  const location = useLocation();
  console.log(params);
  console.log(location);

  const { clientData } = useContext(ClientContext);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  console.log(clientData);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="Main_App" data-theme={theme}>
      <Navigation></Navigation>
      <div className="Right_Side_Dashboard">
        <Header></Header>
        <div>
          <FilterComponent></FilterComponent>
          <Dashboard></Dashboard>
          <div className="dark_mode" onClick={switchTheme}>
            <ul>{theme === "light" ? "Dark" : "Light"} Mode</ul>
            <div className="dark_mode_icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;

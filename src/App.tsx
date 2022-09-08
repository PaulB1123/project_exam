import React, { useState } from "react";
import "./App.css";
import "./Componets/Styles/global.css";
import Navigation from "./Componets/Navigation/Navigation";
import Header from "./Componets/Header/Header";
import FilterComponent from "./Componets/Filters/Filter";
import Dashboard from "./Componets/Dashboard/Dashboard";
import useLocalStorage from "use-local-storage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

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
          <DragDropContext onDragEnd={(result) => console.log(result)}>
            <FilterComponent></FilterComponent>
          </DragDropContext>
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

export default App;

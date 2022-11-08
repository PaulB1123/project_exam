import "./App.css";
import "./Componets/Styles/global.css";
import Navigation from "./Componets/Navigation/Navigation";

import Dashboard from "./Componets/Dashboard/Dashboard";
import useLocalStorage from "use-local-storage";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterContext from "./Data/FilterContext";

function Report() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const { modelId } = useParams();

  const { setSelectedModelId, getAudienceData } = useContext(FilterContext);

  useEffect(() => {
    console.log("report  set modelId", modelId);
    setSelectedModelId(modelId);
  }, [modelId, setSelectedModelId]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // console.log(modelId);
  useEffect(() => {
    console.log(modelId);
    getAudienceData(modelId as string);
  }, [modelId]);

  return (
    <div className="Main_App" data-theme={theme}>
      <Navigation></Navigation>
      <div className="Right_Side_Dashboard">
        <div>
          {/* <FilterComponent></FilterComponent> */}
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

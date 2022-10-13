import { ContextSelectorFooter } from "@patternfly/react-core";
import { useEffect } from "react";
import "../Styles/global.css";
import "./Dashboard.css";
import HeroDashboardImage from "./icons/Hero_Image.svg";
import { useGlobalModalContext } from "./Modals/GlobalModal";
import Chart from "../Charts/Charts";

export default function Dashboard() {
  const { dataForChart, slectedChart } = useGlobalModalContext();

  useEffect(() => {
    console.log(dataForChart);
    if (dataForChart != null) {
      const dashboard = document.querySelector(".Dashboard");
      dashboard?.classList.add("hidden");
    } else {
      console.log("notyet");
    }
  }, [dataForChart]);

  // console.log(slectedChart);

  return (
    <>
      <div className="Dashboard">
        <div className="dashboard_container_group">
          <h1 className="dashboard_header">You have no reports yet </h1>
          <img src={HeroDashboardImage} alt="hello"></img>
          <p>
            If you would like to create a report please select the options from
            the filer bar, after the selection please click the button generate
            report
          </p>
        </div>
      </div>
      <div className="MainDashbaord">
        <div className="ChartsArray">
          <div>
            <Chart />
            <Chart />
          </div>
          <div>
            <Chart />
            <Chart />
          </div>
          <div>
            <Chart />
            <Chart />
          </div>
          <div>
            <Chart />
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
}

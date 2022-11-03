import * as ReactDOMClient from "react-dom/client";
import { ContextSelectorFooter } from "@patternfly/react-core";
import { useState, useEffect, useContext } from "react";
import "../Styles/global.css";
import "./Dashboard.css";
import HeroDashboardImage from "./icons/Hero_Image.svg";
import { useGlobalModalContext } from "./Modals/GlobalModal";
import Charts from "../Charts/Charts";
import FilterContext from "../../Data/FilterContext";
import TemplateChart from "./../Charts/TempleteChart";

export default function Dashboard() {
  const [Charts, setCharts] = useState();
  const [ReportStatus, setReportStatus] = useState(false);
  // const { dataForChart } = useGlobalModalContext();

  const [ArrayCharts, setArrayCharts] = useState([0]);
  const { isPlusButtonOpen, ArrayDragged, selectedModelId } =
    useContext(FilterContext);

  // useEffect(() => {
  //   setTimeout(() => {
  //     ChangeReportStatus();
  //     // clearTimeout(myTimeout);
  //   }, 1000);
  // }, []);

  // function ChangeReportStatus() {
  //   setReportStatus(!ReportStatus);
  // }

  // setArrayCharts ([ ])

  function AddChart() {
    return (
      <div
        className="Plus_Icon"
        id="PluswithChart"
        onClick={() => MakeAnotherTemplate()}
      >
        <div className="PlusIcon">PlusIcon</div>
        <div> Add Chart</div>
      </div>
    );
  }

  function MakeAnotherTemplate() {
    setReportStatus(true);
    let valueOfLast = ArrayCharts.at(-1) as number;
    const test = valueOfLast + 1;

    setArrayCharts((prevState) => [...prevState, test]);
  }

  console.log(ArrayCharts);

  // useEffect(() => {
  //   console.log(ArrayCharts);
  // }, [ArrayCharts]);

  return (
    <>
      <div className="Dashboard">
        <div className="container_button">
          <AddChart />
        </div>
        <div className="template">
          <div className="MainDashbaord">
            {ReportStatus === false ? (
              <div className="ChartsArray">
                <div className="dashboard_container_group">
                  <h1 className="dashboard_header">You have no reports yet </h1>
                  <img src={HeroDashboardImage} alt="hello"></img>
                  <p>
                    If you would like to create a report please select the
                    options from the filer bar, after the selection please click
                    the button generate report
                  </p>
                </div>
              </div>
            ) : (
              <div className="Chart_dashboard">
                <div
                  className={
                    isPlusButtonOpen === true
                      ? "container_graphs"
                      : "container_graphs_space"
                  }
                >
                  {ArrayCharts.map((el: number, index) => (
                    <TemplateChart
                      el={el}
                      setArrayCharts={(e: any) => setArrayCharts(e)}
                      ArrayCharts={ArrayCharts}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// function MakeAnotherTemplate() {
//   console.log("this has been clicked");
//   const root = ReactDOMClient.createRoot(
//     document.getElementById("Chart_holder")
//   );
//   root.render(<TemplateChartDashboard />);
// }

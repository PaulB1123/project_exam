import { useState, useContext } from "react";
import "../Styles/global.css";
import "./Dashboard.css";
import HeroDashboardImage from "./icons/Hero_Image.svg";
import FilterContext from "../../Data/FilterContext";
import TemplateChart from "./../Charts/TempleteChart";
import UserContext from "../../Data/UserContext";
import ProfilePicture from "../images/profile_picture.jpg";
import SaveButton from "../Filters/icons/Save_Button.svg";
import "../Header/Header.css";
import KPI from "../Charts/KPIs";
import PlusSign from "./icons/Plus_sign.svg";

export default function Dashboard() {
  const [ReportStatus, setReportStatus] = useState(false);
  const [ArrayCharts, setArrayCharts] = useState([0]);
  const { isPlusButtonOpen } = useContext(FilterContext);
  const { user } = useContext(UserContext);

  function AddChart() {
    return (
      <button
        className="Plus_Icon"
        id="PluswithChart"
        onClick={() => MakeAnotherTemplate()}
      >
        <img src={PlusSign} alt="" />
        <div> Add Chart</div>
      </button>
    );
  }

  function MakeAnotherTemplate() {
    setReportStatus(true);
    let valueOfLast = ArrayCharts.at(-1) as number;
    const test = valueOfLast + 1;

    setArrayCharts((prevState) => [...prevState, test]);
  }

  // console.log(ArrayCharts);

  return (
    <>
      <div className="Dashboard">
        <div className="KPI_with_Dashboard">
          <div className="KPI_contianer">
            <KPI />
            <KPI />
          </div>
          <div className="header_container_group">
            <div className="header_container">
              <h1>Demographic Dashboard</h1>

              {user ? (
                <div className="profile_container">
                  <img src={ProfilePicture} alt=""></img>
                  <div className="profile_name">
                    {user?.name} {user?.family_name}
                  </div>
                </div>
              ) : (
                <div className="profile_container">
                  <div className="profile_name">User is not logged in</div>
                </div>
              )}
            </div>

            <div className="h2">Welcome to your dashboard, {user?.name}</div>
            <div className="button_Dashboard">
              <button className="Save_Dashboard">
                <span>Save Dashboard</span>
                <img src={SaveButton} alt=""></img>
              </button>
              <button className="Download_Dashboard">
                <span>Download Dashboard</span>
                <img src={SaveButton} alt=""></img>
              </button>
            </div>
          </div>
        </div>

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

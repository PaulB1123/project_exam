import { useState, useContext, useEffect } from "react";
import "../Styles/global.css";
import "./Dashboard.css";
import HeroDashboardImage from "./icons/Hero_Image.svg";
import FilterContext from "../../Data/FilterContext";
import TemplateChart from "./../Charts/TempleteChart";
import UserContext from "../../Data/UserContext";
import ProfilePicture from "../images/profile_picture.jpg";
import SaveButton from "../Filters/icons/Save_Button.svg";
import "../Header/Header.css";

import PlusSign from "./icons/Plus_sign.svg";
import KPI from "../Charts/KPIs";
import SVG from "../KPI_Audience_Coverage";
import SVG2 from "../GroupComponent";
import { useGlobalModalContext } from "./Modals/GlobalModal";
import { API } from "aws-amplify";
import { saveReport } from "../../graphql/mutations";
import {
  GetReportsQuery,
  GetReportsQueryVariables,
  getReportsResponse,
  saveReportAudienceInput,
  SaveReportMutation,
  SaveReportMutationVariables,
} from "../../API";
import { getReports } from "../../graphql/queries";

export default function Dashboard() {
  const [ReportStatus, setReportStatus] = useState(false);
  const [ArrayCharts, setArrayCharts] = useState([0]);
  const {
    isPlusButtonOpen,
    setSelectedModelId,
    selectedModelId,
    setReportsList,
    ReportsList,
  } = useContext(FilterContext);
  const { user } = useContext(UserContext);
  const { SelectionArray } = useGlobalModalContext();
  const [title, setTitle] = useState("Add your dashboard title");
  const [changetitle, setChangetitle] = useState(false);

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

  // let h1holder = document.querySelector("h1").innerText ;

  function saveDashboard() {
    console.log(SelectionArray);
    console.log(selectedModelId);
    console.log(title);
    SaveReport();

    async function SaveReport() {
      try {
        const response = (await API.graphql({
          query: saveReport,
          variables: {
            Model_id: selectedModelId,
            Report_name: title,
            Audiences: SelectionArray,
          } as SaveReportMutationVariables,
        })) as { data: SaveReportMutation };
        console.log("it went here");
        console.log(response);
        LoadDashboard();
      } catch (err) {}
    }
  }

  async function LoadDashboard() {
    try {
      const response = (await API.graphql({
        query: getReports,
        variables: {
          Model_id: selectedModelId,
        } as GetReportsQueryVariables,
      })) as { data: GetReportsQuery };
      console.log(response);

      const { data: response_data } = response;
      const { getReports: actual_list } = response_data;
      const { data, error, StatusCode }: getReportsResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
          console.log(data);
          setReportsList(data);
          // setAudience(data.Audience);
          return data;
        } else {
          console.log(error);
        }
      } else console.log(error);

      if (response != null) {
      }
    } catch (err) {}
  }

  function modifyTitle() {
    setChangetitle(true);
  }

  function saveTitle() {
    setChangetitle(false);
  }

  return (
    <>
      <div className="Dashboard">
        <div className="KPI_with_Dashboard">
          <div className="KPI_contianer">
            <SVG2 />
          </div>
          <div className="header_container_group">
            <div className="header_container">
              {changetitle === false ? (
                <h1
                  onClick={() => {
                    modifyTitle();
                  }}
                >
                  {title}
                </h1>
              ) : (
                <h1>
                  <input
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder={title}
                  ></input>
                  <button onClick={() => saveTitle()}>Save title</button>
                </h1>
              )}
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

            <div className="h2">
              Describe what is in your dashbaord {user?.name}
            </div>
            <div className="button_Dashboard">
              <button
                className="Save_Dashboard"
                onClick={() => saveDashboard()}
              >
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

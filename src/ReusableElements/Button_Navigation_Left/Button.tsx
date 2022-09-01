import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";

import { useState } from "react";
import * as React from "react";
import Doughnutchart from "../../Componets/Navigation/icons/Doughnut.svg";
import BarChart from "../../Componets/Navigation/icons/BarChart.png";
import BarsChart from "../../Componets/Navigation/icons/BarsChart.png";
import ComparationChart from "../../Componets/Navigation/icons/ComparationChart.png";
import LineChart from "../../Componets/Navigation/icons/LineChart.png";
import RadarChart from "../../Componets/Navigation/icons/RadarChart.png";
import ChartsIcon from "../../Componets/Navigation/icons/Charts.svg";
import ReportIcon from "../../Componets/Navigation/icons/Reports.svg";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";

export default function ChartsButton() {
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
        <div
          className="filterbutton"
          style={{
            backgroundColor: isActive ? "#d9d9d9" : "white",
            //   color: isActive ? "white" : "",
          }}
        >
          <div className="filterbutton_container">
            {isActive ? (
              <img src={ChartsIcon}></img>
            ) : (
              <img src={ChartsIcon}></img>
            )}
            <li>Charts</li>
          </div>
          {isActive ? (
            <img src={ArrrowupIcon}></img>
          ) : (
            <img src={ArrrowdownIcon}></img>
          )}
        </div>
      </button>
      {isOpen && (
        <div className="Dropdown">
          <div className="Dropdown_box">
            <div className="Dropdown_container">
              <img src={Doughnutchart}></img>
              <li>Successful transaction</li>
            </div>
            <div className="Dropdown_container">
              <img src={LineChart}></img>
              <li>Spend by media</li>
            </div>
            <div className="Dropdown_container">
              <img src={BarChart}></img>
              <li>Today's Mortgage Rates</li>
            </div>
            <div className="Dropdown_container">
              <img src={RadarChart}></img>
              <li>Time Management</li>
            </div>
            <div className="Dropdown_container">
              <img src={BarsChart}></img>
              <li>Invitation Requested</li>
            </div>
            <div className="Dropdown_container">
              <img src={ComparationChart}></img>
              <li>Visits</li>
            </div>
            <div className="button_with_all_graphs_container">
              {" "}
              <button className="button_with_all_graphs">See All Graphs</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ReportsButton() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);

  const handleClickReports = () => {
    setOpenReports(!isOpenReports);
    setIsActiveReports((current) => !current);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          handleClickReports();
        }}
      >
        <div
          className="filterbutton"
          style={{
            backgroundColor: isActiveReports ? "#d9d9d9" : "white",
            //   color: isActive ? "white" : "",
          }}
        >
          <div className="filterbutton_container">
            {isActiveReports ? (
              <img src={ReportIcon}></img>
            ) : (
              <img src={ReportIcon}></img>
            )}
            <li>Reports</li>
          </div>
          {isActiveReports ? (
            <img src={ArrrowupIcon}></img>
          ) : (
            <img src={ArrrowdownIcon}></img>
          )}
        </div>
        {isOpenReports && (
          <div className="Dropdown_Reports">
            <div className="Dropdown_box">
              <div className="Dropdown_container">
                <li>PDF</li>
              </div>
              <div className="Dropdown_container">
                <li>CSV</li>
              </div>
              <div className="button_with_all_graphs_container">
                <button className="button_with_all_graphs">
                  See All Reports
                </button>
              </div>
            </div>
          </div>
        )}
      </button>
    </>
  );
}

export function AudienceButton() {
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
        <div
          className="filterbuttonAudience"
          style={{ backgroundColor: isActive ? "#d9d9d9" : "white" }}
        >
          <div className="PlusIcon_container">
            <div className="PlusIcon"></div>
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="Dropdown_Audience_Main_Group">
          <div className="Dropdown_Audience">
            <div className="Dropdown_box_Audience">
              <div className="Dropdown_container">
                <img src={Doughnutchart}></img>
                <li>Successful transaction</li>
              </div>
              <div className="Dropdown_container">
                <img src={LineChart}></img>
                <li>Spend by media</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarChart}></img>
                <li>Today's Mortgage Rates</li>
              </div>
              <div className="Dropdown_container">
                <img src={RadarChart}></img>
                <li>Time Management</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarsChart}></img>
                <li>Invitation Requested</li>
              </div>
              <div className="Dropdown_container">
                <img src={ComparationChart}></img>
                <li>Visits</li>
              </div>
            </div>
            <div className="Dropdown_box_Audience">
              <div className="Dropdown_container">
                <img src={Doughnutchart}></img>
                <li>Successful transaction</li>
              </div>
              <div className="Dropdown_container">
                <img src={LineChart}></img>
                <li>Spend by media</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarChart}></img>
                <li>Today's Mortgage Rates</li>
              </div>
              <div className="Dropdown_container">
                <img src={RadarChart}></img>
                <li>Time Management</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarsChart}></img>
                <li>Invitation Requested</li>
              </div>
              <div className="Dropdown_container">
                <img src={ComparationChart}></img>
                <li>Visits</li>
              </div>
            </div>
            <div className="Dropdown_box_Audience">
              <div className="Dropdown_container">
                <img src={Doughnutchart}></img>
                <li>Successful transaction</li>
              </div>
              <div className="Dropdown_container">
                <img src={LineChart}></img>
                <li>Spend by media</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarChart}></img>
                <li>Today's Mortgage Rates</li>
              </div>
              <div className="Dropdown_container">
                <img src={RadarChart}></img>
                <li>Time Management</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarsChart}></img>
                <li>Invitation Requested</li>
              </div>
              <div className="Dropdown_container">
                <img src={ComparationChart}></img>
                <li>Visits</li>
              </div>
            </div>
            <div className="Dropdown_box_Audience">
              <div className="Dropdown_container">
                <img src={Doughnutchart}></img>
                <li>Successful transaction</li>
              </div>
              <div className="Dropdown_container">
                <img src={LineChart}></img>
                <li>Spend by media</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarChart}></img>
                <li>Today's Mortgage Rates</li>
              </div>
              <div className="Dropdown_container">
                <img src={RadarChart}></img>
                <li>Time Management</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarsChart}></img>
                <li>Invitation Requested</li>
              </div>
              <div className="Dropdown_container">
                <img src={ComparationChart}></img>
                <li>Visits</li>
              </div>
            </div>
            <div className="Dropdown_box_Audience">
              <div className="Dropdown_container">
                <img src={Doughnutchart}></img>
                <li>Successful transaction</li>
              </div>
              <div className="Dropdown_container">
                <img src={LineChart}></img>
                <li>Spend by media</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarChart}></img>
                <li>Today's Mortgage Rates</li>
              </div>
              <div className="Dropdown_container">
                <img src={RadarChart}></img>
                <li>Time Management</li>
              </div>
              <div className="Dropdown_container">
                <img src={BarsChart}></img>
                <li>Invitation Requested</li>
              </div>
              <div className="Dropdown_container">
                <img src={ComparationChart}></img>
                <li>Visits</li>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

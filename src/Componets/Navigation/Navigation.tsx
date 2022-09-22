import "../Styles/global.css";
import "./Navigation.css";
import Annalect from "./icons/Annalect.png";
// import Filter from "./icons/Filter.svg";
import ChartsIcon from "./icons/Charts.svg";
import SettingsIcon from "./icons/Settings.svg";
import LogoutIcon from "./icons/Log_Out.svg";
import ArrrowdownIcon from "./icons/ArrowDown.svg";
import useLocalStorage from "use-local-storage";
import ChartsButton from "../../ReusableElements/Button_Navigation_Left/Button";
import {
  ReportsButton,
  AudiencesButton,
} from "../../ReusableElements/Button_Navigation_Left/Button";
// import Data from "../../Data/audition_filters";
import { useContext, useState } from "react";
import * as React from "react";
import UserContext from "../../Data/UserContext";

export default function Navigation() {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <div className="naviagtion_container_group">
        <div className="hero_logo">
          <img
            src={Annalect}
            alt="Main Menu logo "
            className="hero_logo_container"
          ></img>
        </div>

        <div className="hero_main_menu_container">
          <div className="main_menu_container">
            <li className="header_main_menu">MAIN MENU</li>
            <ul>
              <div className="filterbutton_container" id="dashboardbutton">
                <div className="dashboard"></div>
                <li className="dashboardbutton_text">Dashboard</li>
              </div>
            </ul>
            <ul>
              <AudiencesButton />
            </ul>
          </div>
        </div>

        <div className="header_main_menu_container">
          <li className="header_main_menu">WORK FLOW</li>
          <ul>
            <ChartsButton />
            <ReportsButton />
          </ul>
        </div>

        <div className="header_main_menu_container">
          <li className="header_main_menu">GENERAL</li>
          <ul>
            <div className="filterbutton">
              <div className="filterbutton_container">
                <img src={SettingsIcon} alt="Logo_Charts "></img>
                <li>Settings</li>
              </div>
            </div>
          </ul>
        </div>

        <div className="download_button_container">
          <li className="download_header">PDF Report</li>
          <ul className="download_ul">
            <div className="download_paragraph">Download montly report</div>
            <div className="download_button">
              <li>Download</li>
              <div className="download_icon"></div>
            </div>
          </ul>
        </div>

        <div className="download_button_container">
          <li className="download_header">CSV Report</li>
          <ul className="download_ul">
            <div className="download_paragraph">
              Download a full report or per chart{" "}
            </div>
            <div className="download_button">
              <li>Download</li>
              <div className="download_icon"></div>
            </div>
          </ul>
        </div>

        <div className="logout_button_container">
          <div className="logout_button" onClick={logout}>
            <img src={LogoutIcon} alt="Logo_Charts "></img>
            <li>Log out</li>
          </div>
        </div>

        {/* <div className='dark_mode' onClick={switchTheme} >
        <ul >{theme === "light" ? "Dark" : "Light"} Mode</ul>
        <div class="dark_mode_icon"></div>
        </div> */}

        {/* <div className="app" data-theme={theme}>
        <button onClick={switchTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
       </div> */}
      </div>
    </>
  );
}

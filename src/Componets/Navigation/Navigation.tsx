import "../Styles/global.css";
import "./Navigation.css";
import Annalect from "./icons/Annalect.png";
import LogoutIcon from "./icons/Log_Out.svg";
import {
  ReportsButton,
  AudiencesButton,
} from "../../ReusableElements/Button_Navigation_Left/Button";
import { useContext } from "react";
import UserContext from "../../Data/UserContext";

export default function Navigation() {
  const { logout } = useContext(UserContext);

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
          </div>
        </div>

        <div className="main_menu_container">
          <li className="header_main_menu">FILTER</li>
          <ul>
            <AudiencesButton />
          </ul>
        </div>

        <div className="header_main_menu_container">
          <li className="header_main_menu">WORK FLOW</li>
          <ul>
            <ReportsButton />
          </ul>
        </div>

        <div className="logout">
          <div className="logout_button_container">
            <div className="logout_button" onClick={logout}>
              <img src={LogoutIcon} alt="Logo_Charts "></img>
              <li>Log out</li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

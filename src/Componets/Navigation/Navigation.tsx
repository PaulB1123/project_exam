import "../Styles/global.css";
import "./Navigation.css";
import "../Dashboard/Dashboard.css";
import Annalect from "./icons/Annalect.png";
import LogoutIcon from "./icons/Log_Out.svg";
import {
  DashboardsButton,
  AudiencesButton,
  AudiencesButtonOriginal,
} from "../../ReusableElements/Button_Navigation_Left/Button";
import { useContext } from "react";
import UserContext from "../../Data/UserContext";
import { useGlobalModalContext } from "../Dashboard/Modals/GlobalModal";

export default function Navigation() {
  const { logout } = useContext(UserContext);
  const { user, admin, setAdmin, accessData } = useContext(UserContext);
  const { activateDashboardFunction, setActivateDashbaordFunction } =
    useGlobalModalContext();

  function saveDashboardFunction() {
    // console.log("this is okay");
    setActivateDashbaordFunction(true);
  }

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
          <li className="header_main_menu"> FILTER </li>
          <ul>
            <AudiencesButtonOriginal />
          </ul>
        </div>

        <div className="header_main_menu_container">
          <li className="header_main_menu">WORK FLOW</li>
          <ul>
            <DashboardsButton />
          </ul>
        </div>

        {/* <div className="main_menu_container">
          <li className="header_main_menu">FILTER</li>
          <ul>
            <AudiencesButton />
          </ul>
        </div> */}

        <div className="logout">
          <div className="button_Dashboard">
            {accessData.Report === true ? (
              <button
                className="Save_Dashboard"
                onClick={() => saveDashboardFunction()}
              >
                <span>Save Dashboard</span>
                {/* <img src={SaveButton} alt=""></img> */}
              </button>
            ) : (
              <></>
            )}
            <button className="Download_Dashboard">
              <span>Download Dashboard</span>
              {/* <img src={SaveButton} alt=""></img> */}
            </button>
          </div>
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

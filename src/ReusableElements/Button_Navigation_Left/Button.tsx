import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";

import { useEffect, useState, useContext } from "react";
import * as React from "react";
import ReportIcon from "../../Componets/Navigation/icons/Reports.svg";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import Filter from "../../Componets/Navigation/icons/Filter.svg";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../../Componets/Dashboard/Modals/GlobalModal";
import FilterContext from "../../Data/FilterContext";
import DragnDrop from "./DragnDrop";
import Modal from "../../Componets/Filters/Modal";
import { Id } from "react-beautiful-dnd";
import UserContext from "../../Data/UserContext";

export function DashboardsButton() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);
  const { user, admin, setAdmin, accessData } = useContext(UserContext);
  const { ReportsList, setitemDelteReport } = useContext(FilterContext);
  const {
    setSelectionArray,
    DashboardSelectedName,
    setDashboardSelectedName,
    setDasdboardDefault,
  } = useGlobalModalContext();
  const [checkReportsList, setCheckReportsList] = useState(false);

  const [DefaultDasboard, setDefaultDasboard] = useState();
  const [DefaultDasboardID, setDefaultDasboardID] = useState("");
  const [DashboardSelectedID, setDashboardSelectedID] = useState<string>();

  const handleClickReports = () => {
    setOpenReports(!isOpenReports);
    setIsActiveReports((current) => !current);
  };

  function deleteReport(id: string) {
    // console.log(id);
    setitemDelteReport(id);
  }

  function selectReportCharts(
    Audiences: Array<any>,
    DashbaordID: string,
    Dashboard_name: string
  ) {
    // console.log(
    //   "This is chartlist:",
    //   Audiences,
    //   "This is id:",
    //   DashbaordID,
    //   "This is name:",
    //   Dashboard_name
    // );
    setDashboardSelectedID(DashbaordID);
    setSelectionArray(Audiences);
    setDashboardSelectedName(Dashboard_name);
  }

  useEffect(() => {
    // console.log(ReportsList);
    if (ReportsList !== undefined) {
      setCheckReportsList(true);
      ReportsList.map((id: any) => {
        if (id.Is_default === true) {
          setDefaultDasboard(id.Charts);
          setDefaultDasboardID(id.Dashboard_id);
          setDashboardSelectedID(id.Dashboard_id);
          setDashboardSelectedName(id.Dashboard_name);
        }
      });
    } else {
      setCheckReportsList(false);
    }
  }, [ReportsList]);

  useEffect(() => {
    // console.log(DashboardSelectedName);

    if (
      DefaultDasboard !== undefined &&
      DefaultDasboardID !== undefined &&
      DashboardSelectedName !== undefined
    ) {
      if (DefaultDasboardID === DashboardSelectedID) {
        selectReportCharts(
          DefaultDasboard,
          DefaultDasboardID,
          DashboardSelectedName
        );
      }
    }
  }, [DefaultDasboard]);

  function setDashboardDefault(DashbaordDefaultID: any) {
    // console.log(DashbaordDefaultID);
    setDasdboardDefault(DashbaordDefaultID);
    // console.log(DashboardDefault,
    //   setDasdboardDefault);
  }

  return (
    <>
      <button
        type="button"
        className="Reports_button"
        onClick={() => {
          handleClickReports();
        }}
      >
        <div
          className="filterbutton"
          style={{
            backgroundColor: isActiveReports
              ? "var(--audience-background-hover-plus)"
              : "var(--background)",
          }}
        >
          <div className="filterbutton_container">
            {isActiveReports ? (
              <img src={ReportIcon} alt=""></img>
            ) : (
              <img src={ReportIcon} alt=""></img>
            )}
            <li>Dashboards</li>
          </div>
          {isActiveReports ? (
            <img src={ArrrowupIcon} alt=""></img>
          ) : (
            <img src={ArrrowdownIcon} alt=""></img>
          )}
        </div>

        <div></div>
      </button>
      {isActiveReports && (
        <div>
          {checkReportsList === true
            ? ReportsList.map((id: any) => (
                <div
                  className={isActiveReports ? "main_container" : "hidden"}
                  key={id.Dashboard_id}
                >
                  <div
                    className="dropDown_button"
                    id={
                      DashboardSelectedID === id.Dashboard_id
                        ? "dashboard_selected"
                        : "dahsboard_notSelected"
                    }
                  >
                    <li className="audiences_saved">
                      <span
                        className="element_dashboard"
                        onClick={() =>
                          selectReportCharts(
                            id.Charts,
                            id.Dashboard_id,
                            id.Dashboard_name
                          )
                        }
                      >
                        {id.Dashboard_name}
                      </span>
                      {accessData.Report === true ? (
                        <div
                          className="PlusIcon_container"
                          id={
                            DefaultDasboardID === id.Dashboard_id
                              ? "default_icon_default"
                              : "default_icon_normal"
                          }
                          onClick={() => setDashboardDefault(id.Dashboard_id)}
                        ></div>
                      ) : (
                        <></>
                      )}

                      {accessData.Report === true ? (
                        <div
                          className="PlusIcon_container"
                          id="DeleteButton_container"
                          onClick={() => deleteReport(id.Dashboard_id)}
                        >
                          <div className="DeleteButton"></div>
                        </div>
                      ) : (
                        <div
                          className="PlusIcon_container"
                          id="user_view"
                        ></div>
                      )}
                    </li>
                  </div>
                </div>
              ))
            : console.log("checkReport is false")}

          {/* <div className="button_container">
            <button
              className="button_filter"
              id="openModalBtn"
              onClick={() => {
                // createModal();
              }}
            >
              <div>Add Blank Dashboard</div>
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}

export function AudiencesButton() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);
  const [arrayWithAudiences, setArrayWithAudiences] = useState([]) as any;
  const [checkLi, setCheckLi] = useState("");
  const { message, inputarr, loadAudienceUrl } = useGlobalModalContext();
  // const { audienceList } = useContext(FilterContext);
  const { showModal, audienceList } = useGlobalModalContext();
  const [showDraggableList, setShowDraggableList] = useState(false);
  const { user, admin, setAdmin, accessData } = useContext(UserContext);

  useEffect(() => {
    if (message !== undefined) {
      setArrayWithAudiences([message]);
    }
  }, [message]);

  const handleClickAudienceContainer = () => {
    setOpenReports(!isOpenReports);
    setIsActiveReports((current) => !current);
  };

  const handelclickAudience = (key: string) => {
    setCheckLi(key);
    loadAudienceUrl(key);
    // console.log(key);
  };

  const createModal = () => {
    showModal(MODAL_TYPES.UPDATE_MODAL, {
      title: "Create instance form",
      confirmBtn: "Save",
    });
  };

  useEffect(() => {
    // console.log(audienceList);
  }, [audienceList]);

  return (
    <>
      <button
        type="button"
        className="Reports_button"
        onClick={() => {
          handleClickAudienceContainer();
        }}
      >
        {isOpenReports ? (
          <div className="filterbutton_Open">
            <div className="filterbutton_container">
              <img src={Filter} alt="this is filter"></img>
              <li>Audiences</li>
            </div>
            {isActiveReports ? (
              <img src={ArrrowupIcon} alt=""></img>
            ) : (
              <img src={ArrrowdownIcon} alt=""></img>
            )}
          </div>
        ) : (
          <div id="dashboard_button" className="filterbutton">
            <div className="filterbutton_container">
              <img src={Filter} alt="this is filter"></img>
              <li>Audiences</li>
            </div>
            {isActiveReports ? (
              <img src={ArrrowupIcon} alt=""></img>
            ) : (
              <img src={ArrrowdownIcon} alt=""></img>
            )}
          </div>
        )}
      </button>
      {isOpenReports && (
        <div className="Opened_Audience_button">
          <div className="Dropdown_container_drag_and_drop">
            {audienceList.map((i: any) => {
              return (
                <li
                  key={i.Audience_id}
                  onClick={() => handelclickAudience(i.Audience_id)}
                  className="audiences_saved"
                >
                  <DragnDrop
                    name={i.Audience_name}
                    id={i.Audience_id}
                  ></DragnDrop>
                </li>
              );
            })}

            {accessData.Audience === true ? (
              <div className="button_container">
                <button
                  className="button_filter"
                  id="openModalBtn"
                  onClick={() => {
                    createModal();
                  }}
                >
                  <div>Add Audience</div>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}

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

export function ReportsButton() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);
  const { ReportsList, setitemDelteReport } = useContext(FilterContext);
  const { setSelectionArray } = useGlobalModalContext();
  const [checkReportsList, setCheckReportsList] = useState(false);

  const handleClickReports = () => {
    setOpenReports(!isOpenReports);
    setIsActiveReports((current) => !current);
  };

  function deleteReport(id: string) {
    console.log(id);
    setitemDelteReport(id);
  }

  function selectReportCharts(Audiences: Array<any>) {
    console.log(Audiences);
    setSelectionArray(Audiences);
  }

  useEffect(() => {
    console.log(ReportsList);
    if (ReportsList !== undefined) {
      setCheckReportsList(true);
    } else {
      setCheckReportsList(false);
    }
  }, [ReportsList]);

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
      {isActiveReports &&
        (checkReportsList === true
          ? ReportsList.map((id: any) => (
              <div className={isActiveReports ? "main_container" : "hidden"}>
                <div className="dropDown_button">
                  <li className="audiences_saved">
                    <span
                      className="element_dashboard"
                      onClick={() => selectReportCharts(id.Audiences)}
                    >
                      {id.Report_name}
                    </span>
                    <div
                      className="PlusIcon_container"
                      onClick={() => deleteReport(id.Report_id)}
                    >
                      <div className="DeleteButton"></div>
                    </div>
                  </li>
                </div>
              </div>
            ))
          : console.log("checkReport is false"))}
    </>
  );
}

export function AudiencesButton() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);
  const [arrayWithAudiences, setArrayWithAudiences] = useState([]) as any;
  const [checkLi, setCheckLi] = useState("");
  const { message, inputarr, loadAudienceUrl, deleteItemAudience } =
    useGlobalModalContext();
  const { audienceId } = useContext(FilterContext);
  const [openModal, setOpenModal] = React.useState(false);
  const { showModal } = useGlobalModalContext();
  const [showDraggableList, setShowDraggableList] = useState(false);

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
  };

  const createModal = () => {
    showModal(MODAL_TYPES.CREATE_MODAL, {
      title: "Create instance form",
      confirmBtn: "Save",
    });
  };

  const deleteModal = () => {
    showModal(MODAL_TYPES.DELETE_MODAL);
  };

  const showDragAndDrop = () => {
    setShowDraggableList(!showDraggableList);
  };

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
            {audienceId.map((i: any) => {
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

            {openModal && (
              <Modal
                setOpenModal={(openModal: boolean) => {
                  setOpenModal(openModal);
                }}
              ></Modal>
            )}
          </div>
        </div>
      )}
    </>
  );
}

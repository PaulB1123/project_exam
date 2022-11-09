import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";

import { useEffect, useState, useContext } from "react";
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
import Filter from "../../Componets/Navigation/icons/Filter.svg";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../../Componets/Dashboard/Modals/GlobalModal";
import FilterContext from "../../Data/FilterContext";
import TrashIcon from "../../Componets/Navigation/icons/Trash.svg";
import FilterComponent from "../../Componets/Filters/Filter";
import DragnDrop from "./DragnDrop";
import Modal from "../../Componets/Filters/Modal";
import AudienceDownAudience from "../../Componets/Navigation/icons/ArrowDownAudience.svg";

// import { AuditionFilter } from "../../Data/audition_filters";

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
            backgroundColor: isActive
              ? "var(--audience-background-hover-plus)"
              : "var(--background)",
            //   color: isActive ? "white" : "",
          }}
        >
          <div className="filterbutton_container">
            {isActive ? (
              <img src={ChartsIcon} alt=""></img>
            ) : (
              <img src={ChartsIcon} alt=""></img>
            )}
            <li>Charts</li>
          </div>
          {isActive ? (
            <img src={ArrrowupIcon} alt=""></img>
          ) : (
            <img src={ArrrowdownIcon} alt=""></img>
          )}
        </div>
      </button>
      {isOpen && (
        <div className="Dropdown">
          <div className="Dropdown_box">
            <div className="Dropdown_container">
              <img src={Doughnutchart} alt=""></img>
              <li>Successful transaction</li>
            </div>
            <div className="Dropdown_container">
              <img src={LineChart} alt=""></img>
              <li>Spend by media</li>
            </div>
            <div className="Dropdown_container">
              <img src={BarChart} alt=""></img>
              <li>Today's Mortgage Rates</li>
            </div>
            <div className="Dropdown_container">
              <img src={RadarChart} alt=""></img>
              <li>Time Management</li>
            </div>
            <div className="Dropdown_container">
              <img src={BarsChart} alt=""></img>
              <li>Invitation Requested</li>
            </div>
            <div className="Dropdown_container">
              <img src={ComparationChart} alt=""></img>
              <li>Visits</li>
            </div>
            <div className="button_with_all_graphs_container">
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
            //   color: isActive ? "white" : "",
          }}
        >
          <div className="filterbutton_container">
            {isActiveReports ? (
              <img src={ReportIcon} alt=""></img>
            ) : (
              <img src={ReportIcon} alt=""></img>
            )}
            <li>Reports</li>
          </div>
          {isActiveReports ? (
            <img src={ArrrowupIcon} alt=""></img>
          ) : (
            <img src={ArrrowdownIcon} alt=""></img>
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
          <div className="filterbutton">
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
                  // setOpenModal(true);
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

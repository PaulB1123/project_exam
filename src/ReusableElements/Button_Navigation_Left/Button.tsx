import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";

import { useState, useRef } from "react";
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

export function AudiencesButton() {
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
        <div className="filterbutton">
          <div className="filterbutton_container">
            <img src={Filter} alt="this is filter"></img>
            <li>Audiences</li>
          </div>
          {isActiveReports ? (
            <img src={ArrrowupIcon}></img>
          ) : (
            <img src={ArrrowdownIcon}></img>
          )}
        </div>
      </button>
      {isOpenReports && (
        <div>
          <div>
            <div className="Dropdown_container" id="Dropdown_container">
              <li>An audience filter</li>
            </div>
            <div className="Dropdown_container" id="Dropdown_container">
              <li>Another audience filter</li>
            </div>
            {/* <button className="button_with_all_graphs">Select filter</button> */}
          </div>
        </div>
      )}
    </>
  );
}

// export function AudienceButton(props: any) {
//   const [isOpen, setOpen] = React.useState(false);
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     setOpen(!isOpen);
//     setIsActive((current) => !current);
//   };

//   const changeStatus = () => {};

//   const dragItem = useRef<any>(null);
//   const dragOverItem = useRef<any>(null);
//   const [list, setList] = useState<Array<any>>(AuditionFilter);

//   const dragStart = (e: any, position: any) => {
//     console.log(dragItem);

//     dragItem.current = position;
//     // console.log(e.target.innerHTML);
//   };

//   const dragEnter = (e: any, position: any) => {
//     dragOverItem.current = position;
//     //console.log(e.target.innerHTML);
//   };

//   const drop = (e: any) => {
//     const copyListItems = [...list];
//     const dragItemContent = copyListItems[dragItem.current];
//     console.log(dragItemContent);
//     copyListItems.splice(dragItem.current, 1);
//     copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//     dragItem.current = null;
//     dragOverItem.current = null;
//     setList(copyListItems);
//     console.log(list);
//   };

//   return (
//     <div className="ContainerFile_filter">
//       <div className="container_audience">
//         <button
//           type="button"
//           className="buttonaudience"
//           onClick={() => {
//             handleClick();
//           }}
//         >
//           <div
//             className="filterbuttonAudience"
//             style={{ backgroundColor: isActive ? "#d9d9d9" : "white" }}
//           >
//             <div className="PlusIcon_container">
//               <div className="PlusIcon"></div>
//             </div>
//           </div>
//         </button>

//         {/* {isOpen && (
//           <div className="Dropdown_Audience_Main_Group">
//             <div className="Dropdown_Audience">
//               <div className="Dropdown_box_Audience">
//                 {list.map((filter, index) => (
//                   <div
//                     className="Dropdown_container"
//                     onDragStart={(e) => dragStart(e, index)}
//                     onDragEnter={(e) => dragEnter(e, index)}
//                     onDragEnd={drop}
//                     key={index}
//                     draggable
//                   >
//                     <div className="Dropdown_filter_container">
//                       <img src={filter.logo}></img>
//                       <li>{filter.description}</li>
//                     </div>
//                     <div className="Dropdown_plus_sign_container">
//                       <button
//                         onClick={() => {
//                           changeStatus();
//                         }}
//                       >
//                         <img
//                           className="Dropdown_plus_sign"
//                           src={filter.add}
//                         ></img>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )} */}

//         {isOpen && (
//           <div className="Dropdown_Audience_Main_Group">
//             <div className="Dropdown_Audience">
//               <div className="Dropdown_box_Audience">
//                 {list.map((filter) => (
//                   <div className="Dropdown_container">
//                     <div className="Dropdown_filter_container">
//                       <img src={filter.logo}></img>
//                       <li>{filter.description}</li>
//                     </div>
//                     <div className="Dropdown_plus_sign_container">
//                       <button
//                         onClick={() => {
//                           changeStatus();
//                         }}
//                       >
//                         <img
//                           className="Dropdown_plus_sign"
//                           src={filter.add}
//                         ></img>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="filter_droppable_container">
//           <ul></ul>
//         </div>
//       </div>
//     </div>
//   );
// }

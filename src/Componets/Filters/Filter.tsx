import "../Styles/global.css";
import "./Filter.css";
import SaveIcon from "./icons/Save.svg";
import DragnDrop from "../../ReusableElements/Button_Navigation_Left/DragnDrop";
import Modal from "./Modal";
import { useState, useContext } from "react";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../Dashboard/Modals/GlobalModal";
import { DeleteModal } from "../Dashboard/Modals/SelectChart";

export default function FilterComponent() {
  // const [openModal, setOpenModal] = useState(false);
  // const { showModal } = useGlobalModalContext();

  // const createModal = () => {
  //   showModal(MODAL_TYPES.CREATE_MODAL, {
  //     title: "Create instance form",
  //     confirmBtn: "Save",
  //   });
  // };

  // const deleteModal = () => {
  //   showModal(MODAL_TYPES.DELETE_MODAL);
  // };

  return (
    <>
      {/* <div className="filter_container_group">
        <div className="filter_container">
          <h1 className="filter_header">Audience</h1>
        </div>
        <div className="audience_container_with_buttons_and_filter">
          <div className="filter_button_group">
            <div className="button_audience">
              <div className="audience_droppable_container">
                <DragNDrop></DragNDrop>
              </div>
            </div>
          </div>
          <div className="buttons_for_audience">
            <div className="buttons_reports">
              <button
                className="button_filter"
                id="openModalBtn"
                onClick={() => {
                  // setOpenModal(true);
                  createModal();
                }}
              >
                <img src={SaveIcon} alt="Icon"></img>
                <div>Save filter options</div>
              </button>
              {openModal && (
                <Modal
                  setOpenModal={(openModal: boolean) => {
                    setOpenModal(openModal);
                  }}
                ></Modal>
              )}
              <button
                className="button_report"
                onClick={() => {
               
                  deleteModal();
                  // createModalReport();
                }}
              >
                <div>Generate Report</div>
              </button>

              <div></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <DragNDrop></DragNDrop> */}
      {/* <div className="filter_button_group">
        <div className="button_audience">
          <div className="audience_droppable_container">
            <DragNDrop></DragNDrop>
          </div>
        </div>
      </div> */}
    </>
  );
}

//   <div className="filter_container_group">
// <div className="filter_container">
//   <h1 className="filter_header">Audience</h1>
// </div>
// <div className="audience_container_with_buttons_and_filter">
//   <div className="filter_button_group">
//     <div className="button_audience">
//       <div className="audience_droppable_container">
//         <DragNDrop></DragNDrop>
//       </div>
//     </div>
//   </div>
//   <div className="buttons_for_audience">
//     <div className="buttons_reports">
//       <button
//         className="button_filter"
//         id="openModalBtn"
//         onClick={() => {
//           // setOpenModal(true);
//           createModal();
//         }}
//       >
//         <img src={SaveIcon} alt="Icon"></img>
//         <div>Save filter options</div>
//       </button>
//       {openModal && (
//         <Modal
//           setOpenModal={(openModal: boolean) => {
//             setOpenModal(openModal);
//           }}
//         ></Modal>
//       )}
//       <button
//         className="button_report"
//         onClick={() => {
//
//           deleteModal();
//           // createModalReport();
//         }}
//       >
//         <div>Generate Report</div>
//       </button>

//       <div></div>
//     </div>
//   </div>
// </div>
// </div>

// const createModalReport = () => {
//   showModal(MODAL_TYPES.DELETE_MODAL, {
//     title: "Create instance form",
//     confirmBtn: "Save",
//   });
// };

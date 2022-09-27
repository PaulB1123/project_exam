import "../Styles/global.css";
import "./Filter.css";
import SaveIcon from "./icons/Save.svg";
// import { AudienceButton } from "../../ReusableElements/Button_Navigation_Left/Button";
import DragNDrop from "../../ReusableElements/Button_Navigation_Left/DragnDrop";
import Data2 from "../../Data/audition_filters";
import Modal from "./Modal";
import { useState } from "react";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../Dashboard/Modals/GlobalModal";
import { Button, ButtonVariant } from "@patternfly/react-core";
// import { closeModal } from "./Modal";
// import FilterContext from "../../Data/FilterContext";
// import { useContext } from "react";
// import FetchdataFilter from "../../FetchingData/FetchFiltersAuditionData";

// type closeModal = {
//   setOpenModal: any;
// };

export default function FilterComponent() {
  // const { Data } = useContext(FilterContext);

  // console.log(Data);
  console.log(Data2);

  const [openModal, setOpenModal] = useState(false);
  const { showModal } = useGlobalModalContext();

  const createModal = () => {
    showModal(MODAL_TYPES.CREATE_MODAL, {
      title: "Create instance form",
      confirmBtn: "Save",
    });
  };

  const deleteModal = () => {
    showModal(MODAL_TYPES.DELETE_MODAL);
  };

  const updateModal = () => {
    showModal(MODAL_TYPES.UPDATE_MODAL);
  };

  return (
    <>
      <div className="filter_container_group">
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
              <div className="button_report">Generate Report</div>
              <div>
                {/* <Button variant={ButtonVariant.primary} onClick={createModal}>
                  Create Modal
                </Button> */}

                {/* <Button variant={ButtonVariant.primary} onClick={deleteModal}>
                  Delete Modal
                </Button>
          
                <Button variant={ButtonVariant.primary} onClick={updateModal}>
                  Update Modal
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

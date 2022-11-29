import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";
import "../../Filters/Modal.css";
import "../../Filters/MakeDefaultDashbaordModal.css";
import { useContext, useEffect } from "react";
import FilterContext from "../../../Data/FilterContext";
import { API } from "aws-amplify";
import { addDefaultDashboard } from "../../../graphql/mutations";
import { AddDefaultDashboardMutationVariables } from "../../../API";

export const MakeDefaultDashbaordModal = (modalProps: any) => {
  const {
    hideModal,
    handleChange,
    name,
    setName,
    makeDashboardDefault,
    setMakeDashboardDefault,
    DashboardDefault,
    DashboardTitle,
    setDashboardID,
    DashboardID,
    setDashboardTitle,
  } = useGlobalModalContext();
  const { selectedModelId, ArrayDragged } = useContext(FilterContext);

  const handleModalToggle = () => {
    hideModal();
  };

  if (modalProps !== undefined) {
    setDashboardTitle(modalProps.modalProps.title);
    setDashboardID(modalProps.modalProps.DashboardId);
  }

  function UntityFunction(DashboardID: string) {
    setMakeDashboardDefault(true);

    handleModalToggle();
  }

  //   function updateName(val: any) {
  //     setName(val.target.value);
  //   }

  return (
    <Modal
      variant={ModalVariant.medium}
      isOpen={true}
      onClose={handleModalToggle}
      actions={[]}
      className="modalContainer"
    >
      <div>
        <div className="Exist_Module" onClick={handleModalToggle}>
          <img src={XIcon} alt="" />
        </div>

        <div className="Header_Modal">
          <h3>
            Make <b>{DashboardTitle}</b> your default Dashboard ?
          </h3>
        </div>

        <div className="Buttons_Modal_Saving">
          <Button
            key="confirm"
            variant="primary"
            onClick={() => UntityFunction(DashboardID as string)}
            className="Contiune"
          >
            Yes
          </Button>
          <Button
            key="cancel"
            variant="link"
            onClick={handleModalToggle}
            className="Cancel"
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

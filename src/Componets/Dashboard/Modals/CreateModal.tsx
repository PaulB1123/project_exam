import React from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { MODAL_TYPES, useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";

import "../../Filters/Modal.css";

export const CreateModal = () => {
  const { showModal, hideModal, store } = useGlobalModalContext();

  const { modalProps } = store || {};

  const handleModalToggle = () => {
    hideModal();
  };

  const updateModal = () => {
    showModal(MODAL_TYPES.UPDATE_MODAL);
  };

  return (
    <div className="">
      <Modal
        // variant={ModalVariant.medium}
        isOpen={true}
        // onClose={handleModalToggle}
        className="modalContainer"
      >
        <div className="Exist_Module" onClick={handleModalToggle}>
          <img src={XIcon} alt="" />
        </div>

        <div className="Header_Modal">
          <h3>Would you like to save the audice?</h3>
        </div>

        <div className="Buttons_Modal">
          <Button
            key="confirm"
            variant="primary"
            onClick={updateModal}
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
            Later
          </Button>
        </div>
      </Modal>
    </div>
  );
};

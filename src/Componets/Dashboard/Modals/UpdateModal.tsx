// import React, { useRef, useState } from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";
import "../../Filters/Modal.css";

export const UpdateModal = () => {
  const { hideModal, message, handleChange } = useGlobalModalContext();
  //   const [message, setMessage] = useState("");

  const handleModalToggle = () => {
    hideModal();
  };

  //   const inputRef = useRef("" as any);

  function UntityFucntion() {
    handleModalToggle();

    // handleChange();
  }

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
          <h3>Would you like to save the audice?</h3>
        </div>

        <div className="Input_Modal">
          <input
            type="text"
            id="audience_message"
            name="audience_message"
            placeholder="Audience Name"
            onChange={handleChange}
            value={message}
            required
          ></input>
        </div>

        <div className="Buttons_Modal_Saving">
          {/* <Button
            key="cancel"
            variant="link"
            onClick={handleModalToggle}
            className="Cancel"
          >
            Cancel
          </Button> */}

          <Button
            key="confirm"
            variant="primary"
            onClick={UntityFucntion}
            className="Contiune"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

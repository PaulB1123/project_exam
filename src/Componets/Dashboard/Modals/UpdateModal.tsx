import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";
import "../../Filters/Modal.css";
import { useContext } from "react";
import FilterContext from "../../../Data/FilterContext";

export const UpdateModal = () => {
  const { hideModal, handleChange, name, setName } = useGlobalModalContext();
  const { selectedModelId, ArrayDragged } = useContext(FilterContext);

  const handleModalToggle = () => {
    hideModal();
  };

  function UntityFunction(e: any) {
    handleChange(name as string);
    handleModalToggle();
  }

  function updateName(val: any) {
    setName(val.target.value);
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
          <h3>What would be your audience name ? </h3>
        </div>

        <div className="Input_Modal">
          <input
            type="text"
            name="name"
            placeholder="Audience Name"
            onChange={updateName}
            // value={message.name}
            required
          ></input>
        </div>

        <div className="Buttons_Modal_Saving">
          <Button
            key="confirm"
            variant="primary"
            onClick={(e) => UntityFunction(e)}
            className="Contiune"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

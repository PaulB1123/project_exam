import { useContext, useEffect, useState } from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";

import "../../Filters/Modal.css";
import FilterContext from "../../../Data/FilterContext";

export const DeleteModal = () => {
  const { hideModal } = useGlobalModalContext();
  const { data, categorical } = useContext(FilterContext);
  const [selectedAudition, setSelectedAudition] = useState("");

  const handleModalToggle = () => {
    hideModal();
  };

  useEffect(() => {
    categorical.length > 0
      ? setSelectedAudition(categorical[0].id)
      : setSelectedAudition("");
  }, [categorical]);

  console.log(selectedAudition);

  return (
    <div className="">
      <Modal
        title=" "
        variant={ModalVariant.medium}
        isOpen={true}
        onClose={handleModalToggle}
        className="modalContainer"
      >
        <div className="Exist_Module" onClick={handleModalToggle}>
          <img src={XIcon} alt="" />
        </div>

        <div className="Header_Modal" id="Header_Modal_GenerateReport">
          <h3>Choose the Audience </h3>
          {/* <Button onClick={triggerFunction}>This is button</Button> */}
          <select
            value={selectedAudition}
            onChange={(event) => setSelectedAudition(event.target.value)}
          >
            {categorical.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.selector}
              </option>
            ))}
          </select>
        </div>

        <div className="Header_Modal" id="Header_Modal_GenerateReport">
          <h3>Choose what type of graphs would you like to be displayed </h3>
          <div>
            <Button>This is a chart</Button>
            <Button>This is anther chart</Button>
          </div>
        </div>

        <div className="Buttons_Modal">
          <Button
            key="confirm"
            variant="primary"
            onClick={handleModalToggle}
            className="Contiune"
          >
            Confirm
          </Button>
          <Button
            key="cancel"
            variant="link"
            onClick={handleModalToggle}
            className="Cancel"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

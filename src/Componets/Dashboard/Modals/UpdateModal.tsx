// import React, { useRef, useState } from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";
import "../../Filters/Modal.css";
import { useContext, useState } from "react";
import { API } from "aws-amplify";
import { saveAudience } from "../../../graphql/mutations";
import { SaveAudienceMutationVariables } from "../../../API";
import FilterContext from "../../../Data/FilterContext";

export const UpdateModal = () => {
  const { hideModal, message, handleChange, setSavedAudience, name, setName } =
    useGlobalModalContext();
  const { selectedModelId } = useContext(FilterContext);

  //   const [message, setMessage] = useState("");

  const handleModalToggle = () => {
    hideModal();
  };

  //   const inputRef = useRef("" as any);

  async function PreseignedURL() {
    try {
      const response = (await API.graphql({
        query: saveAudience,
        variables: {
          Model_id: selectedModelId,
          Audience_name: name,
        } as SaveAudienceMutationVariables,
      })) as { data: SaveAudienceMutationVariables };

      console.log(response);
    } catch (err) {}
  }

  function UntityFucntion(e: any) {
    handleChange(name as string);
    handleModalToggle();
    PreseignedURL();
    console.log(selectedModelId);
    console.log("this has been clicked ");

    // if (e.key === "Enter") {
    //   handleChange(name as string);
    //   handleModalToggle();
    // }
    // setSavedAudience(message);
    // handleChange();
  }

  function updateName(val: any) {
    // setName((e: any) => e.target.value);
    setName(val.target.value);
    // console.log(val.target.value);
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
          <h3>Would you like to save the audice? </h3>
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
            onClick={(e) => UntityFucntion(e)}
            className="Contiune"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

import React from "react";
import "./Modal.css";
// import { useState } from "react";

export type closeModal = {
  setOpenModal(openModal: boolean): any;
};

const Modal = ({ setOpenModal }: closeModal) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Would you like to save the audience ?</h1>
        </div>

        <div className="footer">
          <button>Yes</button>
          <button onClick={() => setOpenModal(false)}>Later</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useState, createContext, useContext, useRef } from "react";
import { CreateModal } from "./CreateModal";
import { DeleteModal } from "./DeleteModal";
import { UpdateModal } from "./UpdateModal";

export const MODAL_TYPES = {
  CREATE_MODAL: "CREATE_MODAL",
  DELETE_MODAL: "DELETE_MODAL",
  UPDATE_MODAL: "UPDATE_MODAL",
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.CREATE_MODAL]: CreateModal,
  [MODAL_TYPES.DELETE_MODAL]: DeleteModal,
  [MODAL_TYPES.UPDATE_MODAL]: UpdateModal,
};

type GlobalModalContext = {
  showModal: (modalType: any, modalProps?: any) => any;
  hideModal: () => any;
  handleChange: (event: any) => any;
  setSavedAudience: (event: any) => any;
  message: any;

  store: any;
};

const initalState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  handleChange: () => "",
  setSavedAudience: () => {},
  message: "",

  store: {},
};

type Context = {
  children: any;
};

const GlobalModalContext = createContext(initalState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModal: React.FC<Context> = ({ children }) => {
  const [store, setStore] = useState();
  const { modalType, modalProps }: any = store || {};
  const [savedAudience, setSavedAudience] = useState([
    {
      title: "this is new ",
      objects: [],
    },
    {
      title: "this is new ",
      objects: [],
    },
  ]);
  const [message, setMessage] = useState("");

  const handleChange = (event: any) => {
    setMessage(event.target.value);
    console.log(message);
  };

  // const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setMessage(event.target.value);
  //   console.log('value is:', event.target.value);
  // };

  const showModal = (modalType: string, modalProps: any = {}) => {
    setStore({
      ...(store as any),
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...(store as any),
      modalType: null,
      modalProps: {},
    });
  };

  // setSavedAudience ()

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" {...modalProps} />;
  };

  return (
    <GlobalModalContext.Provider
      value={{
        store,
        message,
        setSavedAudience,
        handleChange,
        showModal,
        hideModal,
      }}
    >
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};

// const MODAL_COMPONENTS: any = {
//   CreateModal,
//   DeleteModal,
//   UpdateModal,
// };

// type GlobalModalContext = {
//   showModal: (modalType: string, modalProps?: any) => void;
//   hideModal: () => void;
//   store: any;
// };

// type Context = {
//   children: any;
//   modalType: {};
//   modalProps: {};
//   store: any;
// };

import { API } from "aws-amplify";
import React, { useState, createContext, useContext } from "react";
import { getChartDataAudience, GetChartDataQuery } from "../../../API";
import FilterContext from "../../../Data/FilterContext";
import { getChartData } from "../../../graphql/queries";
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
  ChartFetch: () => any;
  setSelectedAudition: (event: any) => any;
  setSelectedChart: (event: any) => any;
  selectedAudition: any;
  message: any;
  dataForChart: any;
  dataSelected: any;
  // setDataForChart: () => any;
  store: any;
  chart1: any;
  chart2: any;
  slectedChart: any;
};

const initalState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  handleChange: () => "",
  setSavedAudience: () => {},
  ChartFetch: () => {},
  setSelectedAudition: () => {},
  setSelectedChart: () => {},
  dataForChart: {},
  // setDataForChart: () => {},
  message: "",
  dataSelected: "",
  selectedAudition: "",
  store: {},
  chart1: "",
  chart2: "",
  slectedChart: "",
};

type Context = {
  children: any;
};

const GlobalModalContext = createContext(initalState);

export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModal: React.FC<Context> = ({ children }) => {
  const [store, setStore] = useState();
  const { data, categorical, selectedModelId } = useContext(FilterContext);
  const { modalType, modalProps }: any = store || {};
  const [selectedAudition, setSelectedAudition] = useState("");
  const [dataForChart, setDataForChart] = useState() as any;
  const [slectedChart, setSelectedChart] = useState("");
  const chart1 = "chart1";
  const chart2 = "chart2";

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

  const dataSelected = categorical.find(
    (item: any) => item.id === selectedAudition
  );

  async function ChartFetch() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            variable_type: dataSelected.variable_type,
            selector: dataSelected.id,
            filters: { categorical: [], numerical: [] },
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };

      // console.log(response.data.getChartData);
      const response_data = response.data.getChartData;
      setDataForChart(response_data);
    } catch (err) {
      console.log({ err });
    }
  }

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
        ChartFetch,
        selectedAudition,
        // setDataForChart,
        setSelectedAudition,
        dataForChart,
        dataSelected,
        slectedChart,
        setSelectedChart,
        chart2,
        chart1,
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

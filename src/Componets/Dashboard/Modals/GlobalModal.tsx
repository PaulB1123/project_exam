import { API } from "aws-amplify";
import React, { useState, createContext, useContext } from "react";
import {
  getChartDataAudience,
  GetChartDataQuery,
  getChartDataResponse,
} from "../../../API";
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
  inputarr: AudienceInfo[];
  name: any;
  setName: (event: any) => any;
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
  inputarr: [],
  name: "",
  setName: () => {},
};

type Context = {
  children: any;
};

type AudienceInfo = {
  AudienceId: string;
  AudienceName: string;
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

  const [inputarr, setInputArr] = useState([] as AudienceInfo[]);
  const [message, setMessage] = useState({ name: "" });
  const [name, setName] = useState("") as any;

  // function changehandle(e: any) {
  // SetInputData({...inputdata, [e.target.name]: e.target.value})
  // }

  const useInputValue = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);
    return {
      value,
      onChange: (e: any) => setValue(e.target.value),
    };
  };

  const handleChange = (audienceName: string) => {
    // setMessage({ ...message, [e.target.name]: e.target.value });
    // 1) call save audience api give you back id, and s3link
    // 2) from comtext make jsion file
    // 3) save on S3 using s3link
    // 4) update state inputArr with new audienceinfo

    const aInfo = {
      AudienceId: "a" + Math.round(Math.random() * 100),
      AudienceName: audienceName,
    } as AudienceInfo;

    setInputArr((p) => [...p, aInfo]);
    console.log(inputarr);
  };

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
      // const response_data = response.data.getChartData;

      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            setDataForChart(data);
          } else {
            setDataForChart([]);
          }
        }
      } else console.log(error);
    } catch (err) {
      console.log({ err });
    }
  }

  // async function ChartFetch() {
  //   try {
  //     const response = (await API.graphql({
  //       query: getChartData,
  //       variables: {
  //         Model_id: selectedModelId,
  //         Audience: {
  //           variable_type: dataSelected.variable_type,
  //           selector: dataSelected.id,
  //           filters: { categorical: [], numerical: [] },
  //         } as getChartDataAudience,
  //       },
  //     })) as { data: GetChartDataQuery };

  //     // console.log(response.data.getChartData);
  //     const response_data = response.data.getChartData;
  //     setDataForChart(response_data);
  //   } catch (err) {
  //     console.log({ err });
  //   }
  // }

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
        inputarr,
        name,
        setName,
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

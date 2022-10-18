import { API } from "aws-amplify";
import React, { useState, createContext, useContext, useEffect } from "react";
import {
  categoricalInput,
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
  chart3: any;
  slectedChart: any;
  inputarr: AudienceInfo[];
  name: any;
  setName: (event: any) => any;
  // buttonIsOpen: any;
  // setbuttonIsOpen:() => any;
  loading: any;
  setLoading: (event: boolean) => any;
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
  chart3: "",
  slectedChart: "",
  inputarr: [],
  name: "",
  setName: () => {},
  loading: false,
  setLoading: (event: boolean) => {},
  // buttonIsOpen: "",
  // setbuttonIsOpen:() => "",
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
  const { data, categorical, selectedModelId, ArrayDragged } =
    useContext(FilterContext);
  const { modalType, modalProps }: any = store || {};
  const [selectedAudition, setSelectedAudition] = useState("");
  const [dataForChart, setDataForChart] = useState() as any;
  const [slectedChart, setSelectedChart] = useState("");
  const chart1 = "chart1";
  const chart2 = "chart2";
  const chart3 = "chart3";
  const [loading, setLoading] = useState(false);

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

  const [buttonIsOpen, setbuttonIsOpen] = useState(false);

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
    // this is done

    // 2) from comtext make jsion file
    // this is done

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

  const [arrayData, setArrayData] = useState([] as categoricalInput[]);
  const [antherone, setAntherone] = useState([]) as any;

  useEffect(() => {
    let id;

    const something = ArrayDragged.map((e) => {
      // let val = [] as categoricalInput[];
      console.log(e);

      id = e.id;

      const aa = e.values.filter((v) => v.isSelected);

      const bb = aa.map((a) => a.id);

      return {
        id: e.id,
        values: bb,
      } as categoricalInput;

      // e.values.map((v) => {
      //   if (v.isSelected === true) {
      //     // setArrayData([...v, v]);
      //     // delete v.isSelected;

      //     val.push({
      //       id: v.id.toString(),
      //       values:v.value
      //     });
      //   }
      // });
      // return val;
    });

    console.log(something);
    // values = something.map((e: any) => {
    //   e.map((v: any) => {
    //     console.log(v.value);
    //   });
    // });
    // console.log(id);

    setArrayData(something);
  }, [ArrayDragged]);

  console.log(ArrayDragged);

  console.log(arrayData);

  async function ChartFetch() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            variable_type: dataSelected.variable_type,
            selector: dataSelected.id,
            filters: {
              categorical: arrayData,
              numerical: [],
            },
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

    // useEffect(() => {
    //   console.log("this is loading");

    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 10000);
    // }, []);
  }

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
        chart3,
        inputarr,
        name,
        setName,
        // buttonIsOpen,
        // setbuttonIsOpen,
        loading,
        setLoading,
      }}
    >
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};

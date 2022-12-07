import { API } from "aws-amplify";
import React, { useState, createContext, useContext, useEffect } from "react";
import {
  AudienceDataItem,
  AudienceItem,
  categoricalInput,
  DeleteAudienceMutationVariables,
  GetAudiencesQuery,
  GetAudiencesQueryVariables,
  getAudiencesResponse,
  LoadAudienceQuery,
  LoadAudienceQueryVariables,
  loadAudienceResponse,
  SaveAudienceMutation,
  SaveAudienceMutationVariables,
  saveAudienceResponse,
} from "../../../API";
import FilterContext from "../../../Data/FilterContext";
import { deleteAudience, saveAudience } from "../../../graphql/mutations";
import {
  getAudiences,
  getChartData,
  loadAudience,
} from "../../../graphql/queries";
import { CreateModal } from "./CreateModal";
import { SelectChart } from "./SelectChart";
import { UpdateModal } from "./UpdateModal";
import { MakeDefaultDashbaordModal } from "./MakeDefaultDashbaordModal";

export const MODAL_TYPES = {
  CREATE_MODAL: "CREATE_MODAL",
  DELETE_MODAL: "DELETE_MODAL",
  UPDATE_MODAL: "UPDATE_MODAL",
  MAKE_DEFAULT_DASHBOARD_MODAL: "MAKE_DEFAULT_DASHBOARD_MODAL",
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.CREATE_MODAL]: CreateModal,
  [MODAL_TYPES.DELETE_MODAL]: SelectChart,
  [MODAL_TYPES.UPDATE_MODAL]: UpdateModal,
  [MODAL_TYPES.MAKE_DEFAULT_DASHBOARD_MODAL]: MakeDefaultDashbaordModal,
};

type GlobalModalContext = {
  showModal: (modalType: any, modalProps?: any) => any;
  hideModal: () => any;
  handleChange: (event: any) => any;
  setSavedAudience: (event: any) => any;
  setSelectedAudition: (event: any) => any;
  setSelectedChart: (event: any) => any;
  selectedAudition: any;
  message: any;
  dataSelected: any;
  store: any;
  chart1: any;
  chart2: any;
  chart3: any;
  chart4: any;
  chart5: any;
  slectedChart: any;
  inputarr: AudienceInfo[];
  name: any;
  setName: (event: any) => any;
  loading: any;
  setLoading: (event: boolean) => any;
  PostResponse: (event: string, e: AudienceDataItem) => any;
  SaveAudineceURL: (event: any) => any;
  audienceIdReloded: string;
  loadAudienceUrl: (event: string) => any;
  deleteItemAudience: (event: string) => any;
  arrayData: any;
  ChartNumber: any;
  setChartNumber: (event: any) => any;
  SelectionArray: any;
  setSelectionArray: (event: any) => any;
  VariableType: string;
  setVariableType: (event: string) => {};
  audience: any;
  DashboardSelectedName: string | undefined;
  setDashboardSelectedName: (event: string) => any;
  makeDashboardDefault: boolean | undefined;
  setMakeDashboardDefault: (e: any) => any;
  DashboardDefault: string;
  setDasdboardDefault: (e: string) => any;
  DashboardTitle: any;
  setDashboardTitle: (e: string) => any;
  DashboardID: any;
  setDashboardID: (e: string) => any;
  activateDashboardFunction: any;
  setActivateDashbaordFunction: (e: any) => any;
  audienceList: any;
  setAudienceList: (params: any) => any;
  getAudienceData: (event: any) => any;
  chartSize: any;
  setChartSizes: (params: any) => any;
  chartTitle: any;
  setChartTitle: (params: any) => any;
  chartID: any;
  setchartID: (params: any) => any;
};

const initalState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  handleChange: () => "",
  setSavedAudience: () => {},
  setSelectedAudition: () => {},
  setSelectedChart: () => {},
  message: "",
  dataSelected: "",
  selectedAudition: "",
  store: {},
  chart1: "",
  chart2: "",
  chart3: "",
  chart4: "",
  chart5: "",
  slectedChart: "",
  inputarr: [],
  name: "",
  setName: () => {},
  loading: false,
  setLoading: (event: boolean) => {},
  PostResponse: (event: string, e: AudienceDataItem) => {},
  SaveAudineceURL: (event) => {},
  audienceIdReloded: "",
  loadAudienceUrl: (event: string) => {},
  deleteItemAudience: (event: string) => {},
  arrayData: [],
  ChartNumber: [],
  setChartNumber: (e: any) => [],
  SelectionArray: [],
  setSelectionArray: (e: any) => [],
  VariableType: "",
  setVariableType: (event: string) => "",
  audience: "",
  DashboardSelectedName: "",
  setDashboardSelectedName: (e: string) => "",
  makeDashboardDefault: false,
  setMakeDashboardDefault: (e: any) => false,
  DashboardDefault: "",
  setDasdboardDefault: (e: string) => "",
  DashboardTitle: "",
  setDashboardTitle: (e: string) => "",
  DashboardID: "",
  setDashboardID: (e: string) => "",
  activateDashboardFunction: false,
  setActivateDashbaordFunction: (e: any) => false,
  audienceList: "",
  setAudienceList: (params: any) => {},
  getAudienceData: (event: any) => {},
  chartSize: "",
  setChartSizes: (params: any) => {},
  chartTitle: "",
  setChartTitle: (params: any) => {},
  chartID: "",
  setchartID: (params: any) => {},
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
  const { data, categorical, selectedModelId, ArrayDragged, modelId } =
    useContext(FilterContext);
  const { modalType, modalProps }: any = store || {};
  const [selectedAudition, setSelectedAudition] = useState("");
  const [slectedChart, setSelectedChart] = useState("");
  const chart1 = "chart1";
  const chart2 = "chart2";
  const chart3 = "chart3";
  const chart4 = "chart4";
  const chart5 = "chart5";
  const [loading, setLoading] = useState(false);
  const [audienceReceivedId, setAudienceReceviedId] = useState("");
  const [audienceIdReloded, setAudienceIdReloaded] = useState("");
  const [audience, setAudience] = useState({} as AudienceItem);
  const [ChartNumber, setChartNumber] = useState([]);
  const [DashboardSelectedName, setDashboardSelectedName] = useState<string>();
  const [makeDashboardDefault, setMakeDashboardDefault] =
    useState<boolean>(false);
  const [DashboardDefault, setDasdboardDefault] = useState("");
  const [activateDashboardFunction, setActivateDashbaordFunction] = useState();

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
  const [SelectionArray, setSelectionArray] = useState([]) as any;
  const [VariableType, setVariableType] = useState("") as any;
  const [DashboardTitle, setDashboardTitle] = useState() as any;
  const [DashboardID, setDashboardID] = useState() as any;
  const [audienceList, setAudienceList] = useState() as any;
  const [chartSize, setChartSizes] = useState("small") as any;
  const [chartTitle, setChartTitle] = useState("") as any;
  const [chartID, setchartID] = useState() as any;

  const useInputValue = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);
    return {
      value,
      onChange: (e: any) => setValue(e.target.value),
    };
  };
  const showModal = (modalType: string, modalProps: any = {}) => {
    setStore({
      ...(store as any),
      modalType,
      modalProps,
    });
    // console.log(modalProps);
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

  const [arrayData, setArrayData] = useState([] as any);

  useEffect(() => {
    let id;

    // const something = ArrayDragged.map((e) => {
    //   id = e.Variable;
    //   const aa = e.Values.filter((v) => v.isSelected);
    //   const bb = aa.map((a) => a.id);
    //   return {
    //     id: e.id,
    //     values: bb,
    //   } as categoricalInput;
    // });

    // const something = ArrayDragged.map((e) => {
    //   id = e.Variable;
    //   const aa = e.Values.filter((v) => v.isSelected);
    //   const bb = aa.map((a) => a);
    //   return {
    //     Variable: e.Values,
    //     Values: bb,
    //   } as categoricalInput;
    // });
    // console.log(something);
    // setArrayData(something);
  }, [ArrayDragged]);

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" modalProps={modalProps} />;
  };

  async function SaveAudineceURL() {
    try {
      const response = (await API.graphql({
        query: saveAudience,
        variables: {
          Model_id: selectedModelId,
          Audience_name: name,
        } as SaveAudienceMutationVariables,
      })) as { data: SaveAudienceMutation };
      // console.log(response);

      const { data: response_data } = response;
      const { saveAudience: actual_list } = response_data;
      const { data, error, StatusCode }: saveAudienceResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
          // console.log(data);

          setAudience(data.Audience);
          return data;
        } else {
          console.log(error);
        }
      } else console.log(error);

      if (response != null) {
      }
    } catch (err) {}
  }

  // console.log(audience);

  useEffect(() => {
    const aInfo = {
      AudienceId: audience.Audience_id,
      AudienceName: audience.Audience_name,
    } as AudienceInfo;

    setInputArr((p) => {
      const filt = p.filter((a) => a.AudienceId !== undefined);
      return [...filt, aInfo];
    });
  }, [audience]);

  // here it starts the functions for the audiences

  const saveAudienceURLtrigger = async (audienceName: string) => {
    const data: any = await SaveAudineceURL();
    // console.log(data);

    await PostResponse(data.Url, data);
  };

  async function PostResponse(e: string, data: AudienceDataItem) {
    // console.log(data);

    try {
      const response = await fetch(e, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(ArrayDragged),
      });
      // console.log(response);
      // console.log(selectedModelId);
      // loadAudienceUrl(selectedModelId);

      getAudienceData(selectedModelId);
    } catch (err) {
      console.log({ err });
    }
  }

  async function getAudienceData(modelId: string) {
    // console.log(selectedModelId);
    // console.log("it went here again ", selectedModelId);

    try {
      const response = (await API.graphql({
        query: getAudiences,
        variables: {
          Model_id: selectedModelId,
          all: true,
        } as GetAudiencesQueryVariables,
      })) as { data: GetAudiencesQuery };

      const { data: response_data } = response;
      const { getAudiences: actual_list } = response_data;
      const { data, error, StatusCode }: getAudiencesResponse = actual_list;

      // console.log(data);

      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);

            setAudienceList(data);

            // getAudienceURL();
          } else {
            setAudienceList([]);
          }
        }
      } else console.log(error);
    } catch (err) {
      console.log({ err });
    }
  }

  async function deleteItemAudience(reponse: string) {
    try {
      const response2 = await API.graphql({
        query: deleteAudience,
        variables: {
          Audience_id: reponse,
        } as DeleteAudienceMutationVariables,
      });
      // console.log(response2);
      // console.log(modelId);

      getAudienceData(selectedModelId);
      // loadAudienceUrl(reponse);
    } catch (err) {
      console.log({ err });
    }
  }

  async function loadAudienceUrl(audienceID: string) {
    // console.log("this is coming from the second fetch", audienceID);

    setAudienceIdReloaded(audienceID);
    try {
      const response = (await API.graphql({
        query: loadAudience,
        variables: {
          Audience_id: audienceID,
        } as LoadAudienceQueryVariables,
      })) as { data: LoadAudienceQuery };

      // console.log(response);
      const { data: response_data } = response;
      const { loadAudience: actual_list } = response_data;
      const { data, error, StatusCode }: loadAudienceResponse = actual_list;

      // getAudienceData(selectedModelId);

      if (StatusCode === 200) {
        if (data) {
          // console.log(data);
          LoadAudience(data.Url);
          return data.Url as string;
        } else {
        }
      } else console.log(error);
      if (response != null) {
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function LoadAudience(reponse: string) {
    try {
      const response = fetch(reponse, {
        method: "GET",
      })
        .then((r) => r.json())
        .then((data) => {
          // console.log(data);
          setArrayData(data);
          console.log("this is be after the deleted is clicked ", data);
        });
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    // console.log(chartTitle, chartID);
    // console.log(SelectionArray);
    // console.log(chartSize);
    // console.log("has been here");

    if (SelectionArray.some((el: any) => el.Position === chartID)) {
      // console.log(SelectionArray);

      const ChartFound = SelectionArray.find(
        (elem: any) => elem.Position === chartID
      );
      if (chartTitle !== "") {
        ChartFound["Title"] = chartTitle;
      }
      ChartFound["Chart_size"] = chartSize;
      setSelectionArray((ps: any) =>
        ps.filter((el: any) => el.Position !== chartID)
      );

      setSelectionArray((ps: any) => [...ps, ChartFound]);
      // console.log(ChartFound);
    }
  }, [chartTitle, chartSize]);

  // console.log(SelectionArray);

  // here it ends the functions for the audiences

  return (
    <GlobalModalContext.Provider
      value={{
        store,
        message,
        setSavedAudience,
        handleChange: saveAudienceURLtrigger,
        showModal,
        hideModal,
        selectedAudition,
        setSelectedAudition,
        dataSelected,
        slectedChart,
        setSelectedChart,
        audienceIdReloded,
        chart2,
        chart1,
        chart3,
        chart4,
        chart5,
        inputarr,
        name,
        setName,
        loading,
        setLoading,
        PostResponse,
        SaveAudineceURL,
        loadAudienceUrl,
        deleteItemAudience,
        arrayData,
        ChartNumber,
        setChartNumber,
        SelectionArray,
        setSelectionArray,
        VariableType,
        setVariableType,
        audience,
        DashboardSelectedName,
        setDashboardSelectedName,
        makeDashboardDefault,
        setMakeDashboardDefault,
        DashboardDefault,
        setDasdboardDefault,
        DashboardTitle,
        setDashboardTitle,
        DashboardID,
        setDashboardID,
        activateDashboardFunction,
        setActivateDashbaordFunction,
        audienceList,
        setAudienceList,
        getAudienceData,
        setChartSizes,
        chartSize,
        chartTitle,
        setChartTitle,
        chartID,
        setchartID,
      }}
    >
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};

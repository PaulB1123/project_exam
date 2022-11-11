import { API } from "aws-amplify";
import React, { useState, createContext, useContext, useEffect } from "react";
import {
  AudienceDataItem,
  AudienceItem,
  categoricalInput,
  DeleteAudienceMutationVariables,
  LoadAudienceQuery,
  LoadAudienceQueryVariables,
  loadAudienceResponse,
  SaveAudienceMutation,
  SaveAudienceMutationVariables,
  saveAudienceResponse,
} from "../../../API";
import FilterContext from "../../../Data/FilterContext";
import { deleteAudience, saveAudience } from "../../../graphql/mutations";
import { getChartData, loadAudience } from "../../../graphql/queries";
import { CreateModal } from "./CreateModal";
import { SelectChart } from "./SelectChart";
import { UpdateModal } from "./UpdateModal";

export const MODAL_TYPES = {
  CREATE_MODAL: "CREATE_MODAL",
  DELETE_MODAL: "DELETE_MODAL",
  UPDATE_MODAL: "UPDATE_MODAL",
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.CREATE_MODAL]: CreateModal,
  [MODAL_TYPES.DELETE_MODAL]: SelectChart,
  [MODAL_TYPES.UPDATE_MODAL]: UpdateModal,
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
  audience: any;
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
  audience: "",
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
  const [slectedChart, setSelectedChart] = useState("");
  const chart1 = "chart1";
  const chart2 = "chart2";
  const chart3 = "chart3";
  const [loading, setLoading] = useState(false);
  const [audienceReceivedId, setAudienceReceviedId] = useState("");
  const [audienceIdReloded, setAudienceIdReloaded] = useState("");
  const [audience, setAudience] = useState({} as AudienceItem);
  const [ChartNumber, setChartNumber] = useState([]);

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

    const something = ArrayDragged.map((e) => {
      id = e.id;
      const aa = e.values.filter((v) => v.isSelected);
      const bb = aa.map((a) => a.id);
      return {
        id: e.id,
        values: bb,
      } as categoricalInput;
    });
    // console.log(something);
    setArrayData(something);
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
      console.log(response);

      const { data: response_data } = response;
      const { saveAudience: actual_list } = response_data;
      const { data, error, StatusCode }: saveAudienceResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
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

  // this is the second one

  async function PostResponse(e: string, data: AudienceDataItem) {
    console.log("it went here");

    try {
      const response = await fetch(e, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(ArrayDragged),
      });
      console.log(response);
      let audience = data.Audience.Audience_id as string;
    } catch (err) {
      console.log({ err });
    }
  }

  // useEffect(() => {
  //   console.log(audienceReceivedId);
  // }, [audienceReceivedId]);

  // this is the third one

  async function loadAudienceUrl(audience: string) {
    console.log("this is coming from the second fetch");

    // console.log(audience);

    setAudienceIdReloaded(audience);
    try {
      const response = (await API.graphql({
        query: loadAudience,
        variables: {
          Audience_id: audience,
        } as LoadAudienceQueryVariables,
      })) as { data: LoadAudienceQuery };

      console.log(response);
      const { data: response_data } = response;
      const { loadAudience: actual_list } = response_data;
      const { data, error, StatusCode }: loadAudienceResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
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

  // this is the forth one

  async function LoadAudience(reponse: string) {
    try {
      const response = fetch(reponse, {
        method: "GET",
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setArrayData(data);
        });
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    // console.log(audience);
    const aInfo = {
      AudienceId: audience.Audience_id,
      AudienceName: audience.Audience_name,
    } as AudienceInfo;

    setInputArr((p) => {
      const filt = p.filter((a) => a.AudienceId !== undefined);
      return [...filt, aInfo];
    });
  }, [audience]);

  const handleChange = async (audienceName: string) => {
    const data: any = await SaveAudineceURL();
    console.log(data);

    await PostResponse(data.Url, data);
  };

  async function deleteItemAudience(reponse: string) {
    try {
      const response2 = await API.graphql({
        query: deleteAudience,
        variables: {
          Audience_id: reponse,
        } as DeleteAudienceMutationVariables,
      });
      console.log(response2);
      loadAudienceUrl(reponse);
    } catch (err) {
      console.log({ err });
    }
  }

  // console.log(audience);

  return (
    <GlobalModalContext.Provider
      value={{
        store,
        message,
        setSavedAudience,
        handleChange,
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
        audience,
      }}
    >
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import UserContext from "./UserContext";
import { IGroup } from "../ReusableElements/Button_Navigation_Left/DragnDrop";
import React from "react";
import { API } from "aws-amplify";
import {
  getAudiences,
  getClients,
  getModelsForClient,
  getSelectorsForModel,
} from "../graphql/queries";
import {
  ClientItem,
  GetAudiencesQuery,
  GetAudiencesQueryVariables,
  getAudiencesResponse,
  getClientsResponse,
  getModelsForClientResponse,
  getSelectorsForModelResponse,
  ModelItem,
  SelectorFactor,
  selectorValue,
} from "../API";
import { useGlobalModalContext } from "../Componets/Dashboard/Modals/GlobalModal";

const FilterContext = createContext({
  data: [] as IGroup[],
  modelId: "" as string,
  setModelId: (params: any) => {},
  client: "" as string,
  country: "" as string,
  clientNewData: "" as any,
  setClientNewData: (params: any) => {},
  availableModels: "" as any,
  setAvailableModels: (params: any) => {},
  selectedModelId: "" as any,
  setSelectedModelId: (params: any) => {},
  selectedClient: "" as any,
  setSelectedClient: (params: any) => {},
  updateSelectorSelectedValue: (
    selector_id: string,
    valueId: number,
    item: any
  ) => {},
  setData: (params: any) => {},
  newArray: [] as any,
  categorical: [] as any,
  ArrayDragged: [] as GeneralSelector[],
  setArrayDragged: (param: GeneralSelector[]) => {},
  isPlusButtonOpen: "" as any,
  setIsPlusButtonOpen: (params: any) => {},
  audienceId: [] as any,
  getAudienceData: (event: string) => {},
  setArrayLeft: (params: any) => {},
  setArrayRight: (params: any) => {},
  leftside: [] as any,
  object: [] as any,
  setObject: (params: any) => {},
  updateCharts: () => {},
  selectedItems: [] as any,
  setselectedItems: (params: any) => {},
  isLoading: false,
  setIsLoading: (params: any) => {},
  Chart: [] as any,
  setChart: (params: any) => {},
  chartUpdate: false,
  setChartUpdate: (params: any) => {},
  ReportsList: [] as any,
  setReportsList: (params: any) => [],
  itemDeleteReport: "",
  setitemDelteReport: (params: string) => {},
});

type FilterContextProviderProps = {
  children: React.ReactNode;
};

type SelectorValueWithStatus = selectorValue & {
  isSelected: boolean;
};

export type GeneralSelector = {
  Variable_type: String;
  Variable: string;
  Title: String;
  Category: String;
  Values: SelectorValueWithStatus[];
};

export const FilterContextProvider = (props: FilterContextProviderProps) => {
  const [clientNewData, setClientNewData] = useState([] as ClientItem[]);
  const [availableModels, setAvailableModels] = useState([] as ModelItem[]);
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(
    undefined
  );
  const { user, allUserData } = useContext(UserContext);
  const [selectedClient, setSelectedClient] = React.useState("");
  const [data, setData] = useState([] as any);
  const [client, setClient] = useState("");
  const [country, setCountry] = useState("");
  const [modelId, setModelId] = useState("" as any);
  const [categorical, setCategorical] = useState([] as GeneralSelector[]);
  const [newArray, setNewArray] = useState([] as any);
  const [ArrayDragged, setArrayDragged] = useState([] as GeneralSelector[]);
  const [isPlusButtonOpen, setIsPlusButtonOpen] = useState(true);
  const [audienceId, setAudienceId] = useState() as any;
  const [selectedItems, setselectedItems] = useState() as any;
  const [isLoading, setIsLoading] = useState(false);
  const [Chart, setChart] = useState();
  const [chartUpdate, setChartUpdate] = useState(false);
  const [ReportsList, setReportsList] = useState() as any;
  const [itemDeleteReport, setitemDelteReport] = useState("");

  const url =
    "https://zjr6j5dwbvg4joqegn4v26ic7e.appsync-api.eu-west-1.amazonaws.com/graphql";
  // "https://vp63hlcievdqpjbqj6vrfallvy.appsync-api.eu-west-1.amazonaws.com/graphql";

  useEffect(() => {
    async function Mihai() {
      try {
        const response = (await API.graphql({
          query: getClients,
        })) as { data: { getClients: getClientsResponse } };
        // console.log(response);
        const { data: response_data } = response;
        const { getClients: actual_list } = response_data;
        const { data, error, StatusCode }: getClientsResponse = actual_list;

        console.log(actual_list);
        if (StatusCode === 200) {
          if (data) {
            setClientNewData(data);

            if (data.length > 0) {
              const splitClientName = data[0].Client_code.split("#");
              setClient(splitClientName[0]);
              setCountry(splitClientName[1]);
              setSelectedClient(data[0].Client_code);
            }
          }
          // console.log(clientNewData);
        } else console.log(error);
      } catch (err) {
        console.log({ err });
      }
    }

    if (allUserData.length > 0) {
      Mihai();
    }
  }, [allUserData]);
  // console.log(clientNewData);

  useEffect(() => {
    // console.log(clientNewData);
  }, [clientNewData]);

  useEffect(() => {
    async function DatabaseFetch() {
      try {
        const response = (await API.graphql({
          query: getModelsForClient,
          variables: { Client_code: selectedClient },
        })) as { data: { getModelsForClient: getModelsForClientResponse } };
        // console.log(response);
        const { data: response_data } = response;
        const { getModelsForClient: actual_list } = response_data;

        const { data, error, StatusCode }: getModelsForClientResponse =
          actual_list;

        console.log(actual_list);

        if (StatusCode === 200) {
          if (data) {
            console.log(data);
            if (data.length > 0) {
              setAvailableModels(data);
              setSelectedModelId(data[0].Model_id);
            } else {
              setAvailableModels([]);
            }
          }
        } else console.log(error);
      } catch (err) {
        console.log({ err });
      }
    }

    if (selectedClient.length > 0) {
      DatabaseFetch();
    }
  }, [selectedClient]);

  // console.log(modelId);

  useEffect(() => {
    if (selectedModelId) {
      const selectedModel = availableModels.filter(
        (m) => m.Model_id === selectedModelId
      );
      // console.log(selectedModel);

      if (selectedModel.length > 0) {
        // console.log(selectedModel, selectedModelId);
      }
    }
    // console.log(selectedModelId);
  }, [selectedModelId, availableModels]);

  const DatabaseFetc = useCallback(async () => {
    console.log(selectedModelId);

    try {
      const response = (await API.graphql({
        query: getSelectorsForModel,
        variables: { Model_id: selectedModelId },
      })) as {
        data: { getSelectorsForModel: getSelectorsForModelResponse };
      };
      //  now I have fecthed the data with the selectedModelId so I received the filter array
      console.log("this is all of my data", response);
      const { data: response_data } = response;
      const { getSelectorsForModel: actual_list } = response_data;

      const { data, error, StatusCode }: getSelectorsForModelResponse =
        actual_list;

      console.log(actual_list);
      if (StatusCode === 200) {
        console.log(data);
        if (data) {
          // console.log(data);
          // console.log("this should work", data);
          if (data.length > 0) {
            const filteredList = data.filter(
              (i) => i.Variable_type === "categorical"
            ) as SelectorFactor[];
            // console.log("this should work", filteredList);
            if (filteredList.length > 0) {
              const a = filteredList.map((i: SelectorFactor) => {
                const {
                  Values: filteredValues,
                  Variable_type,
                  Variable,
                  Title,
                  Category,
                } = i;
                if (Variable_type && Variable && Title && Category) {
                  const valuesWithFalse = filteredValues?.map((v) => {
                    return { ...v, isSelected: false };
                  });

                  return {
                    Variable_type: Variable_type,
                    Variable: Variable,
                    Title: Title,
                    Category: Category,
                    Values: valuesWithFalse,
                  } as GeneralSelector;
                }
              });
              // console.log("this should work", a);

              if (a) {
                const newLocal = a.filter((s) => s !== undefined);
                setCategorical(newLocal as GeneralSelector[]);
              }
            }
          } else {
            setCategorical([]);
          }
        }
      } else console.log(error);
    } catch (err) {
      console.log({ err });
    }
  }, [selectedModelId]);

  useEffect(() => {
    if (selectedModelId) {
      console.log("is going there ");

      DatabaseFetc();
    }
  }, [DatabaseFetc, selectedModelId]);

  const updateSelectorSelectedValue = (
    selector_id: string,
    valueId: number,
    item: any
  ) => {
    // console.log(categorical);

    const updated_selectors = categorical.map((s: any) => {
      // first check if selector is updated otherwise just return the selector
      if (s.id === selector_id) {
        const { values } = s;
        const new_val = values.map((vm: any) => {
          if (vm.id === valueId) {
            // console.log(vm.id);
            return { ...vm, isSelected: !vm.isSelected };
          }
          return vm;
        });
        return { ...s, values: new_val };
      }
      return s;
    });
    // console.log(updated_selectors);
    // console.log(item);

    setCategorical(updated_selectors);
  };

  useEffect(() => {
    if (user != null) {
    }
  }, [user, modelId]);

  const [ArrrayLeft, setArrayLeft] = useState([]) as any;
  const [ArrrayRight, setArrayRight] = useState([]) as any;
  const [object, setObject] = useState([]) as any;
  // setArrayLeft (...hasSelectedValues, )

  // useEffect(() => {
  //   console.log(ArrrayLeft);
  // }, [ArrrayLeft]);

  const [leftside, setleftside] = useState() as any;

  useEffect(() => {
    const hasSelectedValues = categorical.filter((c) => HasSelector(c));
    setleftside(hasSelectedValues);
    // console.log(hasSelectedValues);

    const dosentHasSelectedValues = categorical.filter((c) => !HasSelector(c));
    setArrayRight(categorical);
    // setArrayDragged(hasSelectedValues);

    setData([
      {
        title: "dropdown_audition",
        items: hasSelectedValues,
      },
      {
        title: "audition_bar",
        items: dosentHasSelectedValues,
      },
    ]);
  }, [categorical]);

  async function getAudienceData(modelId: string) {
    console.log(modelId);
    console.log("it went here again ");

    try {
      const response = (await API.graphql({
        query: getAudiences,
        variables: {
          Model_id: modelId,
          all: true,
        } as GetAudiencesQueryVariables,
      })) as { data: GetAudiencesQuery };

      const { data: response_data } = response;
      const { getAudiences: actual_list } = response_data;
      const { data, error, StatusCode }: getAudiencesResponse = actual_list;

      console.log(data);

      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            console.log(data);

            setAudienceId(data);
            console.log(audienceId);

            // getAudienceURL();
          } else {
            setAudienceId([]);
          }
        }
      } else console.log(error);
    } catch (err) {
      console.log({ err });
    }
  }

  function updateCharts() {
    console.log(data);
    console.log(object);
    console.log(Chart);
    // ChartFetch(Chart, chart1)
  }

  // useEffect(() => {
  //   console.log(audienceId);
  // }, [audienceId]);

  return (
    <FilterContext.Provider
      value={{
        data: data,
        setData,
        modelId,
        setModelId,
        client,
        country,
        clientNewData,
        setClientNewData,
        availableModels,
        setAvailableModels,
        selectedModelId,
        setSelectedModelId,
        selectedClient,
        setSelectedClient,
        updateSelectorSelectedValue,
        newArray,
        categorical,
        ArrayDragged,
        isPlusButtonOpen,
        setIsPlusButtonOpen,
        setArrayDragged,
        audienceId,
        getAudienceData,
        setArrayLeft,
        setArrayRight,
        leftside,
        object,
        setObject,
        updateCharts,
        selectedItems,
        setselectedItems,
        isLoading,
        setIsLoading,
        Chart,
        setChart,
        setChartUpdate,
        chartUpdate,
        ReportsList,
        setReportsList,
        itemDeleteReport,
        setitemDelteReport,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

// Problmes that I have with this code:
// the filter option when it renders again it renders only the items which have a preselected value in the filter, other wise it does not work properly
// the drag and drop is multipling the same values for all the filters
// I need to remake the function of updating the charts
// when is refreshed the database selector is not working properly

export default FilterContext;
function HasSelector(c: GeneralSelector) {
  const { Values } = c;
  const hasSelector = Values.some((v) => v.isSelected);
  // console.log(hasSelector);
  // console.log(hasSelector);

  return hasSelector;
}

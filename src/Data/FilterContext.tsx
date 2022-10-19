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
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import {
  getAudiences,
  getClients,
  getModelsForClient,
  getSelectorsForModel,
  loadAudience,
} from "../graphql/queries";
import {
  ClientItem,
  GetAudiencesQuery,
  GetAudiencesQueryVariables,
  getAudiencesResponse,
  getClientsResponse,
  getModelsForClientResponse,
  getSelectorsForModelResponse,
  LoadAudienceQuery,
  LoadAudienceQueryVariables,
  ModelItem,
  SelectorFactor,
  selectorValue,
} from "../API";

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
  updateSelectorSelectedValue: (selector_id: string, valueId: number) => {},
  setData: (params: any) => {},
  newArray: [] as any,
  categorical: [] as any,
  ArrayDragged: [] as GeneralSelector[],
  setArrayDragged: (param: GeneralSelector[]) => {},
  isPlusButtonOpen: "" as any,
  setIsPlusButtonOpen: (params: any) => {},
  audienceId: [] as any,
});

type FilterContextProviderProps = {
  children: React.ReactNode;
};

type SelectorValueWithStatus = selectorValue & {
  isSelected: boolean;
};

export type GeneralSelector = {
  variable_type: String;
  id: string;
  selector: String;
  category: String;
  values: SelectorValueWithStatus[];
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
  // const params = useParams();
  const [categorical, setCategorical] = useState([] as GeneralSelector[]);
  const [newArray, setNewArray] = useState([] as any);
  const [ArrayDragged, setArrayDragged] = useState([] as GeneralSelector[]);
  const [ArrayDragging, setArrayDragging] = useState();
  const [isPlusButtonOpen, setIsPlusButtonOpen] = useState(true);
  const [audienceId, setAudienceId] = useState() as any;

  const url =
    "https://zjr6j5dwbvg4joqegn4v26ic7e.appsync-api.eu-west-1.amazonaws.com/graphql";

  // useEffect(() => {
  //   console.log(params);
  // }, [params]);

  useEffect(() => {
    async function Mihai() {
      try {
        const response = (await API.graphql({
          query: getClients,
        })) as { data: { getClients: getClientsResponse } };
        console.log(response);
        const { data: response_data } = response;
        const { getClients: actual_list } = response_data;
        const { data, error, StatusCode }: getClientsResponse = actual_list;

        console.log(actual_list);
        if (StatusCode === 200) {
          if (data) {
            console.log(data);
            setClientNewData(data);

            if (data.length > 0) {
              const splitClientName = data[0].Client_code.split("#");
              setClient(splitClientName[0]);
              setCountry(splitClientName[1]);
              setSelectedClient(data[0].Client_code);
            }
          }
          console.log(clientNewData);
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
    console.log(clientNewData);
  }, [clientNewData]);

  useEffect(() => {
    async function DatabaseFetch() {
      try {
        const response = (await API.graphql({
          query: getModelsForClient,
          variables: { Client_code: selectedClient },
        })) as { data: { getModelsForClient: getModelsForClientResponse } };
        console.log(response);
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
      console.log(selectedModel);

      if (selectedModel.length > 0) {
        // console.log(selectedModel, selectedModelId);
      }
    }
    console.log(selectedModelId);
  }, [selectedModelId, availableModels]);

  const DatabaseFetc = useCallback(async () => {
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
        if (data) {
          // console.log(data);
          // console.log("this should work", data);
          if (data.length > 0) {
            const filteredList = data.filter(
              (i) => i.variable_type === "categorical"
            ) as SelectorFactor[];
            console.log("this should work", filteredList);
            if (filteredList.length > 0) {
              const a = filteredList.map((i: SelectorFactor) => {
                const {
                  values: filteredValues,
                  variable_type,
                  id,
                  selector,
                  category,
                } = i;
                if (variable_type && id && selector && category) {
                  const valuesWithFalse = filteredValues?.map((v) => {
                    return { ...v, isSelected: false };
                  });

                  return {
                    variable_type: variable_type,
                    id: id,
                    selector: selector,
                    category: category,
                    values: valuesWithFalse,
                  } as GeneralSelector;
                }
              });
              console.log("this should work", a);

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
      DatabaseFetc();
      console.log("blabla", selectedModelId);
    }
  }, [DatabaseFetc, selectedModelId]);

  const updateSelectorSelectedValue = (
    selector_id: string,
    valueId: number
  ) => {
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
    setCategorical(updated_selectors);
  };

  // useEffect(() => {
  //   if (modelId !== "") {
  //     console.log("now is here ", secondId);

  //     setModelId(secondId);
  //   }
  // }, [secondId]);

  console.log("now is here ", modelId);

  useEffect(() => {
    if (user != null) {
    }
  }, [user, modelId]);

  useEffect(() => {
    const hasSelectedValues = categorical.filter((c) => HasSelector(c));
    const dosentHasSelectedValues = categorical.filter((c) => !HasSelector(c));
    setArrayDragged(hasSelectedValues);
    console.log(hasSelectedValues);

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

  useEffect(() => {
    console.log(ArrayDragged);
  }, [ArrayDragged]);

  useEffect(() => {
    const firstList = data[0];
  }, [data]);

  if (newArray.length > 0) {
    setNewArray(data[0].items);
    // console.log(newArray);
  }

  useEffect(() => {
    async function getAudienceData() {
      try {
        const response = (await API.graphql({
          query: getAudiences,
          variables: {
            Model_id: "f641cdd7-d735-4fde-b67b-249a1e81c222",
            all: true,
          } as GetAudiencesQueryVariables,
        })) as { data: GetAudiencesQuery };

        const { data: response_data } = response;
        const { getAudiences: actual_list } = response_data;
        const { data, error, StatusCode }: getAudiencesResponse = actual_list;
        console.log(data);

        // console.log(response);

        if (StatusCode === 200) {
          if (data) {
            if (data.length > 0) {
              setAudienceId(data);
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

    // async function getAudienceURL() {
    //   console.log("this is working", audienceId);

    //   try {
    //     const response = (await API.graphql({
    //       query: loadAudience,
    //       variables: {
    //         Audience_id: audienceId[0].Audience_id,
    //       } as LoadAudienceQueryVariables,
    //     })) as { data: LoadAudienceQuery };

    //     // const { data: response_data } = response;
    //     // const { getAudiences: actual_list } = response_data;
    //     // const { data, error, StatusCode }: getAudiencesResponse = actual_list;
    //     console.log(response);

    //     // console.log(response);

    //     // if (StatusCode === 200) {
    //     //   if (data) {
    //     //     if (data.length > 0) {

    //     //     } else {

    //     //     }
    //     //   }
    //     // } else console.log(error);
    //   } catch (err) {
    //     console.log({ err });
    //   }
    // }

    getAudienceData();
  }, []);

  console.log(audienceId);

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
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
function HasSelector(c: GeneralSelector) {
  const { values } = c;
  const hasSelector = values.some((v) => v.isSelected);
  console.log(hasSelector);

  return hasSelector;
}

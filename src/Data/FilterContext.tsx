import { useState, useEffect, createContext, useContext } from "react";
import UserContext from "./UserContext";
import { IGroup } from "../ReusableElements/Button_Navigation_Left/DragnDrop";
import React from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import {
  getClients,
  getModelsForClient,
  getSelectorsForModel,
} from "../graphql/queries";
import {
  getClientsResponse,
  getModelForClientResponse,
  getSelectorForModelResponse,
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
  const [clientNewData, setClientNewData] = useState(
    [] as getClientsResponse[]
  );

  const [availableModels, setAvailableModels] = useState(
    [] as getModelForClientResponse[]
  );

  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(
    undefined
  );

  // const [selectors, setSelectors] = useState([] as GeneralSelector[]);

  // const [filterAudience, setFilterAudience] = useState([] as any);
  const { user, allUserData } = useContext(UserContext);
  const [selectedClient, setSelectedClient] = React.useState("");
  const [data, setData] = useState([] as any);
  const [client, setClient] = useState("");
  const [country, setCountry] = useState("");
  const [modelId, setModelId] = useState("" as any);
  const { secondId } = useParams();
  const [categorical, setCategorical] = useState([] as GeneralSelector[]);
  const [newArray, setNewArray] = useState([] as any);

  const url =
    "https://zjr6j5dwbvg4joqegn4v26ic7e.appsync-api.eu-west-1.amazonaws.com/graphql";

  useEffect(() => {
    async function Mihai() {
      try {
        const response = (await API.graphql({
          query: getClients,
        })) as { data: { getClients: getClientsResponse[] } };
        console.log(response);
        const { data: response_data } = response;
        const { getClients: actual_list } = response_data;
        setClientNewData(actual_list);
        const splitClientName = actual_list[0].Client_code.split("#");
        setClient(splitClientName[0]);
        setCountry(splitClientName[1]);
        if (actual_list.length > 0) {
          setSelectedClient(actual_list[0].Client_code);
        }
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
    async function DatabaseFetch() {
      try {
        const response = (await API.graphql({
          query: getModelsForClient,
          variables: { Client_code: selectedClient },
        })) as { data: { getModelsForClient: getModelForClientResponse[] } };
        console.log(response);
        const { data: response_data } = response;
        const { getModelsForClient: actual_list } = response_data;
        setAvailableModels(actual_list);
        setSelectedModelId(actual_list[0].Model_id);
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

  async function DatabaseFetch() {
    try {
      const response = (await API.graphql({
        query: getSelectorsForModel,
        variables: { Model_id: selectedModelId },
      })) as {
        data: { getSelectorsForModel: getSelectorForModelResponse[] };
      };
      //  now I have fecthed the data with the selectedModelId so I received the filter array
      console.log("this is all of my data", response);
      const { data: response_data } = response;
      const { getSelectorsForModel: actual_list } = response_data;
      // console.log(response);
      const filteredList = actual_list.filter(
        (i) => i.variable_type === "categorical"
      ) as SelectorFactor[];
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
          const newLocal = a.filter((s) => s != undefined);
          setCategorical(newLocal as GeneralSelector[]);
        }
      }
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    if (selectedModelId) {
      DatabaseFetch();
    }
  }, [selectedModelId]);

  // console.log("this is the second time ", categorical);

  const updateSelectorSelectedValue = (
    selector_id: string,
    valueId: number
  ) => {
    // console.log("it goes here ", selector_id, valueId);
    // console.log(categorical);
    const updated_selectors = categorical.map((s: any) => {
      // first check if selector is updated otherwise just return the selector
      if (s.id === selector_id) {
        const { values } = s;
        // console.log(values);
        // console.log(valueId);
        // loop thru values and update only valueId
        const new_val = values.map((vm: any) => {
          if (vm.id === valueId) {
            // console.log(vm.id);
            return { ...vm, isSelected: !vm.isSelected };
          }

          return vm;
        });
        // console.log(new_val);
        return { ...s, values: new_val };
      }
      return s;
    });
    // console.log(updated_selectors);
    // setSelectors(updated_selectors);
    setCategorical(updated_selectors);
  };

  useEffect(() => {
    if (modelId !== "") {
      console.log("now is here ");

      setModelId(secondId);
    }
  }, [secondId]);

  useEffect(() => {
    if (user != null) {
    }
  }, [user, modelId]);

  useEffect(() => {
    const hasSelectedValues = categorical.filter((c) => HasSelector(c));
    const dosentHasSelectedValues = categorical.filter((c) => !HasSelector(c));

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
    const firstList = data[0];
    console.log(data);
    console.log(firstList);
  }, [data]);

  if (newArray.length > 0) {
    setNewArray(data[0].items);
    console.log(newArray);
  }

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
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
function HasSelector(c: GeneralSelector) {
  // console.log(c);

  const { values } = c;

  const hasSelector = values.some((v) => v.isSelected);
  console.log(hasSelector);

  return hasSelector;
}

// console.count("set data");
// setData([
//   {
//     title: "dropdown_audition",
//     items: [],
//   },
//   {
//     title: "audition_bar",
//     items: categorical,
//   },
// ]);
// if (data.length > 0) {
//   console.log(
//     // data.map((el: any) => (el.items.va === 1 ? el.items[1] : el.items[1]))
//     data.map((el: any) =>
//       el.items.map((vm: any) =>
//         vm.variable_type === "categorical"
//           ? el.items[1]
//           : "there is nothing"
//       )
//     )
//   );
// }
// setData((ps: any) => ({
//   ...ps.map((el: any) =>
//     el.items.map((vm: any) =>
//       vm.variable_type === "categorical" ? el.items[1] : "there is nothing" )),
// }));
// setData ((ps:any) => ({
//   ...ps.data.items.map((el:any) => el.key === )
// }))

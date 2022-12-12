import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { API } from "aws-amplify";
import React from "react";
import {
  categoricalInput,
  getChartDataFilters,
  getSelectorsForModelResponse,
  numericalInput,
  SelectorFactor,
  SelectorNumeric,
  selectorValue,
} from "../API";
import { getSelectorsForModel } from "../graphql/queries";
import FilterContext, {
  GeneralNumeric,
  GeneralSelector,
} from "./FilterContext";

interface AudienceContextValue {
  // The current selectedModelId
  selectedModelId: string | undefined;
  // Method to get a selector
  retrieveSelector: (
    id: string
  ) => GeneralSelector | GeneralNumeric | undefined;
  // Changes the selected values
  revertAudienceSelection: (variable: string, id: number) => void;
  // return list of selectors with minimum 1 selected value
  showSelectedAudience: () => (GeneralSelector | GeneralNumeric)[];
  // this method will select or deselect all values in a variable
  selectOrDeselectAll: (variable: string, selectAs: boolean) => void;
  // return list of all selectors
  showAllSelectors: () => (GeneralSelector | GeneralNumeric)[];

  //update the Max or Min Value in a selector
  setMinMaxAudienceNumeric: (
    variable: string,
    type: "min" | "max",
    value: number
  ) => void;

  // Method to get data to be used in api call
  getFiltersFromAudience: () => getChartDataFilters;
}

// selectedModelId: "" as string | undefined,
// retrieveSelector: (id: string) => undefined,
// revertAudienceSelection: (variable: string, id: number) => {},
// setMinMaxAudienceNumeric: (
//   variable: string,
//   type: "min" | "max",
//   value: number
// ) => {},
// showSelectedAudience: () => [],
// showAllSelectors: () => [],
// selectOrDeselectAll: (variable: string, selectAs: boolean) => {},

const AudienceContext = createContext<AudienceContextValue | undefined>(
  undefined
);

type AudienceContextProviderProps = {
  children: React.ReactNode;
};
export const isGeneralFactor = (
  x: GeneralNumeric | GeneralSelector
): x is GeneralSelector =>
  ["categorical", "cluster_id"].includes(x.Variable_type);

export const AudienceContextProvider = (
  props: AudienceContextProviderProps
) => {
  const { selectedModelId } = useContext(FilterContext);
  const [audienceArray, setAudienceArray] = useState<
    (GeneralSelector | GeneralNumeric)[]
  >([]);

  const isFactor = (x: SelectorFactor | SelectorNumeric): x is SelectorFactor =>
    ["categorical", "cluster_id"].includes(x.Variable_type);

  const DatabaseFetch = useCallback(async () => {
    try {
      const api_response = (await API.graphql({
        query: getSelectorsForModel,
        variables: { Model_id: selectedModelId },
      })) as {
        data: { getSelectorsForModel: getSelectorsForModelResponse };
      };
      const { data: response_data } = api_response;
      const { getSelectorsForModel: actual_list } = response_data;

      const { data, error, StatusCode }: getSelectorsForModelResponse =
        actual_list;

      if (error) {
        console.error(
          "An error occurred during getting selectors",
          error.type,
          error.message
        );
        return;
      }
      if (StatusCode !== 200) {
        console.error(
          "An error occurred during getting selectors with status code",
          StatusCode
        );
        return;
      }
      console.log("data from API", data);
      if (!data) {
        return;
      }

      // const dd = response.data.getSelectorsForModel.data.flatMap((t) => {

      console.log(data);

      const dd = data.flatMap((t) => {
        if (isFactor(t)) {
          // if (["categorical", "cluster_id"].includes(t.Variable_type)) {
          let values: selectorValue[] = [];
          if (t.Values) {
            values = t.Values.map((v) => {
              return { ...v, __typename: "selectorValue" };
            });
          }

          return {
            ...t,
            __typename: "SelectorFactor",
            Values: values,
          } as SelectorFactor;
        }
        if (t.Variable_type === "numerical") {
          return {
            ...t,
            __typename: "SelectorNumeric",
          } as SelectorNumeric;
        } else {
          console.error("We should not end up here", t);
          return [];
        }
      });

      const filteredList = dd.filter((i) => isFactor(i)) as SelectorFactor[];
      // console.log("this is categorical data", filteredList);
      if (filteredList.length > 0) {
        const a = dd.flatMap((i) => {
          const { Variable_type, Variable, Title, Category } = i;
          if (isFactor(i)) {
            const { Values: filteredValues } = i;

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
                FilterType: "Selector",
              } as GeneralSelector;
            } else {
              return [];
            }
          } else {
            if (Category) {
              return {
                ...i,
                SelectedMin: i.Min,
                SelectedMax: i.Max,
                FilterType: "Numeric",
              } as GeneralNumeric;
            } else {
              return [];
            }
          }
        });

        setAudienceArray(a);
        console.log("Setting audience array:", a);
      }

      return data;
    } catch (err) {
      console.log({ err });
      DatabaseFetch();
    }
  }, [selectedModelId]);

  useEffect(() => {
    if (selectedModelId) {
      DatabaseFetch();
    } else {
      setAudienceArray([]);
    }
    console.count("SelectedModelChanged");
  }, [selectedModelId, DatabaseFetch]);

  const retrieveSelector = (id: string) => {
    return audienceArray.filter((t) => t.Variable === id)[0];
  };

  const revertAudienceSelection = (variable: string, id: number) => {
    // console.log("oldArray", audienceArray);

    const newArray = audienceArray.map((t) => {
      if (isGeneralFactor(t)) {
        if (t.Variable === variable) {
          const newValues = t.Values.map((v) => {
            if (v.Id === id) {
              return { ...v, isSelected: !v.isSelected };
            } else return v;
          });
          return { ...t, Values: newValues };
        } else return t;
      } else return t;
    });
    console.log("newArray", newArray);

    setAudienceArray(newArray);
  };

  const setMinMaxAudienceNumeric = (
    variable: string,
    type: "min" | "max",
    value: number
  ) => {
    // console.log("oldArray", audienceArray);

    const newArray = audienceArray.map((t) => {
      if (!isGeneralFactor(t)) {
        if (t.Variable === variable) {
          if (type === "min") {
            console.log("min", t, value);

            return { ...t, SelectedMin: value };
          } else return { ...t, SelectedMax: value };
        } else return t;
      } else return t;
    });
    console.log("newArray", newArray);

    setAudienceArray(newArray);
  };

  const showSelectedAudience = () => {
    const dd = audienceArray.flatMap((t) => {
      if (isGeneralFactor(t)) {
        if (t.Values.filter((v) => v.isSelected).length > 0) {
          return t;
        }
        return [];
      } else {
        if (t.SelectedMax === t.Max && t.SelectedMin === t.Min) {
          return [];
        } else return t;
      }
    });
    return dd;
  };

  const showAllSelectors = () => {
    const dd = audienceArray;
    return dd;
  };

  const selectOrDeselectAll = (variable: string, selectAs: boolean) => {
    const newArray = audienceArray.map((t) => {
      if (isGeneralFactor(t)) {
        if (t.Variable === variable) {
          const newValues = t.Values.map((v) => {
            return { ...v, isSelected: selectAs };
          });
          return { ...t, Values: newValues };
        } else return t;
      }
      return t;
    });
    // console.log("newArray", newArray);

    setAudienceArray(newArray);
  };

  const getFiltersFromAudience = () => {
    const categorical: categoricalInput[] = [];
    const numerical: numericalInput[] = [];
    showSelectedAudience().forEach((t) => {
      if (isGeneralFactor(t)) {
        const { Variable, Values } = t;
        const selectedValues = Values.flatMap((v) => {
          if (v.isSelected) {
            return v.Id;
          }
          return [];
        });
        categorical.push({ Variable, Values: selectedValues });
      } else {
        numerical.push({
          Variable: t.Variable,
          Min: t.SelectedMin,
          Max: t.SelectedMax,
        });
      }
    });
    return {
      Categorical: categorical,
      Numerical: numerical,
    } as getChartDataFilters;
  };

  return (
    <AudienceContext.Provider
      value={{
        selectedModelId,
        retrieveSelector,
        revertAudienceSelection,
        showSelectedAudience,
        showAllSelectors,
        selectOrDeselectAll,
        setMinMaxAudienceNumeric,
        getFiltersFromAudience,
      }}
    >
      {props.children}
    </AudienceContext.Provider>
  );
};

function useAudienceContext() {
  const context = useContext(AudienceContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { AudienceContext, useAudienceContext };

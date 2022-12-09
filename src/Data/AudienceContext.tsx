import { createContext, useContext, useEffect, useState } from "react";

import React from "react";
import { SelectorFactor, SelectorNumeric, selectorValue } from "../API";
import FilterContext, { GeneralSelector } from "./FilterContext";
import response from "./response_get_selectors.json";

interface AudienceContextValue {
  // The current selectedModelId
  selectedModelId: string | undefined;
  // Method to get a selector
  retrieveSelector: (id: string) => GeneralSelector | undefined;
  // Changes the selected values
  revertAudienceSelection: (variable: string, id: number) => void;
  // return list of selectors with minimum 1 selected value
  showAudienceSelectors: () => GeneralSelector[];
  // this method will select or deselect all values in a variable
  selectOrDeselectAll: (variable: string, selectAs: boolean) => void;
}

const AudienceContext = createContext<AudienceContextValue>({
  selectedModelId: "" as string | undefined,
  retrieveSelector: (id: string) => undefined,
  revertAudienceSelection: (variable: string, id: number) => {},
  showAudienceSelectors: () => [],
  selectOrDeselectAll: (variable: string, selectAs: boolean) => {},
});

type AudienceContextProviderProps = {
  children: React.ReactNode;
};

export const AudienceContextProvider = (
  props: AudienceContextProviderProps
) => {
  const { selectedModelId } = useContext(FilterContext);
  const [audienceArray, setAudienceArray] = useState([] as GeneralSelector[]);

  useEffect(() => {
    if (selectedModelId) {
      console.log(response);
      const dd = response.data.getSelectorsForModel.data.flatMap((t) => {
        if (["categorical", "cluster_id"].includes(t.Variable_type)) {
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

      const filteredList = dd.filter(
        (i) => i.Variable_type === "categorical"
      ) as SelectorFactor[];
      // console.log("this is categorical data", filteredList);
      if (filteredList.length > 0) {
        const a = filteredList.flatMap((i: SelectorFactor) => {
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
          } else {
            return [];
          }
        });

        setAudienceArray(a);
        console.log("Setting audience array:", a);
      }
    } else {
      setAudienceArray([]);

      console.count("SelectedModelChanged");
    }
  }, [selectedModelId]);

  const retrieveSelector = (id: string) => {
    return audienceArray.filter((t) => t.Variable === id)[0];
  };

  const revertAudienceSelection = (variable: string, id: number) => {
    // console.log("oldArray", audienceArray);

    const newArray = audienceArray.map((t) => {
      if (t.Variable === variable) {
        const newValues = t.Values.map((v) => {
          if (v.Id === id) {
            return { ...v, isSelected: !v.isSelected };
          } else return v;
        });
        return { ...t, Values: newValues };
      } else return t;
    });
    // console.log("newArray", newArray);

    setAudienceArray(newArray);
  };

  const showAudienceSelectors = () => {
    const dd = audienceArray.flatMap((t) => {
      if (t.Values.filter((v) => v.isSelected).length > 0) {
        return t;
      }
      return [];
    });
    console.log(dd);
    return dd;
  };

  const selectOrDeselectAll = (variable: string, selectAs: boolean) => {
    const newArray = audienceArray.map((t) => {
      if (t.Variable === variable) {
        const newValues = t.Values.map((v) => {
          return { ...v, isSelected: selectAs };
        });
        return { ...t, Values: newValues };
      } else return t;
    });
    // console.log("newArray", newArray);

    setAudienceArray(newArray);
  };

  return (
    <AudienceContext.Provider
      value={{
        selectedModelId,
        retrieveSelector,
        revertAudienceSelection,
        showAudienceSelectors,
        selectOrDeselectAll,
      }}
    >
      {props.children}
    </AudienceContext.Provider>
  );
};

export default AudienceContext;

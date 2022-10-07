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

const FilterContext = createContext({
  data: [] as IGroup[],
  modelId: "" as string,
  setModelId: (params: any) => {},
  // selectedCluster: "" as string,
  // selectedDatabase: "" as string,
  // setSelectedCluster: (prams: any) => {},
  // setSelectedDatabase: (prams: any) => {},
});

type FilterContextProviderProps = {
  children: React.ReactNode;
};

export const FilterContextProvider = (props: FilterContextProviderProps) => {
  const [filterAudience, setFilterAudience] = useState([] as any);
  const { user, allUserData } = useContext(UserContext);
  const [data, setData] = useState([] as any[]);

  // const [selectedCluster, setSelectedCluster] = useState("");
  // const [selectedDatabase, setSelectedDatabase] = useState("");
  const [modelId, setModelId] = useState("" as any);
  const { secondId } = useParams();

  const url =
    "https://zjr6j5dwbvg4joqegn4v26ic7e.appsync-api.eu-west-1.amazonaws.com/graphql";

  useEffect(() => {
    // if (selectedCluster !== "" && cluster !== undefined) {
    //   setSelectedCluster(cluster);
    // }
    // if (selectedDatabase !== "" && id !== undefined) {
    //   setSelectedDatabase(id);
    // }

    if (modelId !== "") {
      console.log("now is here ");

      setModelId(secondId);
    }
  }, [secondId]);

  console.log(modelId);

  const Selectors = useCallback(async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: allUserData,

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query get {
          getSelectorsForModel(
              Model_id: "${modelId}"
          )
          {
              ... on SelectorFactor {
                  variable_type
                  id
                  selector
                  category
                  values{
                      id
                      value
                  }
              }
      
              ... on SelectorNumeric {
                  variable_type
                  id
                  selector
                  category
                  max
                  min
              }
          }
      }`,
      }),
    });

    const selector = await response.json();
    console.log(selector);

    const getSelectors = selector.data.getSelectorsForModel;

    if (getSelectors.data === null) {
      setFilterAudience(() => []);
    } else {
      setFilterAudience(() => getSelectors);
    }

    console.log(filterAudience);
    // console.log(getSelectors);
    // console.count("selectors");
  }, [allUserData, modelId]);

  useEffect(() => {
    if (user != null) {
      Selectors();
    }
  }, [user, Selectors, modelId]);

  //   useEffect(() => {
  //     Selectros();
  //   }, [user]);

  useEffect(() => {
    // console.count("set data");
    const tmpData = [
      {
        title: "dropdown_audition",
        items: [],
      },
      {
        title: "audition_bar",
        items: filterAudience,
      },
    ];
    setData(() => tmpData);
  }, [filterAudience]);

  return (
    // <></>
    <FilterContext.Provider
      value={{
        data: data,
        modelId,
        setModelId,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;

// Cluster: "${selectedCluster}",
// DatabaseName: "${selectedDatabase}"

// query get {
//   getSelectors(
//     Database: {
//       Cluster: "annalect-crmtesting",
//       DatabaseName: "crmtesting_dk_CRM"
//     }
//   ){
//       ... on SelectorFactor {
//           variable_type
//           selector
//           category
//           values{
//             id
//             value
//         }
//       }
//       ... on SelectorNumeric {
//           variable_type
//           selector
//           category
//           max
//           min
//       }
//   }
// }

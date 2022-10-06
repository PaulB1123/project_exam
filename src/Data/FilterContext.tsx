import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import UserContext from "./UserContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PlusIcon from "../Componets/Navigation/icons/Plus.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GenderIcon from "../Componets/Navigation/icons/Gender.png";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DefaultIcon from "../Componets/Navigation/icons/Default.png";
import { IGroup } from "../ReusableElements/Button_Navigation_Left/DragnDrop";
import React from "react";
import { useParams } from "react-router-dom";

const FilterContext = createContext({
  data: [] as IGroup[],
  selectedCluster: "" as string,
  selectedDatabase: "" as string,
  setSelectedCluster: (prams: any) => {},
  setSelectedDatabase: (prams: any) => {},
});

type FilterContextProviderProps = {
  children: React.ReactNode;
};

export const FilterContextProvider = (props: FilterContextProviderProps) => {
  const [filterAudience, setFilterAudience] = useState([] as any);
  const { user, allUserData } = useContext(UserContext);
  const [data, setData] = useState([] as any[]);

  const [selectedCluster, setSelectedCluster] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const { id, cluster } = useParams();

  // console.log(user);

  const url =
    "https://62wh6s37uvaihb63dqrylaouma.appsync-api.eu-west-1.amazonaws.com/graphql";

  const Selectors = useCallback(async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: allUserData,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query get {
          getSelectors(
            Database: {
              Cluster: "annalect-crmtesting",
              DatabaseName: "crmtesting_dk_CRM"
            }
          ){
              ... on SelectorFactor {
                  variable_type
                  selector
                  category
                  values{
                    id
                    value
                }
              }
              ... on SelectorNumeric {
                  variable_type
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

    const getSelectors = selector.data.getSelectors;
    // console.log(selector);
    setFilterAudience(() => getSelectors);
    // console.log(getSelectors);
    console.count("selectors");
  }, [allUserData, selectedCluster, selectedDatabase]);

  useEffect(() => {
    if (selectedCluster !== "" && cluster !== undefined) {
      setSelectedCluster(cluster);
    }
    if (selectedDatabase !== "" && id !== undefined) {
      setSelectedDatabase(id);
    }
  }, [id, cluster, selectedCluster, selectedDatabase]);

  useEffect(() => {
    if (user != null) {
      Selectors();
    }
  }, [user, Selectors]);

  //   useEffect(() => {
  //     Selectros();
  //   }, [user]);

  useEffect(() => {
    console.count("set data");
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
        selectedCluster,
        setSelectedCluster,
        setSelectedDatabase,
        selectedDatabase,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;

// Cluster: "${selectedCluster}",
// DatabaseName: "${selectedDatabase}"

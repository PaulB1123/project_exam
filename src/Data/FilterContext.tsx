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

const FilterContext = createContext({
  data: [] as IGroup[],
});

type FilterContextProviderProps = {
  children: React.ReactNode;
};

export const FilterContextProvider = (props: FilterContextProviderProps) => {
  const [filterAudience, setFilterAudience] = useState([] as any);
  const { user, allUserData } = useContext(UserContext);
  const [data, setData] = useState([] as any[]);

  console.log(user);

  const url =
    "https://ru3k4ksxcfcojb2dipxwrayawu.appsync-api.eu-west-1.amazonaws.com/graphql";

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
                  values
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
    console.log(getSelectors);
    console.count("selectors");
  }, [allUserData]);

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
    <FilterContext.Provider value={{ data: data }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;

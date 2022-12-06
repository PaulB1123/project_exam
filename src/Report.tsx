import "./App.css";
import "./Componets/Styles/global.css";
import Navigation from "./Componets/Navigation/Navigation";

import Dashboard from "./Componets/Dashboard/Dashboard";
import useLocalStorage from "use-local-storage";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterContext from "./Data/FilterContext";
import { useGlobalModalContext } from "./Componets/Dashboard/Modals/GlobalModal";
import { API } from "aws-amplify";
import { adminGetAccessGroup } from "./graphql/queries";
import {
  adminClientInput,
  adminGetAccessGroupData,
  AdminGetAccessGroupQuery,
  adminGetAccessGroupResponse,
  getChartDataAudience,
} from "./API";
import UserContext from "./Data/UserContext";

export function Report() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const { modelId } = useParams();
  const { loadAudienceUrl, getAudienceData } = useGlobalModalContext();

  const { setSelectedModelId, client, country } = useContext(FilterContext);
  const { accessData, setAccessData } = useContext(UserContext);

  useEffect(() => {
    console.log("report  set modelId", modelId);
    setSelectedModelId(modelId);
  }, [modelId, setSelectedModelId]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // console.log(modelId);
  useEffect(() => {
    console.log(modelId);
    getAudienceData(modelId as string);
    loadAudienceUrl(modelId as string);
  }, [modelId]);

  useEffect(() => {
    GetAccessUser();
  }, []);

  useEffect(() => {
    if (accessData !== undefined) {
      console.log(
        accessData.Report,
        accessData.Audience,
        accessData.Activation
      );
    }
  }, [accessData]);

  async function GetAccessUser() {
    try {
      const response = (await API.graphql({
        query: adminGetAccessGroup,
        variables: {
          Client: {
            Client_code: client,
            Client_country: country,
          } as adminClientInput,
        },
      })) as { data: AdminGetAccessGroupQuery };
      const { data: response_data } = response;
      const { adminGetAccessGroup: actual_list } = response_data;
      const { data, error, StatusCode }: adminGetAccessGroupResponse =
        actual_list;

      // console.log(response_data);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            console.log(data[0]);
            setAccessData(data[0]?.Resources);
          } else {
          }
        }
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="Main_App" data-theme={theme}>
      <Navigation></Navigation>
      <div className="Right_Side_Dashboard">
        <div>
          {/* <FilterComponent></FilterComponent> */}
          <Dashboard></Dashboard>

          <div className="dark_mode" onClick={switchTheme}>
            <ul>{theme === "light" ? "Dark" : "Light"} Mode</ul>
            <div className="dark_mode_icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

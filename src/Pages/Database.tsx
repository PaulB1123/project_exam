import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Database.css";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import UserContext from "../Data/UserContext";
import FilterContext from "../Data/FilterContext";
import { API } from "aws-amplify";
import { getClients, getModelsForClient } from "../graphql/queries";
import { getClientsResponse, getModelForClientResponse } from "../API";
// import { ConsoleLogger } from "@aws-amplify/core";

function Database() {
  // const [clientNewData, setClientNewData] = useState(
  //   [] as getClientsResponse[]
  // );
  // const [availableModels, setAvailableModels] = useState(
  //   [] as getModelForClientResponse[]
  // );

  // const [selectedModelId, setSelectedModelId] = useState<string | undefined>(
  //   undefined
  // );

  // const [clientClusterdata, setClientClusterdata] = useState([] as any);
  // const [clientDatabasedata, setClientDatabasedata] = useState("" as any);
  // const [selectedClient, setSelectedClient] = React.useState("");

  const [modelName, setModelName] = useState([] as any);
  // const [modelNameSelected, setModelNameSelected] = useState([] as any);

  // obiecte pe care le folosesc pentru a imi obtine filter audition
  const [metaTable, setMetaTable] = useState("" as string);
  const [databaseId, setDatabaseId] = useState("" as string);
  const [secondId, setSecondId] = useState("" as string);
  // const [modelId, setModelId] = useState("" as any);

  const { user, allUserData } = useContext(UserContext);
  const {
    data,
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
  } = useContext(FilterContext);

  return (
    <div className="database_container">
      <div className="login_left_contianer">
        <div className="logo">
          <div className="hero_logo">
            <img
              src={Annalect}
              alt="Main Menu logo "
              className="hero_logo_container"
            ></img>
          </div>
        </div>
        <div className="welcome_contianer">
          {user ? (
            <div className="text_container">
              <h1>
                Welcome to your dashboard, {user?.name} {user?.family_name}
              </h1>
              <p>Before everthing else, lets help you open your dashboards </p>
            </div>
          ) : (
            <div className="text_container">
              <h1>Welcome to your dashboard</h1>
              <p>Before everthing else, lets help you open your dashboards </p>
            </div>
          )}
        </div>

        <div className="login_contianer_box_container">
          <div className="login_contianer_box" id="selector">
            <h1 className="DatabaseH1">
              Please select the campaign you would like for your dashboard
            </h1>

            <select
              value={selectedClient}
              onChange={(event) => setSelectedClient(event.target.value)}
            >
              {clientNewData.map((item: getClientsResponse, index: any) => (
                <option key={index} value={`${item.Client_code}`}>
                  {item.Client_name}
                  {/* {item.ClientCountry} */}
                </option>
              ))}
            </select>

            <select
              value={selectedModelId}
              onChange={(event) => {
                setSelectedModelId(event.target.value);
              }}
            >
              {availableModels.map((key: any) => (
                <option key={key.Model_id} value={key.Model_id}>
                  {key.Model_name}
                </option>
                //   <option key={index} value={`${clientClusterdata[key].Cluster}`}>
                //   {clientClusterdata[key].Cluster}
                // </option>
              ))}
            </select>

            <div className="selectors_container">
              <div className="country_continer"></div>
            </div>
            <div className="button_container">
              <Link to={`/Report/${client}/${country}/${selectedModelId}`}>
                <button className="buttonDashboard">Continue</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <IntroPage></IntroPage>
    </div>
  );
}

export default Database;

// console.log(database.data.getDatabase);

// console.log(database.data.getDatabase[0].Cluster);
// console.log(clientClusterdata);

// setClusterDatabase(database.data.getDatabase);
// setSelectedCluster(`${database.data.getDatabase[0].Cluster}`);
// setSelectedDatabase(`${database.data.getDatabase[0].Databases[0]}`);

// setClientClusterdata(database.data.getDatabase);
// console.log(clientClusterdata);
// console.log(clientClusterdata[0].Databases[0].DatabaseName);
// setClientDatabasedata(clientClusterdata.Databases);

// const url =
//   "https://zjr6j5dwbvg4joqegn4v26ic7e.appsync-api.eu-west-1.amazonaws.com/graphql";

// useEffect(() => {
//   async function Mihai() {
//     try {
//       const response = (await API.graphql({
//         query: getClients,
//       })) as { data: { getClients: getClientsResponse[] } };
//       console.log(response);
//       const { data: response_data } = response;
//       const { getClients: actual_list } = response_data;
//       setClientNewData(actual_list);
//       const splitClientName = actual_list[0].Client_code.split("#");
//       setClient(splitClientName[0]);
//       setCountry(splitClientName[1]);
//       if (actual_list.length > 0) {
//         setSelectedClient(actual_list[0].Client_code);
//       }
//     } catch (err) {
//       console.log({ err });
//     }
//   }

//   if (allUserData.length > 0) {
//     Mihai();
//   }
// }, [allUserData]);
// console.log(clientNewData);

// useEffect(() => {
//   async function DatabaseFetch() {
//     try {
//       const response = (await API.graphql({
//         query: getModelsForClient,
//         variables: { Client_code: selectedClient },
//       })) as { data: { getModelsForClient: getModelForClientResponse[] } };
//       console.log(response);
//       const { data: response_data } = response;
//       const { getModelsForClient: actual_list } = response_data;
//       // console.log("Did we get here?", response_data.getClients, response);
//       setAvailableModels(actual_list);
//       setSelectedModelId(actual_list[0].Model_id);
//       // console.log(data);
//     } catch (err) {
//       console.log({ err });
//     }
//   }

//   if (selectedClient.length > 0) {
//     DatabaseFetch();
//   }
// }, [selectedClient]);

// useEffect(() => {
//   if (selectedModelId) {
//     const selectedModel = availableModels.filter(
//       (m) => m.Model_id === selectedModelId
//     );
//     if (selectedModel.length > 0) {
//       console.log(selectedModel, selectedModelId);
//     }
//   }
//   console.log(selectedModelId);
// }, [selectedModelId, availableModels]);

// Object.keys(clientClusterdata).forEach((key, index) =>
//   Object.keys(clientClusterdata[key].Databases).forEach((key, index) => {
//     console.log(clientClusterdata[key].Databases[key]);
//   })
// );

// console.log(modelId);

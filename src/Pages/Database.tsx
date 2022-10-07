import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Database.css";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import UserContext from "../Data/UserContext";
import FilterContext from "../Data/FilterContext";
// import { ConsoleLogger } from "@aws-amplify/core";

function Database() {
  const [clientNewData, setClientNewData] = useState([] as any);
  const [clientClusterdata, setClientClusterdata] = useState([] as any);
  const [clientDatabasedata, setClientDatabasedata] = useState("" as any);
  const [selectedClient, setSelectedClient] = React.useState("");
  const [client, setClient] = useState("");
  const [country, setCountry] = useState("");
  // const [clusterDatabase, setClusterDatabase] = useState([] as any);

  const [modelName, setModelName] = useState([] as any);
  // const [modelNameSelected, setModelNameSelected] = useState([] as any);

  // obiecte pe care le folosesc pentru a imi obtine filter audition
  const [metaTable, setMetaTable] = useState("" as any);
  const [databaseId, setDatabaseId] = useState("" as any);
  const [secondId, setSecondId] = useState("" as any);
  // const [modelId, setModelId] = useState("" as any);

  const { user, allUserData } = useContext(UserContext);
  const { data, modelId, setModelId } = useContext(FilterContext);

  const url =
    "https://zjr6j5dwbvg4joqegn4v26ic7e.appsync-api.eu-west-1.amazonaws.com/graphql";

  useEffect(() => {
    const Mihai = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: allUserData,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query get {
            getClients{
                Client_name
                Client_code
            }
        }`,
        }),
      });

      const dataManipulated = await response.json();
      setSelectedClient(`${dataManipulated.data.getClients[0].Client_code}`);
      setClientNewData(dataManipulated.data.getClients);
    };

    if (allUserData.length > 0) {
      Mihai();
    }
  }, [allUserData]);

  useEffect(() => {
    const DatabaseFetch = async () => {
      const demo = selectedClient.split("#");
      setClient(demo[0]);
      setCountry(demo[1]);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: allUserData,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query get($Client_code: String!) {
            getModelsForClient(
                Client_code: $Client_code
            ){
                Model_id
                Model_name
                meta_table
                Database_id
            }
        }`,
          variables: { Client_code: selectedClient },
        }),
      });
      const database = await response.json();
      setClientDatabasedata(
        `${database.data.getModelsForClient[0].Model_name}`
      );
      setModelName(database.data.getModelsForClient);

      database.data.getModelsForClient.map((item: any) => {
        setModelId(item.Model_id);
        setMetaTable(item.meta_table);
        setDatabaseId(item.Database_id);
        setSecondId(item.Model_id);
      });
    };

    if (selectedClient.length > 0) {
      DatabaseFetch();
    }
  }, [allUserData, selectedClient, setModelId]);

  Object.keys(clientClusterdata).forEach((key, index) =>
    Object.keys(clientClusterdata[key].Databases).forEach((key, index) => {
      console.log(clientClusterdata[key].Databases[key]);
    })
  );

  console.log(modelId);

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
              {clientNewData.map((item: any, index: any) => (
                <option key={index} value={`${item.Client_code}`}>
                  {item.Client_name}
                  {/* {item.ClientCountry} */}
                </option>
              ))}
            </select>

            <select
              value={clientDatabasedata}
              onChange={(event) => {
                setClientDatabasedata(event.target.value);
                setModelId(secondId);
                console.log(secondId);
              }}
            >
              {Object.keys(modelName).map((key, index) => (
                <option key={index} value={`${modelName[key].Model_name}`}>
                  {modelName[key].Model_name}
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
              <Link
                to={`/Report/${client}/${country}/${clientDatabasedata}/${secondId}`}
              >
                <button className="buttonDashboard">Contiune</button>
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

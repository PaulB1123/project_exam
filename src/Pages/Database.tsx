import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Database.css";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import UserContext from "../Data/UserContext";
import FilterContext from "../Data/FilterContext";
import { ConsoleLogger } from "@aws-amplify/core";

function Database() {
  const [clientNewData, setClientNewData] = useState([] as any);
  const [clientClusterdata, setClientClusterdata] = useState([] as any);
  const [clientDatabasedata, setClientDatabasedata] = useState([] as any);
  const [selectedClient, setSelectedClient] = React.useState("");
  const [client, setClient] = useState("");
  const [country, setCountry] = useState("");
  /*   const [selectedCluster, setSelectedCluster] = React.useState("");
  const [selectedDatabase, setSelectedDatabase] = React.useState(""); */
  const [clusterDatabase, setClusterDatabase] = useState([] as any);

  const { user, allUserData } = useContext(UserContext);
  const {
    data,
    selectedCluster,
    selectedDatabase,
    setSelectedCluster,
    setSelectedDatabase,
  } = useContext(FilterContext);

  const url =
    "https://ru3k4ksxcfcojb2dipxwrayawu.appsync-api.eu-west-1.amazonaws.com/graphql";

  // console.log(data);
  // console.log(selectedClient);

  useEffect(() => {
    // console.log(allUserData);
    const Mihai = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: allUserData,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "query my { getClients(Environment: DEMO){ ClientCode  ClientName }}",
        }),
      });

      const dataManipulated = await response.json();
      console.log(dataManipulated);

      setSelectedClient(`${dataManipulated.data.getClients[0].ClientCode}`);
      setClientNewData(dataManipulated.data.getClients);
      // setClientNewData(dataManipulated);
    };
    if (allUserData.length > 0) {
      Mihai();
      // console.log(selectedClient);
      // console.log(clientNewData);
    }
  }, [allUserData]);

  useEffect(() => {
    const DatabaseFetch = async () => {
      const demo = selectedClient.split("#");
      const Client = demo[0];
      const Country = demo[1];
      setClient(demo[0]);
      setCountry(demo[1]);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: allUserData,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query get {
              getDatabase(Client: {
                  ClientCode: "${Client}"
                  ClientCountry: "${Country}"
              }){
                Cluster
                Databases{
                  DatabaseName
                  Id
                 }
              }
          }`,
        }),
      });
      const database = await response.json();
      console.log(database);
      // console.log(database.data.getDatabase);

      // console.log(database.data.getDatabase[0].Cluster);
      // console.log(clientClusterdata);

      // setClusterDatabase(database.data.getDatabase);
      // setSelectedCluster(`${database.data.getDatabase[0].Cluster}`);
      // setSelectedDatabase(`${database.data.getDatabase[0].Databases[0]}`);

      setClientClusterdata(database.data.getDatabase);
      console.log(clientClusterdata);
      console.log(clientClusterdata[0].Databases[0].DatabaseName);
      setClientDatabasedata(clientClusterdata.Databases);
    };
    if (selectedClient.length > 0) {
      DatabaseFetch();
    }
  }, [
    allUserData,
    selectedClient,
    selectedDatabase,
    setSelectedCluster,
    setSelectedDatabase,
  ]);

  Object.keys(clientClusterdata).forEach((key, index) =>
    Object.keys(clientClusterdata[key].Databases).forEach((key, index) => {
      console.log(clientClusterdata[key].Databases[key]);
    })
  );

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
                <option key={index} value={`${item.ClientCode}`}>
                  {item.ClientCode}
                  {/* {item.ClientCountry} */}
                </option>
              ))}
            </select>

            <select
              value={selectedCluster}
              onChange={(event) => setSelectedCluster(event.target.value)}
            >
              {Object.keys(clientClusterdata).map((key, index) => (
                <option key={index} value={`${clientClusterdata[key].Cluster}`}>
                  {clientClusterdata[key].Cluster}
                </option>
              ))}
            </select>

            <select
              value={selectedDatabase}
              onChange={(event) => setSelectedDatabase(event.target.value)}
            >
              {/* {Object.keys(clientClusterdata).map((key, index) =>
                Object.keys(clientClusterdata[key].Databases).map(
                  (key, index) => {
                    <option
                      key={index}
                      value={`${clientClusterdata[key].Databases[key]}`}
                    >
                      {clientClusterdata[key].Databases[key].DatabaseName}
                    </option>;
                    // console.log(clientClusterdata[key].Databases[key].Id);
                  }
                )
              )} */}

              {clientDatabasedata.map((item: any, index: any) => (
                <option key={index} value={`${item}`}>
                  {item}
                </option>
              ))}
            </select>

            <div className="selectors_container">
              <div className="country_continer"></div>
            </div>
            <div className="button_container">
              <Link
                to={`/Report/${client}/${country}/${selectedCluster}/${selectedDatabase}`}
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

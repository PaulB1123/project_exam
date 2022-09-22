import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Database.css";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
// import { ClientRequest } from "http";
import ClientContext from "../Data/ClientContext";
import UserContext from "../Data/UserContext";
import FilterContext from "../Data/FilterContext";
// import Croatia from "./hr.png";

interface Client {
  ClientCode: string;
  ClientName: string;
  ClientCountry: string;
}

function Database() {
  const [clientNewData, setClientNewData] = useState([] as any);
  const [clientClusterdata, setClientClusterdata] = useState([] as any);
  const [clientDatabasedata, setClientDatabasedata] = useState([] as any);
  // const [filterAudience, setFilterAudience] = useState([] as any);
  const [selectedClient, setSelectedClient] = React.useState("MCD1");
  const [selectedCluster, setSelectedCluster] = React.useState("");
  const [selectedDatabase, setSelectedDatabase] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("DK");
  const [selectedID, setSelectedID] = React.useState("1");
  // const { clientData } = useContext(ClientContext);
  const { user, allUserData } = useContext(UserContext);
  const { data } = useContext(FilterContext);

  // var emojiFlags = require("emoji-flags");

  const url =
    "https://ru3k4ksxcfcojb2dipxwrayawu.appsync-api.eu-west-1.amazonaws.com/graphql";

  const DatabaseFetch = useCallback(async () => {
    const Country = selectedClient.split("/")[1];
    const Client = selectedClient.split("/")[0];

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
                Databases
               Cluster
            }
        }`,
      }),
    });
    const database = await response.json();
    console.log(database);

    setClientClusterdata(database.data.getDatabase);
    setSelectedCluster(`${database.data.getDatabase[0].Cluster}`);

    setClientDatabasedata(database.data.getDatabase[0].Databases);
    setSelectedDatabase(`${database.data.getDatabase[0].Databases[0]}`);

    console.log(selectedDatabase);

    // console.log(database.data.getDatabase[0].Databases);
  }, [allUserData]);

  console.log(data);
  // const Selectros = async () => {
  //   // const Country = selectedClient.split("/")[1];
  //   // const Client = selectedClient.split("/")[0];

  //   console.log(selectedCluster);
  //   console.log(selectedDatabase);
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Authorization: allUserData,

  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `query get {
  //         getSelectors(
  //             Database: {

  //                 Cluster: "${selectedCluster}",
  //                 DatabaseName:  "${selectedDatabase}"
  //             }
  //         ){
  //             ... on SelectorFactor {
  //                 variable_type
  //                 selector
  //                 category
  //                 values
  //             }
  //             ... on SelectorNumeric {
  //                 variable_type
  //                 selector
  //                 category
  //                 max
  //                 min
  //             }
  //         }
  //     }`,
  //     }),
  //   });

  //   const selector = await response.json();

  //   setFilterAudience(selector);
  // };

  // Selectros();

  // console.log(clientDatabasedata);
  // console.log(selectedCluster);

  useEffect(() => {
    const Mihai = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: allUserData,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "query my { getClients(Environment: DEMO){ ClientCode ClientCountry ClientName }}",
        }),
      });
      const dataManipulated = await response.json();
      console.log(dataManipulated);

      setClientNewData(dataManipulated.data.getClients);
      setSelectedClient(
        `${dataManipulated.data.getClients[0].ClientCode}/${dataManipulated.data.getClients[0].ClientCountry}`
      );
    };
    if (allUserData.length > 0) {
      Mihai();
      // console.log(clientNewData);
    }
  }, [allUserData]);

  useEffect(() => {
    if (selectedClient.length > 0) {
      DatabaseFetch();
    }
  }, [selectedClient, DatabaseFetch]);

  // useEffect(() => {
  //   if (selectedDatabase.length > 0) {
  //     Selectros();
  //   }
  // }, [selectedDatabase]);

  // console.log(filterAudience);

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
                <option
                  key={index}
                  value={`${item.ClientCode}/${item.ClientCountry}`}
                  // style={{ backgroundImage: `url(${Croatia})` }}
                >
                  <span>
                    {item.ClientName}---{item.ClientCountry}
                  </span>
                </option>
              ))}
            </select>

            <select
              value={selectedCluster}
              onChange={(event) => setSelectedCluster(event.target.value)}
            >
              {clientClusterdata.map((item: any, index: any) => (
                <option key={index} value={`${item.Cluster}`}>
                  {item.Cluster}
                </option>
              ))}
            </select>

            <select
              value={selectedDatabase}
              onChange={(event) => setSelectedDatabase(event.target.value)}
            >
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
              <Link to={`/Report/${selectedClient}/${selectedCluster}`}>
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

// Cluster: "${selectedCluster}",
// DatabaseName:  "${selectedDatabase}"

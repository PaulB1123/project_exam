import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Database.css";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
// import { ClientRequest } from "http";
import ClientContext from "../Data/ClientContext";
import UserContext from "../Data/UserContext";

interface Client {
  ClientCode: string;
  ClientName: string;
  ClientCountry: string;
}

function Database() {
  const [clientNewData, setClientNewData] = useState([] as any);
  const [clientDatabasedata, setClientDatabasedata] = useState([] as any);
  const [selectedClient, setSelectedClient] = React.useState("MCD1");
  const [selectedDatabase, setSelectedDatabase] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("DK");
  const [selectedID, setSelectedID] = React.useState("1");
  // const { clientData } = useContext(ClientContext);
  const { user, allUserData } = useContext(UserContext);
  var emojiFlags = require("emoji-flags");

  const url =
    "https://ozp4tuy4hbdoddehrwuitnhnmm.appsync-api.eu-west-1.amazonaws.com/graphql";

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

  const DatabaseFetch = async () => {
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
            getDatabase(Database: {
                ClientCode: "${Client}"
                ClientCountry: "${Country}"
            }){
                DatabaseName
                DatabaseId
            }
        }`,
      }),
    });
    const database = await response.json();
    setClientDatabasedata(database.data.getDatabase);
    setSelectedDatabase(`${database.data.getDatabase[0].DatabaseId}}`);
  };

  console.log(clientDatabasedata);

  useEffect(() => {
    if (allUserData.length > 0) {
      Mihai();
      console.log(clientNewData);
    }
  }, [allUserData]);

  useEffect(() => {
    if (selectedClient.length > 0) {
      DatabaseFetch();
    }
  }, [selectedClient]);

  console.log(selectedClient);

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
                >
                  {item.ClientName}---{item.ClientCountry}
                </option>
              ))}
            </select>

            <select
              value={selectedClient}
              onChange={(event) => setSelectedDatabase(event.target.value)}
            >
              {clientDatabasedata.map((item: any, index: any) => (
                <option key={index} value={`${item.DatabaseId}`}>
                  {item.DatabaseName}---{item.DatabaseId}
                </option>
              ))}
            </select>

            <div className="selectors_container">
              <div className="country_continer"></div>
            </div>
            <div className="button_container">
              <Link to={`/Report/${selectedClient}/${selectedDatabase}`}>
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

// const NewClientObject = dataGet.filter(
//   (item: any) => item.ClientName == "McDonalds"
// )[0];
// console.log(NewClientObject);

// const NewCountryObject = NewClientObject.ClientCountries.filter(
//   (item: any) => item.ClientCountry == "SE"
// )[0];

// const NewDatabaseArray = NewCountryObject.Databases.map((Database) => {
//   console.log(Database);
// });

// if (clientNewData.length > 0) {
//   console.log(clientNewData);
//   clientNewData.map((item: any) => {
//     console.log(item.ClientCountry);
//   });
// } else console.log("this is not working ");

// {console.log(clientNewData.data.getClients)}

// console.log(clientNewData.ClientCode);

{
  /* <div className="client_continer">
                <div>
                  <label>Client</label>
                  <select
                    value={selectedClient}
                    onChange={(event) => setSelectedClient(event.target.value)}
                  >
                    <option value={"MCD"}>MCD_DK </option>
                    <option value={"MCD"}>MCD_SE</option>
                    <option value={"CGM"}>CGM</option>
                    <option value={"MGF"}>MGF</option>
                    <option value={"GOPGF"}>GOPGF</option>
                  </select>
                </div>

                <div>
                  <label>Contry</label>
                  <select
                    value={selectedCountry}
                    onChange={(event) => setSelectedCountry(event.target.value)}
                  >
                    <option value={"DK"}>
                      DK {emojiFlags.DK.emoji} &#128512;
                    </option>
                    <option value={"NOR"}>NOR</option>
                    <option value={"SWE"}>SWE</option>
                    <option value={"FIN"}>FIN</option>
                  </select>
                </div>

                <div>
                  <label>ID</label>
                  <select
                    value={selectedID}
                    onChange={(event) => setSelectedID(event.target.value)}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                  </select>
                </div>
              </div> */
}

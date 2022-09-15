import React, { useContext, useState } from "react";
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
  //   const { value, setValue } = useContext(UserContext);
  const [isOpenClient, setOpenClient] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClient, setIsActiveClient] = useState(false);

  const [selectedClient, setSelectedClient] = React.useState("MCD");
  const [selectedCountry, setSelectedCountry] = React.useState("DK");
  const [selectedID, setSelectedID] = React.useState("1");
  const [clients, setclients] = useState([]);
  const { clientData } = useContext(ClientContext);
  const { user } = useContext(UserContext);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  const handleClickClient = () => {
    setOpenClient(!isOpenClient);
    setIsActiveClient((current) => !current);
  };

  console.log(clientData);

  // console.log(clients);

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
          {/* <AuthentificatedUserContext.Consumer>
            {(value) => <h1> {value.attributes.name} </h1>}
          </AuthentificatedUserContext.Consumer> */}

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

        {/* <div>{value}</div> */}
        {/* <button onClick={() => setValue("hey")}>change value</button> */}

        <div className="login_contianer_box_container">
          <div className="login_contianer_box" id="selector">
            <h1 className="DatabaseH1">
              Please select the campaign you would like for your dashboard
            </h1>
            <div className="selectors_container">
              <div className="client_continer">
                <div>
                  <label>Client</label>
                  <select
                    value={selectedClient}
                    onChange={(event) => setSelectedClient(event.target.value)}
                  >
                    <option value={"MCD"}>MCD</option>
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
                    <option value={"DK"}>DK</option>
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
              </div>

              <div className="country_continer"></div>
            </div>
            <div className="button_container">
              <Link
                to={`/Report/${selectedClient}/${selectedCountry}/${selectedID}`}
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

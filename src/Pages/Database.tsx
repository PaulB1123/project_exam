import React, { useContext, useState } from "react";
import { UserContext } from "../UserContex/UserContext";
import { Link } from "react-router-dom";
import "./Database.css";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import ArrrowdownIcon from "../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../Componets/Navigation/icons/ArrowUp.svg";

import { ClientRequest } from "http";
import ClientContext from "../Data/ClientContext";

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
          <div className="text_container">
            <h1>Welcome to your dashboard</h1>
            <p>Before everthing else, lets help you open your dashboards </p>
          </div>
        </div>

        {/* <div>{value}</div> */}
        {/* <button onClick={() => setValue("hey")}>change value</button> */}

        <div className="login_contianer_box_container">
          <div className="login_contianer_box" id="selector">
            <h1 className="DatabaseH1">
              Please select the campaign you would like for your dashboard
            </h1>
            <div>
              <div className="client_continer">
                <div>
                  <select
                    value={selectedClient}
                    onChange={(event) => setSelectedClient(event.target.value)}
                  >
                    <option value={"MCD"}>MCD</option>
                    <option value={"CGM"}>CGM</option>
                    <option value={"MGF"}>MGF</option>
                    <option value={"GOPGF"}>GOPGF</option>
                  </select>

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
              </div>

              <select
                value={selectedID}
                onChange={(event) => setSelectedID(event.target.value)}
              >
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
              </select>

              <div className="country_continer"></div>
            </div>
            <Link
              to={`/Report/${selectedClient}/${selectedCountry}/${selectedID}`}
            >
              <button className="button">Contiune</button>
            </Link>
          </div>
        </div>
      </div>
      <IntroPage></IntroPage>
    </div>
  );
}

export default Database;

{
  /* <div>
                  <button
                    type="button"
                    className="Reports_button"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <div className="filterbutton" id="contry_label">
                      <div className="filterbutton_container">
                        <li>Country</li>
                      </div>
                      {isActive ? (
                        <img src={ArrrowupIcon}></img>
                      ) : (
                        <img src={ArrrowdownIcon}></img>
                      )}
                    </div>
                  </button>
                </div>
                {isOpen && (
                  <div className="contry_dropdown">
                    <div className="ul">
                      <li>Denamrk</li>
                      <li>Denamrk</li>
                      <li>Denamrk</li>
                    </div>
                  </div>
                )} */
}

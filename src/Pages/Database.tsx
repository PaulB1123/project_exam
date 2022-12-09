import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Database.css";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import UserContext from "../Data/UserContext";
import FilterContext from "../Data/FilterContext";
import { ClientItem } from "../API";

function Database() {
  const { user } = useContext(UserContext);
  const {
    client,
    country,
    clientNewData,
    availableModels,
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

            {/* this is comeniting out but is very very very good stuff  */}
            <select
              value={selectedClient}
              onChange={(event) => setSelectedClient(event.target.value)}
            >
              {clientNewData.map((item: ClientItem, index: any) => (
                <option key={index} value={`${item.Client_code}`}>
                  {item.Client_name}
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

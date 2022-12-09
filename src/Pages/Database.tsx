import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ClientItem } from "../API";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import AudienceContext from "../Data/AudienceContext";
import FilterContext from "../Data/FilterContext";
import UserContext from "../Data/UserContext";
import "./Database.css";
import "./LogIn.css";

function Database() {
  const { user } = useContext(UserContext);
  const {
    client,
    country,
    clientNewData,
    availableModels,
    // selectedModelId,
    setSelectedModelId,
    selectedClient,
    setSelectedClient,
  } = useContext(FilterContext);
  const {
    selectedModelId,
    retrieveSelector,
    revertAudienceSelection,
    showAudienceSelectors,
    selectOrDeselectAll,
  } = useContext(AudienceContext);

  const selector = retrieveSelector("Gender");
  const selector2 = retrieveSelector("main_region");
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
              <p>Before everything else, lets help you open your dashboards </p>
            </div>
          ) : (
            <div className="text_container">
              <h1>Welcome to your dashboard</h1>
              <p>Before everything else, lets help you open your dashboards </p>
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

        <div>
          <h1>Test</h1>
          <p>{selectedModelId}</p>
          <div>
            {selector && (
              <div>
                <h2>You have chosen {selector.Title}</h2>
                <button
                  onClick={() => selectOrDeselectAll(selector.Variable, true)}
                >
                  SelectAll
                </button>
                <button
                  onClick={() => selectOrDeselectAll(selector.Variable, false)}
                >
                  DeselectAll
                </button>
                <div className="temp">
                  {selector.Values.map((v) => (
                    <div key={v.Id} className="temp_child">
                      <p>
                        {v.Id} {v.Value}
                      </p>
                      <button
                        onClick={() =>
                          revertAudienceSelection(selector.Variable, v.Id)
                        }
                      >
                        {v.isSelected ? "Selected" : "Not Selected"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {selector2 && (
              <div>
                <h2>You have chosen {selector2.Title}</h2>
                <div className="temp">
                  {selector2.Values.map((v) => (
                    <div key={v.Id} className="temp_child">
                      <p>
                        {v.Id} {v.Value}
                      </p>
                      <button
                        onClick={() =>
                          revertAudienceSelection(selector2.Variable, v.Id)
                        }
                      >
                        {v.isSelected ? "Selected" : "Not Selected"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {showAudienceSelectors().map((s) => (
            <div key={s.Variable}>
              <h3>{s.Title}</h3>
              <div>
                {s.Values.map(
                  (v) =>
                    v.isSelected && (
                      <button
                        key={v.Id}
                        onClick={() =>
                          revertAudienceSelection(s.Variable, v.Id)
                        }
                      >
                        {v.Value}
                      </button>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <IntroPage></IntroPage>
    </div>
  );
}

export default Database;

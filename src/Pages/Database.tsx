import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClientItem } from "../API";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import AudienceContext, { isGeneralFactor } from "../Data/AudienceContext";
import FilterContext, {
  GeneralNumeric,
  GeneralSelector,
} from "../Data/FilterContext";
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
    showSelectedAudience,
    selectOrDeselectAll,
    showAllSelectors,
    setMinMaxAudienceNumeric,
  } = useContext(AudienceContext);

  const [selectorItem1, setSelectorItem1] = useState("Gender");

  const [selector1, setSelector1] = useState<
    GeneralSelector | GeneralNumeric | undefined
  >();

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  useEffect(() => {
    const localSelector = retrieveSelector(selectorItem1);
    if (localSelector) {
      setSelector1(localSelector);
      if (!isGeneralFactor(localSelector)) {
        setMinValue(localSelector.SelectedMin);
        setMaxValue(localSelector.SelectedMax);
      }
    }
  }, [selectorItem1, retrieveSelector]);

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

        <div className="login_container_box_container">
          <div className="login_container_box" id="selector">
            <h1 className="DatabaseH1">
              Please select the campaign you would like for your dashboard
            </h1>

            {/* this is commenting out but is very very very good stuff  */}
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
            <div>
              <div className="temp2">
                {showAllSelectors().map((v) => (
                  <div
                    key={v.Variable}
                    className="temp_child2"
                    onClick={() => setSelectorItem1(v.Variable)}
                  >
                    {v.Title}
                  </div>
                ))}
              </div>
            </div>
            {selector1 && (
              <div>
                <h2>You have chosen {selector1.Title}</h2>
                {isGeneralFactor(selector1) && (
                  <div>
                    <button
                      onClick={() =>
                        selectOrDeselectAll(selector1.Variable, true)
                      }
                    >
                      SelectAll
                    </button>
                    <button
                      onClick={() =>
                        selectOrDeselectAll(selector1.Variable, false)
                      }
                    >
                      DeselectAll
                    </button>
                  </div>
                )}

                <div className="temp">
                  {isGeneralFactor(selector1) ? (
                    selector1.Values.map((v) => (
                      <div key={v.Id} className="temp_child">
                        <p>
                          {v.Id} {v.Value}
                        </p>
                        <button
                          onClick={() => {
                            revertAudienceSelection(selector1.Variable, v.Id);
                          }}
                        >
                          {v.isSelected ? "Selected" : "Not Selected"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="temp_child">
                      <p>
                        {selector1.Title} : {selector1.Min} - {selector1.Max}
                      </p>
                      <div>Selected MinValue value: {minValue}</div>
                      <input
                        value={minValue}
                        onChange={(e) => setMinValue(Number(e.target.value))}
                      />
                      <button
                        className="buttonDashboard"
                        onClick={() => {
                          setMinMaxAudienceNumeric(
                            selector1.Variable,
                            "min",
                            minValue
                          );
                        }}
                      >
                        SetNewMinValue
                      </button>
                      <div>Selected MaxValue value: {maxValue}</div>
                      <input
                        value={maxValue}
                        onChange={(e) => {
                          setMaxValue(Number(e.target.value));
                        }}
                      />
                      <button
                        className="buttonDashboard"
                        onClick={() => {
                          console.log("min", minValue, "max", maxValue);

                          setMinMaxAudienceNumeric(
                            selector1.Variable,
                            "max",
                            maxValue
                          );
                        }}
                      >
                        SetMaxValue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {showSelectedAudience().map((s) => (
            <div key={s.Variable}>
              <h3>{s.Title}</h3>
              <div>
                {isGeneralFactor(s) ? (
                  s.Values.map(
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
                  )
                ) : (
                  <div>
                    <p>
                      {s.SelectedMin}-{s.SelectedMax}
                    </p>
                  </div>
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

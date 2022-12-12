import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";

import { useEffect, useState, useContext, useMemo } from "react";
import * as React from "react";
import ReportIcon from "../../Componets/Navigation/icons/Reports.svg";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import SegmentIcon from "../../Componets/Filters/icons/Segment.svg";
import Filter from "../../Componets/Navigation/icons/Filter.svg";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../../Componets/Dashboard/Modals/GlobalModal";
import FilterContext, {
  GeneralNumeric,
  GeneralSelector,
} from "../../Data/FilterContext";
import DragnDrop from "./DragnDrop";
import Modal from "../../Componets/Filters/Modal";
import { Id } from "react-beautiful-dnd";
import UserContext from "../../Data/UserContext";
// import AudienceContext from "../../Data/AudienceContext";
import {
  isGeneralFactor,
  useAudienceContext,
} from "../../Data/AudienceContext";
import { Dropdown } from "rsuite";
import OkayIcon from "../../Componets/Navigation/icons/Okay.svg";

export function DashboardsButton() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);
  const { user, admin, setAdmin, accessData } = useContext(UserContext);
  const { ReportsList, setitemDelteReport } = useContext(FilterContext);
  const {
    setSelectionArray,
    DashboardSelectedName,
    setDashboardSelectedName,
    setDasdboardDefault,
    setSelectedDasboard,
  } = useGlobalModalContext();

  const [checkReportsList, setCheckReportsList] = useState(false);

  const [DefaultDasboard, setDefaultDasboard] = useState();
  const [DefaultDasboardID, setDefaultDasboardID] = useState("");
  const [DashboardSelectedID, setDashboardSelectedID] = useState<string>();

  const handleClickReports = () => {
    setOpenReports(!isOpenReports);
    setIsActiveReports((current) => !current);
  };

  function deleteReport(id: string) {
    // console.log(id);
    setitemDelteReport(id);
  }

  function selectReportCharts(
    Audiences: Array<object>,
    DashbaordID: string,
    Dashboard_name: string
  ) {
    console.log(Audiences);

    setDashboardSelectedID(DashbaordID);
    setSelectionArray(Audiences);
    setSelectedDasboard(true);
    setDashboardSelectedName(Dashboard_name);
  }

  useEffect(() => {
    // console.log(ReportsList);
    if (ReportsList !== undefined) {
      setCheckReportsList(true);
      ReportsList.map((id: any) => {
        if (id.Is_default === true) {
          setDefaultDasboard(id.Charts);
          setDefaultDasboardID(id.Dashboard_id);
          setDashboardSelectedID(id.Dashboard_id);
          setDashboardSelectedName(id.Dashboard_name);
        }
      });
    } else {
      setCheckReportsList(false);
    }
  }, [ReportsList]);

  useEffect(() => {
    // console.log(DashboardSelectedName);

    if (
      DefaultDasboard !== undefined &&
      DefaultDasboardID !== undefined &&
      DashboardSelectedName !== undefined
    ) {
      if (DefaultDasboardID === DashboardSelectedID) {
        selectReportCharts(
          DefaultDasboard,
          DefaultDasboardID,
          DashboardSelectedName
        );
      }
    }
  }, [DefaultDasboard]);

  function setDashboardDefault(DashbaordDefaultID: any) {
    // console.log(DashbaordDefaultID);
    setDasdboardDefault(DashbaordDefaultID);
    // console.log(DashboardDefault,
    //   setDasdboardDefault);
  }

  return (
    <>
      <button
        type="button"
        className="Reports_button"
        onClick={() => {
          handleClickReports();
        }}
      >
        <div
          className="filterbutton"
          style={{
            backgroundColor: isActiveReports
              ? "var(--audience-background-hover-plus)"
              : "var(--background)",
          }}
        >
          <div className="filterbutton_container">
            {isActiveReports ? (
              <img src={ReportIcon} alt=""></img>
            ) : (
              <img src={ReportIcon} alt=""></img>
            )}
            <li>Dashboards</li>
          </div>
          {isActiveReports ? (
            <img src={ArrrowupIcon} alt=""></img>
          ) : (
            <img src={ArrrowdownIcon} alt=""></img>
          )}
        </div>

        <div></div>
      </button>
      {isActiveReports && (
        <div>
          {checkReportsList === true
            ? ReportsList.map((id: any) => (
                <div
                  className={isActiveReports ? "main_container" : "hidden"}
                  key={id.Dashboard_id}
                >
                  <div
                    className="dropDown_button"
                    id={
                      DashboardSelectedID === id.Dashboard_id
                        ? "dashboard_selected"
                        : "dahsboard_notSelected"
                    }
                  >
                    <li className="audiences_saved">
                      <span
                        className="element_dashboard"
                        onClick={() =>
                          selectReportCharts(
                            id.Charts,
                            id.Dashboard_id,
                            id.Dashboard_name
                          )
                        }
                      >
                        {id.Dashboard_name}
                      </span>
                      {accessData.Report === true ? (
                        <div
                          className="PlusIcon_container"
                          id={
                            DefaultDasboardID === id.Dashboard_id
                              ? "default_icon_default"
                              : "default_icon_normal"
                          }
                          onClick={() => setDashboardDefault(id.Dashboard_id)}
                        ></div>
                      ) : (
                        <></>
                      )}

                      {accessData.Report === true ? (
                        <div
                          className="PlusIcon_container"
                          id="DeleteButton_container"
                          onClick={() => deleteReport(id.Dashboard_id)}
                        >
                          <div className="DeleteButton"></div>
                        </div>
                      ) : (
                        <div
                          className="PlusIcon_container"
                          id="user_view"
                        ></div>
                      )}
                    </li>
                  </div>
                </div>
              ))
            : console.log("checkReport is false")}

          {/* <div className="button_container">
            <button
              className="button_filter"
              id="openModalBtn"
              onClick={() => {
                // createModal();
              }}
            >
              <div>Add Blank Dashboard</div>
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}

export function AudiencesButton() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);
  const [arrayWithAudiences, setArrayWithAudiences] = useState([]) as any;
  const [checkLi, setCheckLi] = useState("");
  const { message, inputarr, loadAudienceUrl } = useGlobalModalContext();
  // const { audienceList } = useContext(FilterContext);
  const { showModal, audienceList } = useGlobalModalContext();
  const [showDraggableList, setShowDraggableList] = useState(false);
  const { user, admin, setAdmin, accessData } = useContext(UserContext);

  useEffect(() => {
    if (message !== undefined) {
      setArrayWithAudiences([message]);
    }
  }, [message]);

  const handleClickAudienceContainer = () => {
    setOpenReports(!isOpenReports);
    setIsActiveReports((current) => !current);
  };

  const handelclickAudience = (key: string) => {
    setCheckLi(key);
    loadAudienceUrl(key);
    // console.log(key);
  };

  const createModal = () => {
    showModal(MODAL_TYPES.UPDATE_MODAL, {
      title: "Create instance form",
      confirmBtn: "Save",
    });
  };

  useEffect(() => {
    // console.log(audienceList);
  }, [audienceList]);

  return (
    <>
      <button
        type="button"
        className="Reports_button"
        onClick={() => {
          handleClickAudienceContainer();
        }}
      >
        {isOpenReports ? (
          <div className="filterbutton_Open">
            <div className="filterbutton_container">
              <img src={Filter} alt="this is filter"></img>
              <li>Audiences</li>
            </div>
            {isActiveReports ? (
              <img src={ArrrowupIcon} alt=""></img>
            ) : (
              <img src={ArrrowdownIcon} alt=""></img>
            )}
          </div>
        ) : (
          <div id="dashboard_button" className="filterbutton">
            <div className="filterbutton_container">
              <img src={Filter} alt="this is filter"></img>
              <li>Audiences</li>
            </div>
            {isActiveReports ? (
              <img src={ArrrowupIcon} alt=""></img>
            ) : (
              <img src={ArrrowdownIcon} alt=""></img>
            )}
          </div>
        )}
      </button>
      {isOpenReports && (
        <div className="Opened_Audience_button">
          <div className="Dropdown_container_drag_and_drop">
            {audienceList.map((i: any) => {
              return (
                <li
                  key={i.Audience_id}
                  onClick={() => handelclickAudience(i.Audience_id)}
                  className="audiences_saved"
                >
                  <DragnDrop
                    name={i.Audience_name}
                    id={i.Audience_id}
                  ></DragnDrop>
                </li>
              );
            })}

            {accessData.Audience === true ? (
              <div className="button_container">
                <button
                  className="button_filter"
                  id="openModalBtn"
                  onClick={() => {
                    createModal();
                  }}
                >
                  <div>Add Audience</div>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function AudiencesButtonOriginal() {
  const [isOpenReports, setOpenReports] = React.useState(false);
  const [isActiveReports, setIsActiveReports] = useState(false);
  const [isOpenBurgerMenu, setOpenBurgerMenu] = useState(false);
  const [isActiveBurgerMenu, setIsActiveBurgerMenu] = useState(false);
  const [isOpenSelectors, setOpenSelectors] = useState(false);
  const [isActiveSelectors, setIsActiveSelectors] = useState(false);
  const [isSelectorOpenMenu, setSelectorOpenMenu] = useState(false);
  const [isOpenSelectorMenu, setIsOpenSelectorMenu] = useState(false);
  const [itemClicked, setItemClicked] = useState(false);
  const [arrayWithAudiences, setArrayWithAudiences] = useState([]) as any;
  const [checkLi, setCheckLi] = useState("");
  const { message, inputarr, loadAudienceUrl } = useGlobalModalContext();
  // const { audienceList } = useContext(FilterContext);
  const { showModal, audienceList } = useGlobalModalContext();
  const [showDraggableList, setShowDraggableList] = useState(false);
  const { user, admin, setAdmin, accessData } = useContext(UserContext);
  const {
    selectedModelId,
    retrieveSelector,
    revertAudienceSelection,
    showSelectedAudience,
    selectOrDeselectAll,
    showAllSelectors,
    getFiltersFromAudience,
    setMinMaxAudienceNumeric,
  } = useAudienceContext();

  useEffect(() => {
    if (message !== undefined) {
      setArrayWithAudiences([message]);
    }
  }, [message]);

  const handleClickAudienceContainer = () => {
    setOpenReports(!isOpenReports);
    setIsActiveReports((current) => !current);
  };

  const handleClickBurgerMenu = () => {
    console.log(isOpenBurgerMenu);
    setOpenBurgerMenu(!isOpenBurgerMenu);
    setIsActiveBurgerMenu((current) => !current);
  };

  const handleClickSelector = () => {
    setOpenSelectors(!isOpenSelectors);
    setIsActiveSelectors((current) => !current);
    setItemClicked(true);
  };

  function handleClickSelctorDropDown(Title: string) {
    console.log(Title);
    // showAllSelectors.filter((v:any)=> v.Title === Title)
    setIsOpenSelectorMenu(!isOpenSelectorMenu);
    setSelectorOpenMenu((current) => !current);
  }

  const handelclickAudience = (key: string) => {
    setCheckLi(key);
    loadAudienceUrl(key);
    // console.log(key);
  };

  const createModal = () => {
    showModal(MODAL_TYPES.UPDATE_MODAL, {
      title: "Create instance form",
      confirmBtn: "Save",
    });
  };

  // const createModalOriginal = () => {
  //   showModal(MODAL_TYPES.UPDATE_MODAL, {
  //     title: "Create instance form",
  //     confirmBtn: "Save",
  //   });
  // };

  useEffect(() => {
    // console.log(audienceList);
  }, [audienceList]);

  const [selectorItem1, setSelectorItem1] = useState("Gender");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const [selector1, setSelector1] = useState<
    GeneralSelector | GeneralNumeric | undefined
  >();

  useEffect(() => {
    setSelector1(retrieveSelector(selectorItem1));
  }, [selectorItem1, retrieveSelector]);

  return (
    <>
      <button
        type="button"
        className="Reports_button"
        onClick={() => {
          handleClickAudienceContainer();
        }}
      >
        {isOpenReports ? (
          <div className="filterbutton_Open">
            <div className="filterbutton_container">
              <img src={Filter} alt="this is filter"></img>
              <li>Audiences</li>
            </div>
            {isActiveReports ? (
              <img src={ArrrowupIcon} alt=""></img>
            ) : (
              <img src={ArrrowdownIcon} alt=""></img>
            )}
          </div>
        ) : (
          <div id="dashboard_button" className="filterbutton">
            <div className="filterbutton_container">
              <img src={Filter} alt="this is filter"></img>
              <li className="audiences_saved">Audiences</li>
            </div>
            {isActiveReports ? (
              <img src={ArrrowupIcon} alt=""></img>
            ) : (
              <img src={ArrrowdownIcon} alt=""></img>
            )}
          </div>
        )}
      </button>
      {isOpenReports && (
        <div className="Opened_Audience_button">
          <div className="main_container" id="for_tryOut">
            <div className="dropDown_button" id="dashboard_selected">
              <div className="audinece_with_selected_Items">
                <div className="audience_group">
                  <li className="audiences_saved">
                    <span id="element_dashboard">This is the audience</span>
                    <div
                      className="PlusIcon_container"
                      id="DeleteButton_container"
                    >
                      {/* <div className="DeleteButton"></div> */}
                      <div
                        className="BurgerManu"
                        onClick={() => {
                          handleClickBurgerMenu();
                        }}
                      ></div>
                    </div>
                  </li>
                </div>
                <div>
                  {showSelectedAudience().map((s) => (
                    <div key={s.Variable} className="Selected_group">
                      <div className="Title_selected_item">
                        <img src={SegmentIcon} alt="selectors" />
                        <span>{s.Title}</span>
                      </div>
                      <div className="Selected_selectors">
                        <div id="temp_child">
                          {isGeneralFactor(s) ? (
                            s.Values.map(
                              (v) =>
                                v.isSelected && (
                                  <div
                                    key={v.Id}
                                    onClick={() =>
                                      revertAudienceSelection(s.Variable, v.Id)
                                    }
                                    // className="select_item"
                                    id="selectedItem"
                                  >
                                    {v.Value}
                                    {v.isSelected ? (
                                      <>
                                        <img src={OkayIcon} alt="blabla" />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                )
                            )
                          ) : (
                            <div id="selectedItem">
                              <p>
                                {s.SelectedMin}-{s.SelectedMax}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {isOpenBurgerMenu === true ? (
                <>
                  <div className="burgeMenu_dropdown">
                    <div
                      className="burgerMenu_selector"
                      id={isActiveSelectors ? "burgerMenu_selector_active" : ""}
                      onClick={() => {
                        handleClickSelector();
                      }}
                    >
                      <span>Choose Selectors</span>
                      <div
                        className="PlusIcon_container"
                        id="DeleteButton_container"
                        // onClick={() => deleteReport(id.Dashboard_id)}
                      >
                        <div className="DeleteButton"></div>
                      </div>
                    </div>

                    <div className="burgerMenu_selector">
                      <span>Delete Audience</span>
                      <div
                        className="PlusIcon_container"
                        id="DeleteButton_container"
                        // onClick={() => deleteReport(id.Dashboard_id)}
                      >
                        <div className="DeleteButton"></div>
                      </div>
                    </div>
                    <div className="burgerMenu_selector">
                      <span>Activation</span>
                      <div
                        className="PlusIcon_container"
                        id="DeleteButton_container"
                        // onClick={() => deleteReport(id.Dashboard_id)}
                      >
                        <div className="DeleteButton"></div>
                      </div>
                    </div>
                  </div>
                  {isActiveSelectors === true ? (
                    <div className="burgeMenu_dropdown_selectors">
                      <div className="temp2">
                        {showAllSelectors().map((v) => (
                          <>
                            <div
                              className="selector_group"
                              id={
                                v.Title === selector1?.Title
                                  ? "activeTitle"
                                  : ""
                              }
                            >
                              <div className="selector_contianer">
                                <img src={SegmentIcon} alt="selectors" />
                                <div
                                  key={v.Variable}
                                  className="temp_child2"
                                  onClick={() => setSelectorItem1(v.Variable)}
                                >
                                  {v.Title}
                                </div>
                              </div>
                              <div className="Dropdown_Arrow">
                                <img
                                  src={
                                    v.Title === selector1?.Title
                                      ? ArrrowupIcon
                                      : ArrrowdownIcon
                                  }
                                  alt="selectors"
                                />
                                {/* <div
                                  className="PlusIcon_container"
                                  id="DeleteButton_container"
                                  onClick={() =>
                                    handleClickSelctorDropDown(v.Title)
                                  }
                                >
                                 
                                </div> */}
                              </div>
                            </div>
                            <>
                              {v.Title === selector1?.Title ? (
                                <>
                                  <div className="allbuttons">
                                    {/* <h2>You have chosen {selector1.Title}</h2> */}
                                    <div className="Selectors_with_AllOptions">
                                      <div className="AllSelectors">
                                        {isGeneralFactor(selector1) && (
                                          <div>
                                            <button
                                              onClick={() =>
                                                selectOrDeselectAll(
                                                  selector1.Variable,
                                                  true
                                                )
                                              }
                                              className="all_button"
                                            >
                                              <span className="all">All</span>
                                              <input type="checkbox"></input>
                                            </button>
                                            <button
                                              onClick={() =>
                                                selectOrDeselectAll(
                                                  selector1.Variable,
                                                  false
                                                )
                                              }
                                              className="all_button"
                                            >
                                              <span className="all">None</span>
                                              <input type="checkbox"></input>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                      <div className="temp">
                                        {isGeneralFactor(selector1) ? (
                                          selector1.Values.map((v) => (
                                            <button
                                              onClick={() => {
                                                revertAudienceSelection(
                                                  selector1.Variable,
                                                  v.Id
                                                );
                                              }}
                                              className="temp_child"
                                            >
                                              <div
                                                key={v.Id}
                                                className="select_item"
                                              >
                                                <p>{v.Value}</p>
                                                {v.isSelected ? (
                                                  <>
                                                    <img
                                                      src={OkayIcon}
                                                      alt="blabla"
                                                    />
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </div>
                                            </button>
                                          ))
                                        ) : (
                                          <div className="temp_child_numerical">
                                            <div className="temp_child_numerical_original">
                                              <div className="title_numerical">
                                                <div>
                                                  Maximum Values Between
                                                </div>
                                              </div>
                                              <div className="min_and_max">
                                                <div>{selector1.Min} </div> -
                                                <div>{selector1.Max}</div>
                                              </div>
                                            </div>
                                            <div className="both_Min_and_Max">
                                              <div className="temp_child_numerical_input">
                                                <div>
                                                  <div className="temp_child_numerical">
                                                    Min Value
                                                  </div>
                                                  <div>{minValue}</div>
                                                </div>

                                                <input
                                                  value={minValue}
                                                  onChange={(e) =>
                                                    setMinValue(
                                                      Number(e.target.value)
                                                    )
                                                  }
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
                                                  Set Min
                                                </button>
                                              </div>
                                              <div className=" temp_child_numerical_input">
                                                <div>
                                                  <div className="temp_child_numerical">
                                                    Max Value
                                                  </div>
                                                  <div>{maxValue}</div>
                                                </div>

                                                <input
                                                  value={maxValue}
                                                  onChange={(e) => {
                                                    setMaxValue(
                                                      Number(e.target.value)
                                                    );
                                                  }}
                                                />
                                                <button
                                                  className="buttonDashboard"
                                                  onClick={() => {
                                                    console.log(
                                                      "min",
                                                      minValue,
                                                      "max",
                                                      maxValue
                                                    );

                                                    setMinMaxAudienceNumeric(
                                                      selector1.Variable,
                                                      "max",
                                                      maxValue
                                                    );
                                                  }}
                                                >
                                                  Set Max
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          </>
                        ))}
                      </div>

                      <div>
                        <button
                          className="buttonDashboard"
                          onClick={() => console.log(getFiltersFromAudience())}
                        >
                          filter to log
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div></div>
              )}
            </div>

            <div className="button_container">
              <button
                className="button_filter"
                id="openModalBtn"
                // onClick={() => {
                //   createModalOriginal();
                // }}
              >
                <div>Add Audience</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

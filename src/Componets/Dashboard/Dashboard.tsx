import { useState, useContext, useEffect } from "react";
import "../Styles/global.css";
import "./Dashboard.css";
import HeroDashboardImage from "./icons/Hero_Image.svg";
import FilterContext from "../../Data/FilterContext";
import TemplateChart from "./../Charts/TempleteChart";
import UserContext from "../../Data/UserContext";
import ProfilePicture from "../images/profile_picture.jpg";
import SaveButton from "../Filters/icons/Save_Button.svg";
import "../Header/Header.css";

import PlusSign from "./icons/Plus_sign.svg";
import KPI from "../Charts/KPIs";
import SVG from "../KPI_Audience_Coverage";
import SVG2 from "../GroupComponent";
import { MODAL_TYPES, useGlobalModalContext } from "./Modals/GlobalModal";
import { API } from "aws-amplify";
import { deleteDashboard, saveDashboard } from "../../graphql/mutations";
import {
  DeleteDashboardMutation,
  DeleteDashboardMutationVariables,
  getChartDataAudience,
  GetChartDataQuery,
  getChartDataResponse,
  GetDashboardsQuery,
  GetDashboardsQueryVariables,
  getDashboardsResponse,
  // saveDashboardAudienceInput,
  SaveDashboardMutation,
  SaveDashboardMutationVariables,
  saveDashboardResponse,
} from "../../API";
import { getChartData, getDashboards } from "../../graphql/queries";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Dashboard() {
  const [ReportStatus, setReportStatus] = useState(false);
  const { showModal } = useGlobalModalContext();
  const [ArrayCharts, setArrayCharts] = useState([0]);
  const {
    isPlusButtonOpen,
    setSelectedModelId,
    selectedModelId,
    setReportsList,
    ReportsList,
    itemDeleteReport,
    setitemDelteReport,
    object,
    setIsLoading,
  } = useContext(FilterContext);

  const { user } = useContext(UserContext);
  const { SelectionArray } = useGlobalModalContext();
  const [title, setTitle] = useState("Add your dashboard title");
  const [changetitle, setChangetitle] = useState(false);
  const [audienceCoverageInitial, setAudienceCoverageInitial] =
    useState() as any;
  const [audienceCoverageUpdtaed, setAudienceCoverageUpdated] =
    useState() as any;
  const [initialAudienceCoverage, setInitialAudienceCoverage] =
    useState() as any;
  const [updatedAudienceCoverage, setUpdatedAudienceCoverage] =
    useState() as any;

  // function AddChart() {
  //   return (
  //     <button
  //       className="Plus_Icon"
  //       id="PluswithChart"
  //       onClick={() => MakeAnotherTemplate()}
  //     >
  //       <img src={PlusSign} alt="" />
  //       <div> Add Chart</div>
  //     </button>
  //   );
  // }

  // function MakeAnotherTemplate() {
  //   setReportStatus(true);
  //   let valueOfLast = ArrayCharts.at(-1) as number;
  //   const test = valueOfLast + 1;

  //   setArrayCharts((prevState) => [...prevState, test]);
  // }

  useEffect(() => {
    setReportStatus(true);
    setArrayCharts([0, 1, 2, 3, 4, 5, 6, 7]);
    console.log(ArrayCharts);
  }, []);

  function saveDashboardFunction() {
    console.log(SelectionArray);
    console.log(selectedModelId);
    console.log(title);
    SaveDashboard(title as string);

    async function SaveDashboard(title: string) {
      try {
        const response = (await API.graphql({
          query: saveDashboard,
          variables: {
            Model_id: selectedModelId,
            Dashboard_name: title,
            Charts: SelectionArray,
          } as SaveDashboardMutationVariables,
        })) as { data: SaveDashboardMutation };
        console.log("it went here");
        console.log(response);

        const { data: response_data } = response;
        const { saveDashboard: actual_list } = response_data;
        const { data, error, StatusCode }: saveDashboardResponse = actual_list;

        console.log(data);

        if (StatusCode === 200) {
          if (data) {
            console.log(data);
            MakeDashboardDefault(data.Dashboard_id as string, title as string);
            LoadDashboard();
            return data;
          } else {
            console.log(error);
          }
        } else console.log(error);

        if (response != null) {
        }
      } catch (err) {}
    }
  }

  useEffect(() => {
    LoadDashboard();
  }, []);

  function MakeDashboardDefault(DashboardId: string, title: string) {
    console.log("make dashboard", DashboardId, title);
    showModal(MODAL_TYPES.MAKE_DEFAULT_DASHBOARD_MODAL, { title, DashboardId });
  }

  async function LoadDashboard() {
    try {
      const response = (await API.graphql({
        query: getDashboards,
        variables: {
          Model_id: selectedModelId,
        } as GetDashboardsQueryVariables,
      })) as { data: GetDashboardsQuery };
      console.log(response);

      const { data: response_data } = response;
      const { getDashboards: actual_list } = response_data;
      const { data, error, StatusCode }: getDashboardsResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
          console.log(data);
          setReportsList(data);
          // setAudience(data.Audience);
          return data;
        } else {
          console.log(error);
        }
      } else console.log(error);

      if (response != null) {
      }
    } catch (err) {}
  }

  if (itemDeleteReport !== "") {
    deleteItemDashboard();
  } else {
    console.log("not yet");
  }

  async function deleteItemDashboard() {
    console.log(itemDeleteReport);
    try {
      const response = (await API.graphql({
        query: deleteDashboard,
        variables: {
          Dashboard_id: itemDeleteReport,
        } as DeleteDashboardMutationVariables,
      })) as { data: DeleteDashboardMutation };
      console.log("it went here");
      console.log(response);
    } catch (err) {}
    setitemDelteReport("");
    LoadDashboard();
  }

  function modifyTitle() {
    setChangetitle(true);
  }

  function saveTitle() {
    setChangetitle(false);
  }

  useEffect(() => {
    ChartFetchInitialAudienceCoverage();
    ChartFetchUpdatedAudienceCoverage();
  }, [object]);

  async function ChartFetchInitialAudienceCoverage() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: null,
            Filters: {
              Categorical: [],
              Numerical: [],
            },
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };
      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            console.log(data);
            setAudienceCoverageInitial(data);
          } else {
          }
        }
      } else console.log(error);
    } catch (err) {
      setIsLoading(false);
      console.log({ err });
    }
  }

  async function ChartFetchUpdatedAudienceCoverage() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: null,
            Filters: {
              Categorical: object,
              Numerical: [],
            },
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };
      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else console.log(error);
    } catch (err) {
      setIsLoading(false);
      console.log({ err });
    }
  }

  useEffect(() => {
    let Count_value_initial = -1;
    let Count_value_updated = -1;
    if (audienceCoverageInitial !== undefined) {
      console.log(audienceCoverageInitial);

      if (audienceCoverageInitial[0].Count_value) {
        Count_value_initial = audienceCoverageInitial[0].Count_value;
        setInitialAudienceCoverage(Count_value_initial);
      }
    }

    if (audienceCoverageUpdtaed !== undefined) {
      if (audienceCoverageUpdtaed[0].Count_value) {
        Count_value_updated = audienceCoverageUpdtaed[0].Count_value;
        setUpdatedAudienceCoverage(Count_value_updated);
      }
    }
    if (Count_value_initial >= 0 && Count_value_updated >= 0) {
      console.log(Count_value_initial);
      console.log(Count_value_updated);

      if (Count_value_updated === Count_value_initial) {
        console.log(
          "the two numbers are equal",
          Count_value_initial,
          Count_value_updated
        );
        setUpdatedAudienceCoverage(0);
      } else {
        const a = Count_value_initial - Count_value_updated;
        console.log("the two number are not equal", a);
        setInitialAudienceCoverage(a);
      }
    }
  }, [audienceCoverageInitial, audienceCoverageUpdtaed]);

  const charts = {
    chart: {
      plotShadow: false,
      type: "pie",

      plotAreaWidth: 185,
      plotAreaHeight: 290,
      height: 185,
      width: 290,
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        colorByPoint: true,
        data: [
          {
            name: "Intial",
            y: initialAudienceCoverage,
            sliced: true,
            selected: true,
            color: "#B8C8D2",
          },
          {
            name: "Second",
            y: updatedAudienceCoverage,
            sliced: true,
            selected: true,
            color: "#194E6D",
          },
        ],
      },
    ],
  };

  console.log(initialAudienceCoverage);

  return (
    <>
      <div className="Dashboard">
        <div className="KPI_with_Dashboard">
          <div className="KPI_holder">
            <div className="KPI_contianer">
              {initialAudienceCoverage !== undefined ? (
                <div className="KPI_block">
                  <div className="KIP_title"> Audience Coverage </div>
                  <div className="KIP_chart_holder">
                    {/* {initialpreditionScore} */}
                    <div className="KPI_label">
                      <div>
                        <span className="initialpreditionScore_label"></span>
                        <span>{initialAudienceCoverage}</span>
                      </div>
                      <div>
                        <span className="initialpreditionScore_label_second"></span>
                        <span>{updatedAudienceCoverage}</span>
                      </div>
                    </div>
                    <HighchartsReact
                      className="containerChart"
                      highcharts={Highcharts}
                      options={charts}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="KPI_contianer">
              {initialAudienceCoverage !== undefined ? (
                <div className="KPI_block">
                  <div className="KIP_title">Prediction Score </div>
                  <div className="KIP_chart_holder">
                    <div className="KIP_chart"> </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="header_container_group">
            <div className="header_container">
              {changetitle === false ? (
                <h1
                  onClick={() => {
                    modifyTitle();
                  }}
                >
                  {title}
                </h1>
              ) : (
                <h1>
                  <input
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder={title}
                  ></input>
                  <div className="container_for_button">
                    <button onClick={() => saveTitle()}>Save title</button>
                  </div>
                </h1>
              )}
              {user ? (
                <div className="profile_container">
                  <img src={ProfilePicture} alt=""></img>
                  <div className="profile_name">
                    {user?.name} {user?.family_name}
                  </div>
                </div>
              ) : (
                <div className="profile_container">
                  <div className="profile_name">User is not logged in</div>
                </div>
              )}
            </div>

            <div className="h2">
              Describe what is in your dashbaord {user?.name}
            </div>
            <div className="button_Dashboard">
              <button
                className="Save_Dashboard"
                onClick={() => saveDashboardFunction()}
              >
                <span>Save Dashboard</span>
                <img src={SaveButton} alt=""></img>
              </button>
              <button className="Download_Dashboard">
                <span>Download Dashboard</span>
                <img src={SaveButton} alt=""></img>
              </button>
            </div>
          </div>
        </div>

        <div className="container_button">{/* <AddChart /> */}</div>
        <div className="template">
          <div className="MainDashbaord">
            {ReportStatus === false ? (
              <div className="ChartsArray">
                <div className="dashboard_container_group">
                  <h1 className="dashboard_header">You have no reports yet </h1>
                  <img src={HeroDashboardImage} alt="hello"></img>
                  <p>
                    If you would like to create a report please select the
                    options from the filer bar, after the selection please click
                    the button generate report
                  </p>
                </div>
              </div>
            ) : (
              <div className="Chart_dashboard">
                <div
                  className={
                    isPlusButtonOpen === true
                      ? "container_graphs"
                      : "container_graphs_space"
                  }
                >
                  {ArrayCharts.map((el: number, index) => (
                    <TemplateChart
                      el={el}
                      setArrayCharts={(e: any) => setArrayCharts(e)}
                      ArrayCharts={ArrayCharts}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

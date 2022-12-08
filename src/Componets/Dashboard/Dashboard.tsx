import { useState, useContext, useEffect, Suspense } from "react";
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
import {
  addDefaultDashboard,
  deleteDashboard,
  saveDashboard,
} from "../../graphql/mutations";
import {
  AddDefaultDashboardMutationVariables,
  ClientItem,
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
import highchartsMore from "highcharts/highcharts-more";

export default function Dashboard() {
  const [ReportStatus, setReportStatus] = useState(false);
  const {
    showModal,
    DashboardDefault,
    activateDashboardFunction,
    setActivateDashbaordFunction,
  } = useGlobalModalContext();
  const [ArrayCharts, setArrayCharts] = useState([0]);
  const {
    isPlusButtonOpen,

    setReportsList,
    ReportsList,
    itemDeleteReport,
    setitemDelteReport,
    object,
    setIsLoading,
    allAudience,
    clientNewData,
    availableModels,
    selectedModelId,
    setSelectedModelId,
    selectedClient,
    setSelectedClient,
  } = useContext(FilterContext);

  const { user, admin, setAdmin, accessData } = useContext(UserContext);
  const {
    SelectionArray,
    DashboardSelectedName,
    setMakeDashboardDefault,
    makeDashboardDefault,
    DashboardTitle,
    setDashboardID,
    DashboardID,
    setDashboardTitle,
  } = useGlobalModalContext();
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
  const [initalCore, setInitalCore] = useState() as any;
  const [updatedCore, setUpdatedCore] = useState() as any;
  const [initalGender, setInitialGender] = useState() as any;
  const [updatedGender, setUpdatedGender] = useState() as any;

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
    setArrayCharts([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    // console.log(ArrayCharts);
  }, []);

  if (activateDashboardFunction === true) {
    saveDashboardFunction();
    // console.log(SelectionArray);
  }

  function saveDashboardFunction() {
    // console.log(SelectionArray);
    // console.log(selectedModelId);
    // console.log(title);
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
        // console.log("it went here");
        // console.log(response);

        const { data: response_data } = response;
        const { saveDashboard: actual_list } = response_data;
        const { data, error, StatusCode }: saveDashboardResponse = actual_list;

        // console.log(data);

        if (StatusCode === 200) {
          if (data) {
            // console.log(data);
            MakeDashboardDefault(data.Dashboard_id as string, title as string);
            setActivateDashbaordFunction(false);
            // LoadDashboard();
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
    // console.log(DashboardDefault);
    updateDashboardDefault();
    async function updateDashboardDefault() {
      try {
        const response = await API.graphql({
          query: addDefaultDashboard,
          variables: {
            Dashboard_id: DashboardDefault,
          } as AddDefaultDashboardMutationVariables,
        });
        // console.log(response);
        LoadDashboard();
      } catch (err) {
        console.log({ err });
      }
    }
  }, [DashboardDefault]);

  useEffect(() => {
    LoadDashboard();
  }, []);

  function MakeDashboardDefault(DashboardId: string, title: string) {
    console.log("make dashboard", DashboardId, title);
    showModal(MODAL_TYPES.MAKE_DEFAULT_DASHBOARD_MODAL, { title, DashboardId });
    LoadDashboard();
  }

  if (makeDashboardDefault === true) {
    // console.log(makeDashboardDefault);
    makeDashboardDefaultFunction(DashboardID);
    // console.log(DashboardID);
    setMakeDashboardDefault(false);
  }

  async function makeDashboardDefaultFunction(DashboardID: string) {
    try {
      const response = await API.graphql({
        query: addDefaultDashboard,
        variables: {
          Dashboard_id: DashboardID,
        } as AddDefaultDashboardMutationVariables,
      });
      // console.log(response);
      LoadDashboard();
    } catch (err) {
      console.log({ err });
    }
  }

  async function LoadDashboard() {
    try {
      const response = (await API.graphql({
        query: getDashboards,
        variables: {
          Model_id: selectedModelId,
        } as GetDashboardsQueryVariables,
      })) as { data: GetDashboardsQuery };
      // console.log(response);

      const { data: response_data } = response;
      const { getDashboards: actual_list } = response_data;
      const { data, error, StatusCode }: getDashboardsResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
          // console.log(data);
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
    // console.log("not yet");
  }

  async function deleteItemDashboard() {
    // console.log(itemDeleteReport);
    try {
      const response = (await API.graphql({
        query: deleteDashboard,
        variables: {
          Dashboard_id: itemDeleteReport,
        } as DeleteDashboardMutationVariables,
      })) as { data: DeleteDashboardMutation };
      // console.log("it went here");
      // console.log(response);
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
    ChartFetchCore();
    ChartUpdatedFetchCore();
    ChartFetchPreditionScore();
    ChartFetchUpdatedPreditionScore();
    ChartGenderInital();
    ChartGenderUpdated();
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            setAudienceCoverageInitial(data);
          } else {
          }
        }
      } else {
        setIsLoading(false);
        // ChartFetchInitialAudienceCoverage();
        // console.log(error);
      }
    } catch (err) {
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data.toLocaleString());
            setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else {
        // setIsLoading(false);
        // ChartFetchUpdatedAudienceCoverage();
        console.log(error);
      }
    } catch (err) {
      setIsLoading(false);
      ChartFetchUpdatedAudienceCoverage();
      console.log({ err });
    }
  }

  useEffect(() => {
    let Count_value_initial = -1;
    let Count_value_updated = -1;
    if (audienceCoverageInitial !== undefined) {
      // console.log(audienceCoverageInitial);

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
      // console.log(Count_value_initial);
      // console.log(Count_value_updated);

      if (Count_value_updated === Count_value_initial) {
        // console.log(
        //   "the two numbers are equal",
        //   Count_value_initial,
        //   Count_value_updated
        // );
        setUpdatedAudienceCoverage(0);
      } else {
        const a = Count_value_initial - Count_value_updated;
        // console.log("the two number are not equal", a);
        setInitialAudienceCoverage(a);
      }
    }
  }, [audienceCoverageInitial, audienceCoverageUpdtaed]);

  const AudienceCoverage = {
    chart: {
      // plotShadow: true,
      type: "pie",

      plotAreaWidth: 185,
      plotAreaHeight: 290,
      height: 203,
      width: 320,
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
    navigation: {
      buttonOptions: {
        enabled: false,
      },
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

  // if (allAudience !== undefined) {
  //   console.log(allAudience);
  //   allAudience.map((item: any) =>
  //     item.Variable === "Gender"
  //       ? (ChartGenderInital(), ChartGenderUpdated())
  //       : console.log("this is not the element ")
  //   );
  // }

  async function ChartGenderInital() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: "Gender",
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            setInitialGender(data.map((item: any) => item.Count));
            // setInitialGender({name:"Base", data:})
          } else {
          }
        }
      } else {
        setIsLoading(false);
        console.log(error);
        // ChartGenderInital();
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function ChartGenderUpdated() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: "Gender",
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            setUpdatedGender(data.map((item: any) => item.Count));
            // console.log(data);
          } else {
          }
        }
      } else {
        setIsLoading(false);
        console.log(error);
        // ChartGenderUpdated();
      }
    } catch (err) {
      console.log({ err });
    }
  }

  highchartsMore(Highcharts);

  const [KIPMaxValue, setKPIMaxValue] = useState();
  const [MaxValue, setMaxValue] = useState(0);

  async function ChartFetchCore() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: "core",
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);

            let rounded = data[0].Avg_value;

            setInitalCore(rounded);

            // setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else {
        setIsLoading(false);
        console.log(error);
        // ChartFetchCore();
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function ChartUpdatedFetchCore() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: "core",
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            let rounded = data[0].Avg_value;
            // if (data[0].Avg_value) {
            //   rounded = data[0].Avg_value?.toFixed(3);
            // }

            setUpdatedCore(rounded);
            // setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else {
        // ChartUpdatedFetchCore();
        console.log(error);
        setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  const [initalPreditionScore, setInitalPreditionScore] = useState() as any;
  const [updatedPreditionScore, setUpdatedPreditionScore] = useState() as any;

  async function ChartFetchPreditionScore() {
    // console.log("PReditionScore");

    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: "prediction_score",
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            let rounded = data[0].Avg_value;
            // if (data[0].Avg_value) {
            //   rounded = data[0].Avg_value?.toFixed(3);
            // }
            setInitalPreditionScore(rounded);
            // setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else {
        // ChartFetchPreditionScore();
        console.log(error);
        setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function ChartFetchUpdatedPreditionScore() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: "prediction_score",
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            // let rounded = data[0].Avg_value;
            let rounded = data[0].Avg_value;
            // if (data[0].Avg_value) {
            //   rounded = data[0].Avg_value?.toFixed(3);
            // }

            setUpdatedPreditionScore(rounded);
            // setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else {
        // ChartFetchUpdatedPreditionScore();
        console.log(error);
        setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    // console.log(allAudience);
    setKPIMaxValue(
      allAudience.find((element: any) => element.Variable === "core")
    );
  }, [allAudience]);

  useEffect(() => {
    // console.log("this is going here");

    if (KIPMaxValue !== undefined) {
      // console.log(KIPMaxValue["Max"]);
      setMaxValue(KIPMaxValue["Max"]);
      // console.log(initalCore);

      // console.log(updatedCore);
    }

    // setMaxValue(KIPMaxValue["Max"]);
  }, [KIPMaxValue, updatedCore]);

  const Core = {
    colors: ["#B8C8D2", "#194E6D"],
    chart: {
      type: "column",
      inverted: true,
      polar: true,
      // plotAreaWidth: 165,
      // plotAreaHeight: 290,
      // height: 170,
      // width: 260,
      height: 206,
      width: 290,
    },
    title: {
      text: "",
    },
    tooltip: {
      outside: true,
    },
    pane: {
      size: "100%",
      innerSize: "55%",
      endAngle: 360,
    },
    xAxis: {},
    yAxis: {
      // min: 0,
      max: MaxValue,
      crosshair: {
        enabled: true,
        color: "#333",
      },
      lineWidth: 2,
      reversedStacks: false,
      endOnTick: false,
      showLastLabel: false,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.25,
      },
    },
    credits: {
      enabled: false,
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    legend: { enabled: false },
    series: [
      {
        name: "Avg.Core",
        data: [initalCore, 0],
      },
      {
        name: "Audience Modification",
        data: [0, updatedCore],
      },
    ],
  };

  // console.log(itemsName);

  const PreditionScore = {
    colors: ["#B8C8D2", "#194E6D"],
    chart: {
      type: "column",
      inverted: true,
      polar: true,
      // plotAreaWidth: 165,
      // plotAreaHeight: 290,
      // height: 170,
      // width: 260,
      height: 206,
      width: 290,
    },
    title: {
      text: "",
    },
    tooltip: {
      outside: true,
    },
    pane: {
      size: "100%",
      innerSize: "55%",
      endAngle: 360,
    },
    xAxis: {},
    yAxis: {
      // min: 0,
      max: MaxValue,
      crosshair: {
        enabled: true,
        color: "#333",
      },
      lineWidth: 2,
      reversedStacks: false,
      endOnTick: false,
      showLastLabel: false,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.25,
      },
    },
    credits: {
      enabled: false,
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    legend: { enabled: false },
    series: [
      {
        name: "Avg.Core",
        data: [initalPreditionScore, 0],
      },
      {
        name: "Audience Modification",
        data: [0, updatedPreditionScore],
      },
    ],
  };

  useEffect(() => {
    if (DashboardSelectedName !== undefined) {
      setTitle(DashboardSelectedName);
    }
  }, [DashboardSelectedName]);

  // console.log(initalGender);

  const options1 = {
    chart: {
      type: "column",
      height: 205,
      width: 350,
      backgroundColor: "#FFFFFF",
    },
    exporting: {
      enabled: true,
    },
    yAxis: {
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
      // title: {
      //   text: "Gender",
      // },
      title: {
        text: "",
      },
    },
    legend: {
      width: 300,
      itemWidth: 100,
      margin: 0,
      align: "left",
      verticalAlign: "bottom",
    },
    labels: {
      format: "{value}",
    },
    xAxis: {
      categories: ["Female", "Male", "Unknown"],
      crosshair: true,
    },
    colors: ["#11496A", "#B8C8D2"],
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        maxPointWidth: 25,
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      { name: "Base", data: initalGender },
      { name: "Audience", data: updatedGender },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
        },
      ],
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
  };

  // function MakeAdmin() {
  //   setAdmin(!admin);
  // }

  return (
    <>
      <div className="Dashboard">
        <div className="header_container_group">
          <div className="header_container">
            {accessData.Report === true ? (
              <div>
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
                <div className="h2">
                  Describe what is in your dashboard {user?.name}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h1> {title}</h1>
                  <div className="h2">
                    Describe what is in your dashboard {user?.name}
                  </div>
                </div>
              </>
            )}

            <div className="Name_and_DatabaseSelector_Container">
              {user ? (
                <div className="profile_container">
                  <div className="avatar">
                    {user?.name.charAt(0)} {user?.family_name.charAt(0)}{" "}
                  </div>

                  <div className="profile_name">
                    {user?.name} {user?.family_name}
                  </div>
                </div>
              ) : (
                <div className="profile_container">
                  <div className="profile_name">User is not logged in</div>
                </div>
              )}
              <div className="DatabaseSelector">
                {/* <div onClick={() => MakeAdmin()}>
                  {admin ? "Make ReadOnly" : "Make Admin"}
                </div> */}
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
              </div>
            </div>
          </div>
        </div>

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
                        <span>
                          {initialAudienceCoverage !== undefined
                            ? initialAudienceCoverage.toLocaleString()
                            : initialAudienceCoverage}
                          {/* {initialAudienceCoverage} */}
                        </span>
                      </div>
                      <div>
                        <span className="initialpreditionScore_label_second"></span>
                        <span>{updatedAudienceCoverage}</span>
                      </div>
                    </div>
                    <HighchartsReact
                      className="containerChart"
                      highcharts={Highcharts}
                      options={AudienceCoverage}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="KPI_contianer">
              {initalPreditionScore !== undefined ? (
                <div className="KPI_block">
                  <div className="KIP_title"> Prediction Score </div>
                  <div className="KIP_chart_holder_core">
                    <div className="KIP_chart">
                      <div className="KPI_label_second">
                        <div className="Core_span">
                          <span
                            className="initialpreditionScore_label"
                            id="coreInitalLabel"
                          ></span>
                          <span id="coreintial">
                            {initalPreditionScore !== undefined
                              ? initalPreditionScore.toFixed(3)
                              : initalPreditionScore}
                          </span>
                        </div>
                        <div>
                          <span
                            className="initialpreditionScore_label_second"
                            id="coreUpdateLabel"
                          ></span>
                          {initalPreditionScore !== undefined
                            ? initalPreditionScore.toFixed(3)
                            : initalPreditionScore}
                        </div>
                      </div>
                      <HighchartsReact
                        className="containerChart"
                        highcharts={Highcharts}
                        options={PreditionScore}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="KPI_contianer">
              {initalCore !== undefined ? (
                <div className="KPI_block">
                  <div className="KIP_title"> Core </div>
                  <div className="KIP_chart_holder_core">
                    <div className="KIP_chart">
                      <div className="KPI_label_second">
                        <div className="Core_span">
                          <span
                            className="initialpreditionScore_label"
                            id="coreInitalLabel"
                          ></span>
                          <span id="coreintial">
                            {initalCore !== undefined
                              ? initalCore.toFixed(3)
                              : initalCore}
                          </span>
                        </div>
                        <div>
                          <span
                            className="initialpreditionScore_label_second"
                            id="coreUpdateLabel"
                          ></span>
                          <span>
                            {updatedCore !== undefined
                              ? updatedCore.toFixed(3)
                              : updatedCore}
                          </span>
                        </div>
                      </div>
                      <HighchartsReact
                        className="containerChart"
                        highcharts={Highcharts}
                        options={Core}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="KPI_contianer">
              {initalGender && updatedGender !== undefined ? (
                <div className="KPI_block">
                  <div className="KIP_title"> Gender </div>
                  <div className="KIP_chart_holder_core">
                    <div className="KIP_chart">
                      <HighchartsReact
                        className="containerChart"
                        highcharts={Highcharts}
                        options={options1}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
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

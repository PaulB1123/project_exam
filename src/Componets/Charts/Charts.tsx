import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../Dashboard/Modals/GlobalModal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import XIcon from "../Filters/icons/X.svg";
import "./Charts.css";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import FilterContext from "../../Data/FilterContext";
import UserContext from "../../Data/UserContext";

export interface PropsChart {
  el: number;
  chart: number;
  ArrayCharts: Array<number>;
  setArrayCharts(e: any): any;
  dataForChartBase: any;
  dataForChartAudience: any;
  chartTitle: any;
  loading: boolean;
  setloading: any;
  ChartID: number[];
  // setChartSize(e: any): any;
  // chartSize: any;
  tryoutChartSize: any;
  setTryoutChartSize(e: any): any;
  chartChange: any;
  setChargeChange(e: any): any;
  // chartType: any;
  chartIndividualTitle: any;
  chartSizeBackend: any;
  chartTypeBackend: any;
}

export default function Charts(props: PropsChart, selectedChart: any) {
  const {
    dataSelected,
    chart1,
    chart2,
    chart3,
    chart4,
    chart7,
    ChartNumber,
    slectedChart,
    // chartSize,
    setChartSizes,
    SelectionArray,
    chartTitle,
    setChartTitle,
    chartID,
    setchartID,
  } = useGlobalModalContext();

  const { admin, accessData } = useContext(UserContext);
  const { showModal } = useGlobalModalContext();
  const [ChartSize, setChartSize] = useState<any>();
  const [LegendChartSize, setLegendcChartSize] = useState<any>();
  const [itemsName, setitemName] = useState([]) as any;
  const [numericalValues, setNumericalValues] = useState([]) as any;
  const [audienceValues, setAudiencesValues] = useState([]) as any;
  const [audienceNumericalValues, setAudienceNumericalValues] = useState(
    []
  ) as any;
  const [nameUnitsChartSet, setnameUnitChartSet] = useState([]) as any;
  const [title, setTitle] = useState(props.chartIndividualTitle);
  const [changetitle, setChangetitle] = useState(false);
  const [optionsCharts, setOptionsCharts] = useState();

  useEffect(() => {
    props.setChargeChange(slectedChart);
    // setOptionsCharts(slectedChart);
  }, [slectedChart]);

  // console.log(props.chartIndividualTitle);

  useEffect(() => {
    if (props.dataForChartBase !== undefined) {
      // setitem(
      //   props.dataForChart.map((item: any) => ({
      //     name: item.Value,
      //     data: [item.Count],
      //   }))
      // );

      setNumericalValues(props.dataForChartBase[0].Avg_value);
      setitemName([props.dataForChartBase.map((item: any) => item.Count)]);

      // props.dataForChartBase.map((item: any) => console.log(item));
      setnameUnitChartSet(
        props.dataForChartBase.map((item: any) => item.Value)
      );
    }

    if (props.dataForChartAudience !== undefined) {
      setAudiencesValues([
        props.dataForChartAudience.map((item: any) => item.Count),
      ]);
      setAudienceNumericalValues(props.dataForChartAudience[0].Avg_value);
    }
  }, [props.dataForChartAudience, props.dataForChartBase]);

  function hide() {
    const Exist = document.querySelector(".Chart") as any;
    Exist.classList.add("hide");
  }

  useEffect(() => {
    if (props.tryoutChartSize === "small") {
      // console.log("this is small");
      setChartSize(483);
      setLegendcChartSize(530);
    } else if (props.tryoutChartSize === "medium") {
      // console.log("this is medium");
      setChartSize(998);

      setLegendcChartSize(930);
    } else if (props.tryoutChartSize === "large") {
      // console.log("this is large");
      setChartSize(1512);
      setLegendcChartSize(1530);
    }
  }, [props.tryoutChartSize]);

  exporting(Highcharts);
  // console.log(itemsName);

  // console.log(props.ArrayCharts);
  // console.log(ChartNumber);

  // const [alin, setAlin] = useState();

  // useEffect(() => {
  //   props.ArrayCharts.forEach((item: any) =>
  //     item === ChartNumber ? setAlin(item) : console.log("this is not okay")
  //   );

  //   // console.log(alin);
  // });

  useEffect(() => {
    // console.log(props.chartTypeBackend, SelectionArray);
  }, [props.chartTypeBackend, SelectionArray]);

  useEffect(() => {
    props.setloading(true);
    setTimeout(() => {
      props.setloading(false);
    }, 3000);
  }, [itemsName]);

  function changeChart(ChartID: any) {
    // console.log(ChartID);
    showModal(MODAL_TYPES.DELETE_MODAL, ChartID);
  }

  // props.setloading(false);

  function ChangeSizeChart(value: string) {
    props.setTryoutChartSize(value);
    setChartSizes(value);
    setchartID(props.ChartID[0]);
  }

  useEffect(() => {
    // console.log(props.chartTypeBackend);
  }, [props.chartTypeBackend]);

  function modifyTitle() {
    setChangetitle(true);
  }

  function saveTitle() {
    setChartTitle(title);
    setchartID(props.ChartID[0]);
    setChangetitle(false);
    // console.log("it passed here ");
    // console.log(props.ChartID[0]);
  }

  useEffect(() => {
    setTitle(props.chartIndividualTitle);
  }, [props.chartIndividualTitle]);

  const options1 = {
    chart: {
      type: "column",
      height: 395,
      width: ChartSize,
      backgroundColor: "#FFFFFF",
    },
    exporting: {
      enabled: true,
    },
    yAxis: {
      title: {
        // text: props.chartTitle,
        text: "Client",
      },
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
    },
    legend: {
      width: LegendChartSize,
      itemWidth: 105,
      margin: 0,
      align: "left",
      verticalAlign: "bottom",
    },
    labels: {
      format: "{value}",
    },
    xAxis: {
      categories: nameUnitsChartSet,
      // crosshair: true,
    },

    colors: ["#B8C8D2", "#11496A"],
    // colors: ["#11496A"],
    title: {
      text: props.chartTitle,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        maxPointWidth: 65,
        dataLabels: {
          enabled: true,
        },
      },
    },
    // series: itemsName,
    series: [
      { name: "Base", data: itemsName[0] },
      { name: "Audience", data: audienceValues[0] },
      // { name: "Base", data: [896465, 1245434] },
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
        width: 24,
        height: 24,
        theme: {
          "stroke-width": 1,
          stroke: "#B4B2B2",
          r: 5,
          states: {
            hover: {
              fill: "#104666",
            },
            select: {
              stroke: "#039",
              fill: "#bbadab",
            },
          },
        },
      },
    },
  };

  const options2 = {
    chart: {
      type: "column",
      height: 395,
      width: ChartSize,
    },
    colors: ["#B8C8D2", "#11496A"],
    xAxis: {
      categories: nameUnitsChartSet,
      // crosshair: true,
    },
    title: {
      text: props.chartTitle,
    },
    yAxis: {
      min: 0,

      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "normal",
          textOutline: "none",
        },
      },
      title: {
        // text: props.chartTitle,
        text: "Client",
      },
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
    },
    legend: {
      maxHeight: 100,
    },

    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        maxPointWidth: 125,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      { name: "Base", data: itemsName[0] },
      { name: "Audience", data: audienceValues[0] },
      // { name: "Base", data: [896465, 1245434] },
    ],
  };

  const options3 = {
    chart: {
      // plotShadow: true,
      type: "pie",

      height: 395,
      width: ChartSize,
    },
    xAxis: {
      categories: nameUnitsChartSet,
      // crosshair: true,
    },
    title: {
      text: props.chartTitle,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    // plotOptions: {
    //   line: {
    //     dataLabels: {
    //       enabled: true,
    //     },
    //     enableMouseTracking: false,
    //   },
    // },

    // credits: {
    //   enabled: true,
    // },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    legend: {
      maxHeight: 100,
    },

    series: [
      {
        colorByPoint: true,
        data: [
          {
            name: "Base",
            y: itemsName[0],
            sliced: true,
            selected: true,
            color: "#B8C8D2",
          },
          {
            name: "Audience",
            y: audienceValues[0],
            sliced: true,
            selected: true,
            color: "#194E6D",
          },
        ],
      },
    ],
  };

  const options4 = {
    chart: {
      // plotShadow: true,
      type: "line",

      height: 395,
      width: ChartSize,
    },
    title: {
      text: props.chartTitle,
    },
    colors: ["#B8C8D2", "#11496A"],
    yAxis: {
      min: 0,

      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "normal",
          textOutline: "none",
        },
      },
      title: {
        // text: props.chartTitle,
        text: "Client",
      },
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: nameUnitsChartSet,
      // crosshair: true,
    },
    legend: {
      maxHeight: 100,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      { name: "Base", data: itemsName[0] },
      { name: "Audience", data: audienceValues[0] },
      // { name: "Base", data: [896465, 1245434] },
    ],

    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 500
    //         },
    //         chartOptions: {
    //             legend: {
    //                 layout: 'horizontal',
    //                 align: 'center',
    //                 verticalAlign: 'bottom'
    //             }
    //         }
    //     }]
    // }
  };

  const options5 = {
    chart: {
      type: "bar",
      height: 395,
      width: ChartSize,
      backgroundColor: "#FFFFFF",
    },
    exporting: {
      enabled: true,
    },
    yAxis: {
      title: {
        // text: props.chartTitle,
        text: "Client",
      },
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
    },
    legend: {
      width: LegendChartSize,
      itemWidth: 105,
      margin: 0,
      align: "left",
      verticalAlign: "bottom",
    },
    labels: {
      format: "{value}",
    },
    xAxis: {
      categories: nameUnitsChartSet,
      // crosshair: true,
    },

    colors: ["#B8C8D2", "#11496A"],
    // colors: ["#11496A"],
    title: {
      text: props.chartTitle,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        maxPointWidth: 65,
        dataLabels: {
          enabled: true,
        },
      },
    },
    // series: itemsName,
    series: [
      { name: "Base", data: itemsName[0] },
      { name: "Audience", data: audienceValues[0] },
      // { name: "Base", data: [896465, 1245434] },
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
        width: 24,
        height: 24,
        theme: {
          "stroke-width": 1,
          stroke: "#B4B2B2",
          r: 5,
          states: {
            hover: {
              fill: "#104666",
            },
            select: {
              stroke: "#039",
              fill: "#bbadab",
            },
          },
        },
      },
    },
  };

  const options6 = {
    chart: {
      // plotShadow: true,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",

      height: 395,
      width: ChartSize,
    },
    title: {
      text: props.chartTitle,
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

        showInLegend: true,
        cursor: "pointer",
        colors: ["#B8C8D2", "#194E6D"],
        dataLabels: {
          enabled: false,
          format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
          distance: -50,
          filter: {
            property: "percentage",
            operator: ">",
            value: 4,
          },
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
    legend: {
      width: LegendChartSize,
      itemWidth: 105,
      margin: 0,
      align: "left",
      verticalAlign: "bottom",
    },
    labels: {
      format: "{value}",
    },
    series: [
      {
        colorByPoint: true,
        data: [
          {
            name: "Base",
            y: numericalValues,
            // sliced: true,
            // selected: true,
            color: "#B8C8D2",
          },
          {
            name: "Audience",
            y: audienceNumericalValues,
            sliced: true,
            selected: true,
            color: "#194E6D",
          },
        ],
      },
    ],
  };

  const options7 = {
    colors: ["#B8C8D2", "#194E6D"],
    chart: {
      type: "column",
      inverted: true,
      polar: true,

      height: 395,
    },
    title: {
      text: props.chartTitle,
    },
    tooltip: {
      outside: true,
    },
    pane: {
      size: "100%",
      innerSize: "55%",
      endAngle: 360,
    },
    legend: {
      width: LegendChartSize,
      itemWidth: 105,
      margin: 0,
      align: "left",
      verticalAlign: "bottom",
    },
    labels: {
      format: "{value}",
    },
    xAxis: {},
    yAxis: {
      // min: 0,
      // max: MaxValue,
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
    // legend: { enabled: false },
    series: [
      {
        name: "Avg.Core",
        data: [numericalValues, 0],
      },
      {
        name: "Audience Modification",
        data: [0, audienceNumericalValues],
      },
    ],
  };

  return (
    <div className="Chart">
      {props.dataForChartBase !== undefined ? (
        <div className="Chart_with_buttons">
          <div className="containerChart">
            <div className="Main_contianer">
              <div className="continer_with_title_and_exist">
                <div className="title_chart">
                  {accessData.Report === true ? (
                    <div>
                      {changetitle === false ? (
                        <h1
                          className="title"
                          onClick={() => {
                            modifyTitle();
                          }}
                        >
                          {title}
                        </h1>
                      ) : (
                        <h1 className="h1_title_chart_container">
                          <input
                            className="title"
                            type="text"
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder={title}
                          ></input>
                          <div className="container_for_button">
                            <button onClick={() => saveTitle()}>
                              Save title
                            </button>
                          </div>
                        </h1>
                      )}
                    </div>
                  ) : (
                    <>
                      <div>
                        <h1 className="title"> {title}</h1>
                      </div>
                    </>
                  )}

                  {/* <div className="subtitle"> {props.chartTitle}</div> */}
                </div>
              </div>

              <div className="container_Chart_Options">
                {accessData.Report === true ? (
                  <>
                    <div className="SelectorSizeChart_Container">
                      <select
                        className="SelectorSizeChart"
                        onChange={(event: any) =>
                          ChangeSizeChart(event.target.value)
                        }
                        value={props.tryoutChartSize}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="wrapper_loader">
                    <GridLoader
                      color={"#104666"}
                      // loading={loading}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )}

                {accessData.Report === true ? (
                  <>
                    <div
                      onClick={() => {
                        changeChart(props.ChartID);
                      }}
                    >
                      <div className="EditIcon_container">
                        <span className="EditIcon"></span>
                      </div>

                      {/* Change Chart */}
                    </div>
                  </>
                ) : (
                  <div className="wrapper_loader">
                    <GridLoader
                      color={"#104666"}
                      // loading={loading}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="container_for_chart">
              {props.dataForChartBase && props.dataForChartAudience ? (
                <HighchartsReact
                  className="containerChart"
                  highcharts={Highcharts}
                  options={
                    props.chartTypeBackend === "chart1"
                      ? options1
                      : props.chartTypeBackend === "chart2"
                      ? options2
                      : props.chartTypeBackend === "chart3"
                      ? options4
                      : props.chartTypeBackend === "chart4"
                      ? options5
                      : props.chartTypeBackend === "chart5"
                      ? options6
                      : props.chartTypeBackend === "chart7"
                      ? options7
                      : console.log("blabla")
                  }
                  // options={optionsCharts}
                />
              ) : (
                <div className="wrapper_loader">
                  <GridLoader
                    color={"#104666"}
                    // loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
            </div>

            {/* {props.dataForChart.map((item: any) => {})} */}

            {/* <div className="Button_adds">
              <div className="Button_settings">
                <button>See advance scores</button>
              </div>
              <div className="Button_adds_container">
                <li>Terms</li>
                <li id="pureDisplay">|</li>
                <li>Privacy Policy</li>
                <li id="pureDisplay">|</li>
                <li>Advertiser Disclousure</li>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div className="Chart_with_buttons">
          <div className="containerChart">
            <div className="wrapper_loader">
              <GridLoader
                color={"#104666"}
                // loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// {chartChange === chart1 ? options2 : options}

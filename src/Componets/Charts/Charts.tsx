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
  chartType: any;
}

export default function Charts(props: PropsChart, selectedChart: any) {
  const {
    dataSelected,
    chart1,
    chart2,
    chart3,
    ChartNumber,
    slectedChart,
    // chartSize,
    setChartSizes,
    SelectionArray,
  } = useGlobalModalContext();
  const { showModal } = useGlobalModalContext();

  const [ChartSize, setChartSize] = useState<any>();
  const [LegendChartSize, setLegendcChartSize] = useState<any>();

  useEffect(() => {
    props.setChargeChange(slectedChart);
    console.log(slectedChart);
  }, [slectedChart]);

  const [itemsName, setitemName] = useState([]) as any;
  const [audienceValues, setAudiencesValues] = useState([]) as any;
  const [nameUnitsChartSet, setnameUnitChartSet] = useState([]) as any;
  const [title, setTitle] = useState("Add your chart title");
  const [changetitle, setChangetitle] = useState(false);

  useEffect(() => {
    if (props.dataForChartBase !== undefined) {
      // setitem(
      //   props.dataForChart.map((item: any) => ({
      //     name: item.Value,
      //     data: [item.Count],
      //   }))
      // );

      setitemName([props.dataForChartBase.map((item: any) => item.Count)]);

      props.dataForChartBase.map((item: any) => console.log(item));
      setnameUnitChartSet(
        props.dataForChartBase.map((item: any) => item.Value)
      );
    }

    if (props.dataForChartAudience !== undefined) {
      setAudiencesValues([
        props.dataForChartAudience.map((item: any) => item.Count),
      ]);
    }
  }, [props.dataForChartAudience, props.dataForChartBase]);

  function hide() {
    const Exist = document.querySelector(".Chart") as any;
    Exist.classList.add("hide");
  }

  console.log(nameUnitsChartSet);
  console.log(itemsName);
  console.log(audienceValues);

  useEffect(() => {
    if (props.tryoutChartSize === "small") {
      console.log("this is small");
      setChartSize(483);
      setLegendcChartSize(530);
    } else if (props.tryoutChartSize === "medium") {
      console.log("this is medium");
      setChartSize(998);

      setLegendcChartSize(930);
    } else if (props.tryoutChartSize === "large") {
      console.log("this is large");
      setChartSize(1512);
      setLegendcChartSize(1530);
    }
  }, [props.tryoutChartSize]);

  exporting(Highcharts);
  // console.log(itemsName);

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
    colors: ["#11496A", "#496D84", "#7E98A5", "#B8C8D2", "#6A7B8C", "#85919E"],
    xAxis: {
      accessibility: {},
    },
    title: {
      text: "",
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
    series: itemsName,
  };

  // console.log(dataForChart);
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
    props.setloading(true);
    setTimeout(() => {
      props.setloading(false);
    }, 3000);
  }, [itemsName]);

  function changeChart(ChartID: any) {
    console.log(ChartID);
    showModal(MODAL_TYPES.DELETE_MODAL, ChartID);
  }

  // props.setloading(false);

  function ChangeSizeChart(value: any) {
    console.log("this is working ", value);
    // setChartSizes(value);
    props.setTryoutChartSize(value);
    setChartSizes(value);
  }

  useEffect(() => {
    console.log(props.chartType);
  }, [props.chartType]);

  function modifyTitle() {
    setChangetitle(true);
  }

  function saveTitle() {
    setChangetitle(false);
  }

  return (
    <div className="Chart">
      {props.dataForChartBase !== undefined ? (
        <div className="Chart_with_buttons">
          <div className="containerChart">
            {/* <button className="Exist" onClick={hide}>
              <img src={XIcon} alt="" />
            </button> */}

            <div className="Main_contianer">
              <div className="continer_with_title_and_exist">
                <div className="title_chart">
                  {/* <div className="title"> This title can change</div> */}
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
                  {/* <div className="subtitle"> {props.chartTitle}</div> */}
                </div>
              </div>

              <div className="container_Chart_Options">
                <div className="SelectorSizeChart_Container">
                  <select
                    className="SelectorSizeChart"
                    onChange={(event: any) =>
                      ChangeSizeChart(event.target.value)
                    }
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
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
              </div>
            </div>

            <div className="container_for_chart">
              {props.loading ? (
                <div className="wrapper_loader">
                  <GridLoader
                    color={"#104666"}
                    // loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <HighchartsReact
                  className="containerChart"
                  highcharts={Highcharts}
                  options={props.chartType === "chart1" ? options2 : options1}
                />
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
        <></>
      )}
    </div>
  );
}

// {chartChange === chart1 ? options2 : options}

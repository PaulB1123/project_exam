import { useGlobalModalContext } from "../Dashboard/Modals/GlobalModal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import XIcon from "../Filters/icons/X.svg";
import "./Charts.css";
import { useContext, useEffect, useState } from "react";
import FilterContext from "../../Data/FilterContext";
import GridLoader from "react-spinners/GridLoader";
import TemplateChart from "./TempleteChart";
import { API } from "aws-amplify";
import { getChartData } from "../../graphql/queries";
import {
  getChartDataAudience,
  GetChartDataQuery,
  getChartDataResponse,
} from "../../API";

export interface PropsChart {
  el: number;
  chart: number;
  ArrayCharts: Array<number>;
  setArrayCharts(e: any): any;
  // setDataForChart(e: any): any;
  dataForChart: any;
  chartTitle: any;
}

export default function Charts(props: PropsChart, slectedChart: any) {
  const {
    dataSelected,
    chart1,
    chart2,
    chart3,
    loading,
    setLoading,
    ChartNumber,
    arrayData,
  } = useGlobalModalContext();

  // SelectionArray

  const { isPlusButtonOpen, ArrayDragged, selectedModelId } =
    useContext(FilterContext);

  const [title, setTitle] = useState("this is the title");

  const [chartChange, setChargeChange] = useState();
  const [selectedArray, setSelectedArray] = useState([]);

  useEffect(() => {
    setChargeChange(slectedChart);
  }, [chartChange, slectedChart]);

  const [items, setitem] = useState([]) as any;
  const [newItem, setNewItem] = useState([]) as any;

  // useEffect(() => {
  //   console.log(props.chart);
  //   console.log(props.el);
  // }, [props.chart]);

  console.log(props.dataForChart, props.el);

  useEffect(() => {
    console.log(dataSelected);
    if (dataSelected !== undefined) {
      setTitle(dataSelected.selector);

      if (props.dataForChart !== undefined) {
        console.log("it went here", props.dataForChart);

        setitem(
          props.dataForChart.map((item: any) => ({
            name: item.value,
            data: [item.count],
          }))
        );
      }

      if (items !== null) {
        console.log(items);
      }
    }
  }, [dataSelected, props.dataForChart]);

  function hide() {
    console.log("it is here");
    const Exist = document.querySelector(".Chart") as any;
    Exist.classList.add("hide");
  }

  const options = {
    chart: {
      type: "column",
      height: 300,
      width: 320,
      backgroundColor: "transparent",
    },

    yAxis: {
      title: "",
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
    },
    legend: {
      symbolRadius: 0,
    },
    xAxis: {
      accessibility: {},
      //   categories: Number,
    },
    colors: [
      "#104666",
      "#1A6D9F",
      "#1D76AD",
      "#2392D4",
      "#0A354E",
      "#0E405D",
      "#252A37",
      "#3C4D56",
      "#11496A",
      "#496D84",
      "#7E98A5",
      "#B8C8D2",
      "#6A7B8C",
      "#85919E",
      "#AEB4BC",
      "#B5BBC2",
      "#7F7F7F",
      "#D9D9D9",
      "#D8E0E4",
    ],
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointStart: 0,
      },
    },

    series: items,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const options2 = {
    chart: {
      type: "column",
    },
    colors: [
      "#104666",
      "#1A6D9F",
      "#1D76AD",
      "#2392D4",
      "#0A354E",
      "#0E405D",
      "#252A37",
      "#3C4D56",
      "#11496A",
      "#496D84",
      "#7E98A5",
      "#B8C8D2",
      "#6A7B8C",
      "#85919E",
      "#AEB4BC",
      "#B5BBC2",
      "#7F7F7F",
      "#D9D9D9",
      "#D8E0E4",
    ],
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      accessibility: {},
      //   categories: Number,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",

          textOutline: "none",
        },
      },
    },
    legend: {
      align: "left",
      x: 70,
      verticalAlign: "top",
      y: 70,
      floating: true,

      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
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
    },
    series: items,
  };

  // console.log(dataForChart);
  // console.log(props.ArrayCharts);
  // console.log(ChartNumber);

  const [alin, setAlin] = useState();

  useEffect(() => {
    props.ArrayCharts.forEach((item: any) =>
      item === ChartNumber ? setAlin(item) : console.log("this is not okay")
    );

    console.log(alin);
  });

  return (
    <div className="Chart">
      {props.dataForChart !== undefined ? (
        <div
          className={
            isPlusButtonOpen === true
              ? "Chart_with_buttons"
              : "Chart_with_space"
          }
        >
          <div className="containerChart">
            <button className="Exist" onClick={hide}>
              <img src={XIcon} alt="" />
            </button>
            <div className="continer_with_title_and_exist">
              <div className="title_chart">
                <div> {props.chartTitle}</div>
              </div>
            </div>

            <div className="container_for_chart">
              {loading ? (
                <div className="wrapper_loader">
                  <GridLoader
                    color={"#104666"}
                    loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <HighchartsReact
                  className="containerChart"
                  highcharts={Highcharts}
                  options={chartChange === chart1 ? options2 : options}
                />
              )}
            </div>

            {props.dataForChart.map((item: any) => {})}

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
        <>
          <h3>This is again the chart holder with the charts</h3>
          {/* <TemplateChartDashboard
            el={props.el}
            ArrayCharts={[]}
            setArrayCharts={(e: any) => props.setArrayCharts(e)}
          /> */}
        </>
      )}
    </div>
  );
}

//    ? dataForChart.map((item: any) => {
//               return (
//                 <div className="Chartcontianer">
//                   <ul>
//                     <li> {item.value}</li>
//                     <li>{item.count}</li>
//                   </ul>
//                 </div>
//               );
//             })

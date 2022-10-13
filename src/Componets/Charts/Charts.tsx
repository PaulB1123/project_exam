import { useGlobalModalContext } from "../Dashboard/Modals/GlobalModal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import XIcon from "../Filters/icons/X.svg";
import "./Charts.css";
import { useEffect, useState } from "react";

export default function Chart() {
  const { dataForChart, dataSelected, slectedChart } = useGlobalModalContext();
  const [title, setTitle] = useState("this is the title");
  const [arrayData, setArrayData] = useState();
  const [chartChange, setChargeChange] = useState();

  useEffect(() => {
    setChargeChange(slectedChart);
    console.log(chartChange);
  }, [slectedChart]);

  //   if (dataSelected != null) {
  //     setTitle(dataSelected.selector);
  //     console.log(title);
  //   }

  //   console.log(dataSelected.selector);

  //   console.log(slectedChart);

  useEffect(() => {
    console.log("it went here", dataForChart);
    if (dataSelected !== undefined) {
      setTitle(dataSelected.selector);
      console.log(title);
      console.log(dataForChart);

      //   dataForChart.map((item: any) => {
      //     const newObject = { name: item.value, data: [item.count] };
      //     console.log(newObject);

      //     console.log(arrayData);
      //   });
    }
  }, [dataSelected, dataForChart]);

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

    series: [
      {
        name: "Installation & Developers",
        data: [1, 45, 23, 76, 34],
      },

      {
        name: "Other",
        data: [24, 22, 34, 54, 65],
      },
    ],

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
    title: {
      text: "Major trophies for some English teams",
      align: "left",
    },
    xAxis: {
      categories: ["Arsenal", "Chelsea", "Liverpool", "Manchester United"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Count trophies",
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
    series: [
      {
        name: "BPL",
        data: [3, 5, 1, 13],
      },
    ],
  };

  return (
    <div className="Chart">
      {dataForChart != null ? (
        <div className="Chart_with_buttons">
          <div className="containerChart">
            <div className="title_chart">{title}</div>

            <div className="Exist_Module">
              <img src={XIcon} alt="" />
            </div>

            <div className="container_for_chart">
              <HighchartsReact
                className="containerChart"
                highcharts={Highcharts}
                options={chartChange === "chart1" ? options2 : options}
              />
            </div>

            {dataForChart.map((item: any) => {
              //   <div className="Chartcontianer">
              //     <ul>
              //       <li> {item.value}</li>
              //       <li>{item.count}</li>
              //     </ul>
              //   </div>
            })}

            <div className="Button_adds">
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
            </div>
          </div>
        </div>
      ) : (
        <></>
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

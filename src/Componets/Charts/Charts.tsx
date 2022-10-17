import { useGlobalModalContext } from "../Dashboard/Modals/GlobalModal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import XIcon from "../Filters/icons/X.svg";
import "./Charts.css";
import { useContext, useEffect, useState } from "react";
import FilterContext from "../../Data/FilterContext";

export default function Chart() {
  const { dataForChart, dataSelected, slectedChart, chart1, chart2 } =
    useGlobalModalContext();
  const { isPlusButtonOpen, ArrayDragged } = useContext(FilterContext);

  const [title, setTitle] = useState("this is the title");

  const [chartChange, setChargeChange] = useState();
  const [selectedArray, setSelectedArray] = useState([]);

  useEffect(() => {
    setChargeChange(slectedChart);
    // console.log(chartChange);
    // console.log(chartChange === chart1);
  }, [chartChange, slectedChart]);

  //   if (dataSelected != null) {
  //     setTitle(dataSelected.selector);
  //     console.log(title);
  //   }

  // console.log(dataSelected.selector);

  // console.log(slectedChart);
  // console.log(ArrayDragged);

  const [items, setitem] = useState([]) as any;
  const [newItem, setNewItem] = useState([]) as any;

  useEffect(() => {
    if (dataSelected !== undefined) {
      setTitle(dataSelected.selector);

      if (dataForChart !== undefined) {
        console.log("it went here", dataForChart);
        setitem(
          dataForChart.map((item: any) => ({
            name: item.value,
            data: [item.count],
          }))
        );

        // dataForChart.map((item: any) => {
        //   setitem({ name: item.value, data: [item.count] });
        //   setNewItem(...Object.keys(items), Object.keys(items));
        //   console.log(newItem);
        //   // setNewItem([...item, item]);
        //   // setNewItem(...item, item);
        // });
      }

      if (items !== null) {
        console.log(items);
      }
      // console.log(newItem);

      //   console.log(title);
      //   console.log(dataForChart);

      //   dataForChart.map((item: any) => {
      //     const newObject = { name: item.value, data: [item.count] };
      //     console.log(newObject);

      //     // setArrayData(newObject)
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

  function hide() {
    console.log("it is here");
    const Exist = document.querySelector(".Chart") as any;
    Exist.classList.add("hide");
  }

  return (
    <div className="Chart">
      {dataForChart != null ? (
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
                <div> {title}</div>
              </div>
            </div>

            <div className="container_for_chart">
              <HighchartsReact
                className="containerChart"
                highcharts={Highcharts}
                options={chartChange === chart1 ? options2 : options}
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

import { ContextSelectorFooter } from "@patternfly/react-core";
import { useState, useEffect, useContext } from "react";
import "../Styles/global.css";
import "./Dashboard.css";
import HeroDashboardImage from "./icons/Hero_Image.svg";
import { useGlobalModalContext } from "./Modals/GlobalModal";
import Chart from "../Charts/Charts";
import FilterContext from "../../Data/FilterContext";

export default function Dashboard() {
  // const {
  //   dataForChart,
  //   dataSelected,
  //   slectedChart,
  //   chart1,
  //   chart2,
  //   chart3,
  //   loading,
  //   setLoading,
  // } = useGlobalModalContext();
  // const { isPlusButtonOpen, ArrayDragged } = useContext(FilterContext);

  // const [title, setTitle] = useState("this is the title");

  // const [chartChange, setChargeChange] = useState();
  // const [selectedArray, setSelectedArray] = useState([]);

  // useEffect(() => {
  //   setChargeChange(slectedChart);
  // }, [chartChange, slectedChart]);

  // const [items, setitem] = useState([]) as any;
  // const [newItem, setNewItem] = useState([]) as any;

  // useEffect(() => {
  //   if (dataSelected !== undefined) {
  //     setTitle(dataSelected.selector);

  //     if (dataForChart !== undefined) {
  //       console.log("it went here", dataForChart);
  //       setitem(
  //         dataForChart.map((item: any) => ({
  //           name: item.value,
  //           data: [item.count],
  //         }))
  //       );
  //     }

  //     if (items !== null) {
  //       console.log(items);
  //     }
  //   }
  // }, [dataSelected, dataForChart]);

  // useEffect(() => {
  //   console.log(dataForChart);
  //   if (dataForChart != null) {
  //     const dashboard = document.querySelector(".Dashboard");
  //     dashboard?.classList.add("hidden");
  //   } else {
  //     console.log("notyet");
  //   }
  // }, [dataForChart]);

  // // // console.log(slectedChart);

  // const options = {
  //   chart: {
  //     type: "column",
  //     height: 300,
  //     width: 320,
  //     backgroundColor: "transparent",
  //   },

  //   yAxis: {
  //     title: "",
  //     gridLineColor: "#ffffff",
  //     gridLineWidth: 0,
  //   },
  //   legend: {
  //     symbolRadius: 0,
  //   },
  //   xAxis: {
  //     accessibility: {},
  //     //   categories: Number,
  //   },
  //   colors: [
  //     "#104666",
  //     "#1A6D9F",
  //     "#1D76AD",
  //     "#2392D4",
  //     "#0A354E",
  //     "#0E405D",
  //     "#252A37",
  //     "#3C4D56",
  //     "#11496A",
  //     "#496D84",
  //     "#7E98A5",
  //     "#B8C8D2",
  //     "#6A7B8C",
  //     "#85919E",
  //     "#AEB4BC",
  //     "#B5BBC2",
  //     "#7F7F7F",
  //     "#D9D9D9",
  //     "#D8E0E4",
  //   ],
  //   title: {
  //     text: "",
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   plotOptions: {
  //     series: {
  //       pointStart: 0,
  //     },
  //   },

  //   series: items,

  //   responsive: {
  //     rules: [
  //       {
  //         condition: {
  //           maxWidth: 500,
  //         },
  //         chartOptions: {
  //           legend: {
  //             layout: "horizontal",
  //             align: "center",
  //             verticalAlign: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // };

  // const options2 = {
  //   chart: {
  //     type: "column",
  //   },
  //   colors: [
  //     "#104666",
  //     "#1A6D9F",
  //     "#1D76AD",
  //     "#2392D4",
  //     "#0A354E",
  //     "#0E405D",
  //     "#252A37",
  //     "#3C4D56",
  //     "#11496A",
  //     "#496D84",
  //     "#7E98A5",
  //     "#B8C8D2",
  //     "#6A7B8C",
  //     "#85919E",
  //     "#AEB4BC",
  //     "#B5BBC2",
  //     "#7F7F7F",
  //     "#D9D9D9",
  //     "#D8E0E4",
  //   ],
  //   title: {
  //     text: "",
  //     align: "left",
  //   },
  //   xAxis: {
  //     accessibility: {},
  //     //   categories: Number,
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: "",
  //     },
  //     stackLabels: {
  //       enabled: true,
  //       style: {
  //         fontWeight: "bold",

  //         textOutline: "none",
  //       },
  //     },
  //   },
  //   legend: {
  //     align: "left",
  //     x: 70,
  //     verticalAlign: "top",
  //     y: 70,
  //     floating: true,

  //     borderColor: "#CCC",
  //     borderWidth: 1,
  //     shadow: false,
  //   },
  //   tooltip: {
  //     headerFormat: "<b>{point.x}</b><br/>",
  //     pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
  //   },
  //   plotOptions: {
  //     column: {
  //       stacking: "normal",
  //       dataLabels: {
  //         enabled: true,
  //       },
  //     },
  //   },
  //   series: items,
  // };

  // const options3 = {
  //   chart: {
  //     type: "bar",
  //   },
  //   title: {
  //     text: "UEFA CL top scorers by season",
  //   },
  //   xAxis: {
  //     categories: ["2020/21", "2019/20", "2018/19", "2017/18", "2016/17"],
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: "Goals",
  //     },
  //   },
  //   legend: {
  //     reversed: true,
  //   },
  //   plotOptions: {
  //     series: {
  //       stacking: "normal",
  //     },
  //   },
  //   series: items,
  // };

  return (
    <>
      <div className="Dashboard">
        <div className="dashboard_container_group">
          <h1 className="dashboard_header">You have no reports yet </h1>
          <img src={HeroDashboardImage} alt="hello"></img>
          <p>
            If you would like to create a report please select the options from
            the filer bar, after the selection please click the button generate
            report
          </p>
        </div>
      </div>
      <div className="MainDashbaord">
        {/* <div className="ChartsArray">
          <div>
            <Chart />
            <Chart />
          </div>
          <div className="no_spacing">
            <Chart />
            <Chart />
          </div>
          <div className="no_spacing">
            <Chart />
            <Chart />
          </div>
          <div className="no_spacing">
            <Chart />
            <Chart />
          </div>
        </div> */}
        <div className="ChartsArray">
          {Array(4)
            .fill(true)
            .map((_, i) => (
              <Chart key={i} />
            ))}
        </div>
      </div>
    </>
  );
}

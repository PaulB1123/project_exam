import { SetStateAction, useContext, useEffect, useState } from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";
import Chart1 from "../../IntroPage/img/Chart1.png";
import Chart2 from "../../IntroPage/img/Chart2.png";
import Chart1Color from "../../IntroPage/img/Chart1_color (2).png";
import Chart2Color from "../../IntroPage/img/Chart2_color.png";
import Chart3 from "../../IntroPage/img/Chart3.png";
import Chart3Color from "../../IntroPage/img/Chart3_color.png";
import Chart4 from "../../IntroPage/img/Chart4.png";
import Chart4Color from "../../IntroPage/img/Chart4_color.png";
import "../../Filters/Modal.css";
import FilterContext from "../../../Data/FilterContext";
import { API } from "aws-amplify";
import { getChartData } from "../../../graphql/queries";
import { getChartDataAudience, getChartDataResponse } from "../../../API";
import Charts from "../../Charts/Charts";

export interface Props {
  modalProps: any;
}

export const SelectChart = (props: Props) => {
  const {
    hideModal,
    selectedAudition,
    setSelectedAudition,
    chart1,
    chart2,
    chart3,
    chart4,
    slectedChart,
    setSelectedChart,
    setChartNumber,
    ChartNumber,
    VariableType,
    setVariableType,
    SelectionArray,
    setSelectionArray,
    chartSize,
    chartTitle,
    setChartTitle,
  } = useGlobalModalContext();
  const { categorical, allAudience } = useContext(FilterContext);
  const [audition, setAudition] = useState<any>();
  const [chart, setchart] = useState<any>();
  const [selector, setSelector] = useState<any>();
  const [chartSelected, setChartSelected] = useState<any>("");

  const handleModalToggle = () => {
    hideModal();
  };

  useEffect(() => {
    categorical.length > 0
      ? setSelectedAudition(categorical[0].id)
      : setSelectedAudition("");
  }, [categorical]);

  function selectChart(key: string) {
    setSelectedChart(key);

    console.log(key);
  }

  function CloseAndFetchData() {
    handleModalToggle();
    console.log(props.modalProps[0]);
    console.log(chartSize);

    const placeholderNumber = props.modalProps[0];

    console.log(SelectionArray);

    if (SelectionArray.some((el: any) => el.Position === placeholderNumber)) {
      console.log(SelectionArray);

      setSelectionArray((ps: any) =>
        ps.filter((el: any) => el.Position !== placeholderNumber)
      );
      console.log(SelectionArray);

      setTimeout(() => {
        setSelectionArray((preState: any) => [
          ...preState,
          {
            Position: placeholderNumber,
            Variable_type: VariableType,
            Title: selector,
            Variable: audition,
            Chart_type: slectedChart,
            Chart_size: chartSize,
          },
        ]);
      }, 100);
    } else {
      setSelectionArray((preState: any) => [
        ...preState,
        {
          Position: placeholderNumber,
          Variable_type: VariableType,
          Title: selector,
          Variable: audition,
          Chart_type: slectedChart,
          Chart_size: chartSize,
        },
        // {
        //   Position: placeholderNumber,
        //   Variable_type: VariableType,
        //   Title: selector,
        //   Variable: audition,
        //   Chart_type: slectedChart,
        //   Chart_size: chartSize,
        // },
      ]);
    }
  }
  console.log(SelectionArray);
  // console.log(categorical);
  // console.log(audition);
  // console.log(VariableType);

  const btn = document.querySelector(".Contiune") as HTMLButtonElement;

  // console.log(allAudience);
  // console.log(slectedChart);

  // here it might crash because I am looking for Variable_type but variable type is found only after I select the chartSelected, this is why I placed it in a useEffect

  useEffect(() => {
    if (chartSelected.Variable_type !== "categorical") {
      // console.log(chartSelected);
    }

    setVariableType(chartSelected.Variable_type);
  }, [chartSelected]);

  return (
    <div className="">
      <Modal
        title=" "
        variant={ModalVariant.medium}
        isOpen={true}
        onClose={handleModalToggle}
        className="modalContainer"
      >
        <div className="Exist_Module" onClick={handleModalToggle}>
          <img src={XIcon} alt="" />
        </div>

        <div className="Header_Modal" id="Header_Modal_GenerateReport">
          <h3>Choose the chart variable </h3>

          <select
            value={audition}
            onChange={(event) => {
              setAudition(event.target.value);
              setSelector(
                event.target.options[event.target.selectedIndex].text
              );
              // setVariableType(event.target.getAttribute("Variable_type"));
              setChartSelected(
                allAudience.find(
                  (element: any) => element.Variable === event.target.value
                )
              );

              // setSelector(event.target.id);
            }}
          >
            {allAudience.map((item: any, index: any) => (
              // console.log(item)
              <option key={index} value={item.Variable}>
                {item.Title}
              </option>
            ))}
          </select>
        </div>

        <div className="Header_Modal" id="Header_Modal_GenerateReport">
          <h3>Choose what type of graphs would you like to be displayed </h3>
          <div className="charts_selectors">
            <div>
              <Button
                id="1"
                value={chart1}
                onClick={() => {
                  selectChart(chart1);
                }}
                className={slectedChart === chart1 ? "borderactive" : ""}
              >
                <div className="image_chart">
                  <img
                    src={slectedChart === chart1 ? Chart2Color : Chart2}
                    alt=""
                  />
                </div>
                <p>This is a {chart1}</p>
              </Button>
              <Button
                id="2"
                value={chart2}
                onClick={() => {
                  selectChart(chart2);
                }}
                className={slectedChart === chart2 ? "borderactive" : ""}
              >
                <div className="image_chart">
                  <img
                    src={slectedChart === chart2 ? Chart1Color : Chart1}
                    alt=""
                  />
                </div>
                <p className="thisp">This is {chart2}</p>
              </Button>
            </div>

            <div>
              <Button
                id="3"
                value="Chart3"
                onClick={() => {
                  selectChart(chart3);
                }}
                className={slectedChart === chart3 ? "borderactive" : ""}
              >
                <div className="image_chart">
                  <img
                    src={slectedChart === chart3 ? Chart3Color : Chart3}
                    alt=""
                  />
                </div>
                <p>This is a {chart3}</p>
              </Button>
              <Button
                id="4"
                value="Chart4"
                onClick={() => {
                  selectChart(chart4);
                }}
                className={slectedChart === chart4 ? "borderactive" : ""}
              >
                <div className="image_chart">
                  <img
                    src={slectedChart === chart4 ? Chart4Color : Chart4}
                    alt=""
                  />
                </div>
                <p>This is a {chart4}</p>
              </Button>
            </div>
          </div>
        </div>

        <div className="Buttons_Modal">
          <button
            key="confirm"
            type="button"
            onClick={CloseAndFetchData}
            className="Contiune"
            id={btn != null && btn.disabled === true ? "disabled" : "normal"}
          >
            Generate
          </button>

          <button key="cancel" onClick={handleModalToggle} className="Cancel">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

// <Button
// id="1"
// value={chart1}
// onClick={() => {
//   setchart(chart1);
// }}
// className={slectedChart === chart1 ? "borderactive" : ""}
// >
// <div className="image_chart">
//   <img
//     src={slectedChart === chart1 ? Chart1Color : Chart1}
//     alt=""
//   />
// </div>
// <p className="thisp">This is {chart1}</p>
// </Button>

// <Button
// id="2"
// value="Chart2"
// onClick={() => {
//   setchart(chart2);
// }}
// className={slectedChart === chart2 ? "borderactive" : ""}
// >
// <div className="image_chart">
//   <img
//     src={slectedChart === chart2 ? Chart2Color : Chart2}
//     alt=""
//   />
// </div>
// <p>This is a {chart2}</p>
// </Button>

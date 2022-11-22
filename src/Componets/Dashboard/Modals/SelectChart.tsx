import { SetStateAction, useContext, useEffect, useState } from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { useGlobalModalContext } from "./GlobalModal";
import XIcon from "../../Filters/icons/X.svg";
import Chart1 from "../../IntroPage/img/Chart1.png";
import Chart2 from "../../IntroPage/img/Chart2.png";
import Chart1Color from "../../IntroPage/img/Chart1_color (2).png";
import Chart2Color from "../../IntroPage/img/Chart2_color.png";
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
    slectedChart,
    setSelectedChart,
    setChartNumber,
    ChartNumber,

    setSelectionArray,
  } = useGlobalModalContext();
  const { categorical } = useContext(FilterContext);
  const [audtion, setAudition] = useState<any>();
  const [chart, setchart] = useState<any>();
  const [selector, setSelector] = useState<any>();

  const handleModalToggle = () => {
    hideModal();
  };

  console.log(props.modalProps);

  useEffect(() => {
    categorical.length > 0
      ? setSelectedAudition(categorical[0].id)
      : setSelectedAudition("");
  }, [categorical]);

  function selectChart(key: string) {
    setSelectedChart(key);
  }

  function CloseAndFetchData() {
    handleModalToggle();

    const placeholderNumber = props.modalProps[0];
    setSelectionArray((preState: any) => [
      ...preState,
      {
        Position: placeholderNumber,
        Variable_type: "categorical",
        Title: selector,
        Variable: audtion,
        Chart_type: "Chart 1",
        // Chart_size
      },
    ]);
    // console.log(selectionArray);
  }

  console.log(categorical);
  console.log(audtion);

  const btn = document.querySelector(".Contiune") as HTMLButtonElement;

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
            value={audtion}
            onChange={(event) => {
              setAudition(event.target.value);
              setSelector(
                event.target.options[event.target.selectedIndex].text
              );

              // setSelector(event.target.id);
            }}
          >
            {categorical.map((item: any, index: any) => (
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
                  src={slectedChart === chart1 ? Chart1Color : Chart1}
                  alt=""
                />
              </div>
              <p className="thisp">This is {chart1}</p>
            </Button>

            <Button
              id="2"
              value="Chart2"
              onClick={() => {
                selectChart(chart2);
              }}
              className={slectedChart === chart2 ? "borderactive" : ""}
            >
              <div className="image_chart">
                <img
                  src={slectedChart === chart2 ? Chart2Color : Chart2}
                  alt=""
                />
              </div>
              <p>This is a {chart2}</p>
            </Button>

            {/* <Button
              id="2"
              value="Chart2"
              onClick={() => {
                selectChart(chart3);
              }}
              className={slectedChart === chart3 ? "borderactive" : ""}
            >
              <div className="image_chart">
                <img
                  src={slectedChart === chart3 ? Chart2Color : Chart2}
                  alt=""
                />
              </div>
              <p>This is a {chart3}</p>
            </Button> */}
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

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

export const DeleteModal = () => {
  const {
    hideModal,
    selectedAudition,
    setSelectedAudition,
    ChartFetch,
    chart1,
    chart2,
    slectedChart,
    setSelectedChart,
  } = useGlobalModalContext();
  const { data, categorical, selectedModelId, ArrayDragged } =
    useContext(FilterContext);
  // const [selectedAudition, setSelectedAudition] = useState("");
  // const [slectedChart, setSelectedChart] = useState("");
  // const chart1 = "chart1";
  // const chart2 = "chart2";

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
  }

  const btn = document.querySelector(".Contiune") as HTMLButtonElement;

  // if (slectedChart.length > 0) {
  //   // console.log("this is not null", slectedChart);
  //   // btn.disabled = true;
  //   btn.disabled = false;
  // } else if (btn != null) {
  //   console.log("this is not null", slectedChart);

  //   btn.disabled = true;

  //   // btn.disabled = false;
  // } else {
  //   console.log("this is null", btn);
  // }

  console.log(selectedModelId);

  function CloseAndFetchData() {
    ChartFetch();
    handleModalToggle();
  }

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
          {/* <Button onClick={triggerFunction}>This is button</Button> */}

          <select
            value={selectedAudition}
            onChange={(event) => setSelectedAudition(event.target.value)}
          >
            {categorical.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.selector}
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

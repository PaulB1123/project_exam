import { useState, useContext, useEffect } from "react";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../Dashboard/Modals/GlobalModal";
import "./TempleteChart.css";
import ChartIMG from "./Chart.svg";
import Charts from "../Charts/Charts";
import { API } from "aws-amplify";
import XIcon from "../Filters/icons/X.svg";
import { getChartData } from "../../graphql/queries";
import {
  getChartDataAudience,
  GetChartDataQuery,
  getChartDataResponse,
} from "../../API";
import FilterContext from "../../Data/FilterContext";

export interface Props {
  el: number;
  setArrayCharts(e: any): any;
  ArrayCharts: Array<number>;
}

export default function TemplateChart(props: Props) {
  const { showModal, chartSize } = useGlobalModalContext();
  const { object, setIsLoading, setChart, chartUpdate, setChartUpdate } =
    useContext(FilterContext);
  const { setChartNumber, SelectionArray, slectedChart } =
    useGlobalModalContext();
  const [chart, setchart] = useState([]) as any;
  const [dataForChartBase, setDataForChartBase] = useState() as any;
  const [dataForChartAudience, setDataForChartAudience] = useState() as any;
  const { ArrayDragged, selectedModelId } = useContext(FilterContext);
  const [chartTitle, setChartTitle] = useState<any>();
  const [audtitionName, setAuditionName] = useState<any>();
  const [loading, setloading] = useState(false);

  const bigFunction = (chartID: any) => {
    console.log(chartID);

    setChartNumber(chartID);
    showModal(MODAL_TYPES.DELETE_MODAL, chartID);
  };

  function DeleteChart() {
    props.setArrayCharts((preState: any) => [
      ...preState.filter((item: number) => item !== props.el),
    ]);
  }

  const ChartID = props.ArrayCharts.filter((item: number) => item === props.el);

  useEffect(() => {
    setChart(ChartID);
  }, []);

  // console.log(ChartID);

  useEffect(() => {
    // console.log(SelectionArray);

    if (
      dataForChartBase &&
      !SelectionArray.some((el: any) => el.Position === ChartID[0])
    ) {
      console.log("test", dataForChartBase);
      setDataForChartBase();
    }

    if (
      dataForChartAudience &&
      !SelectionArray.some((el: any) => el.Position === ChartID[0])
    ) {
      console.log("test", dataForChartAudience);
      setDataForChartAudience();
    }

    SelectionArray.forEach((element: any, chart: any) => {
      if (element.Position === ChartID[0] && !dataForChartBase) {
        console.log("comparing data", element, ChartID[0], element.Variable);
        setAuditionName(element.Variable);
        ChartFetchBase(element.Variable, element.Chart_type);
        setChartTitle(element.Title);
      }
      if (element.Position === ChartID[0] && !dataForChartAudience) {
        console.log("comparing data", element, ChartID[0], element.Variable);
        setAuditionName(element.Variable);
        ChartFetchAudience(element.Variable, element.Chart_type);
        // setChartTitle(element.Title);
      }
    });
  }, [SelectionArray]);

  // this is where the second update fetch is happening
  useEffect(() => {
    if (chartUpdate === true) {
      console.log("chart update");
      ChartFetchAudience(audtitionName, "");
      // ChartFetchBase(audtitionName, "");
      setChartUpdate(false);
    }
  }, [chartUpdate]);

  async function ChartFetchBase(audition: any, chart: any) {
    // console.log(audition, "fetching chart data ", object);
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: audition,
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

            setDataForChartBase(data);
            // console.log(loading);
          } else {
            setDataForChartBase([]);
          }
        }
      } else console.log(error);
    } catch (err) {
      setIsLoading(false);
      console.log({ err });
    }
  }

  async function ChartFetchAudience(audition: any, chart: any) {
    // console.log(audition, "fetching chart data ", object);
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: audition,
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
            console.log(data);

            setDataForChartAudience(data);
            // console.log(loading);
          } else {
            setDataForChartAudience([]);
          }
        }
      } else console.log(error);
    } catch (err) {
      setIsLoading(false);
      console.log({ err });
    }
  }

  const [tryoutChartSize, setTryoutChartSize] = useState<any>("small");
  const [chartChange, setChargeChange] = useState<any>();

  const [chartType, setChartType] = useState<any>();

  useEffect(() => {
    const ChartDetails = SelectionArray.filter(
      (el: any) => el.Position === ChartID[0]
    );
    setChartType(ChartDetails.Chart_type);
    // console.log(ChartDetails);
    // console.log(SelectionArray);
    // setChartType(slectedChart);
    // console.log(ChartDetails.Chart_type);
  }, [ChartID]);

  return (
    <>
      {dataForChartBase !== undefined || dataForChartAudience !== undefined ? (
        <div
          className={`this_is_container_visiable_chart card_large ${tryoutChartSize}`}
        >
          <Charts
            el={props.el}
            chart={chart}
            ArrayCharts={props.ArrayCharts}
            setArrayCharts={(e: any) => props.setArrayCharts(e)}
            dataForChartBase={dataForChartBase}
            dataForChartAudience={dataForChartAudience}
            chartTitle={chartTitle}
            loading={loading}
            setloading={setloading}
            ChartID={ChartID}
            tryoutChartSize={tryoutChartSize}
            setTryoutChartSize={setTryoutChartSize}
            chartChange={chartChange}
            setChargeChange={setChargeChange}
            chartType={chartType}
          />
        </div>
      ) : (
        <>
          <div className="this_is_container_main_chart card_small">
            <div className="templateChart_container">
              {/* <button className="Exist" onClick={() => DeleteChart()}>
                <img src={XIcon} alt="" />
              </button> */}
              <div className="templateChart_header">
                <h1>This is your chart</h1>
                <p>
                  <div className="templateChart_container_paragraph">
                    You can select your chart that will be displayed by clicking
                    on add chart button
                  </div>
                </p>
              </div>

              <div className="tempalteChart_button">
                <button>
                  <div>
                    <img src={ChartIMG} alt="Chart logo" />
                  </div>
                  <div
                    className="Chart_description"
                    onClick={(e: any) => {
                      bigFunction(ChartID);
                    }}
                  >
                    Select Chart
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

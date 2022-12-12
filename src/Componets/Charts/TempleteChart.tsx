import { API } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import {
  getChartDataAudience,
  GetChartDataQuery,
  getChartDataResponse,
} from "../../API";
import { useAudienceContext } from "../../Data/AudienceContext";
import FilterContext from "../../Data/FilterContext";
import UserContext from "../../Data/UserContext";
import { getChartData } from "../../graphql/queries";
import Charts from "../Charts/Charts";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../Dashboard/Modals/GlobalModal";
import XIcon from "../Filters/icons/X.svg";
import ChartIMG from "./Chart.svg";
import "./TempleteChart.css";

export interface Props {
  el: number;
  setArrayCharts(e: any): any;
  ArrayCharts: Array<number>;
}

export default function TemplateChart(props: Props) {
  const { showModal, chartSize } = useGlobalModalContext();
  const { object, setIsLoading, setChart, chartUpdate, setChartUpdate } =
    useContext(FilterContext);
  const {
    setChartNumber,
    SelectionArray,
    slectedChart,
    selectedDashboard,
    setSelectedDasboard,
  } = useGlobalModalContext();
  const [chart, setchart] = useState([]) as any;
  const [dataForChartBase, setDataForChartBase] = useState() as any;
  const [dataForChartAudience, setDataForChartAudience] = useState() as any;
  const { ArrayDragged, selectedModelId } = useContext(FilterContext);
  const [chartTitle, setChartTitle] = useState<any>();
  const [audtitionName, setAuditionName] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [chartSizeBackend, setChartSizeBackend] = useState<any>();
  const [chartTypeBackend, setChartTypeBackend] = useState();
  const { getFiltersFromAudience } = useAudienceContext();
  // const [checkError, setCheckError] = useState()

  const bigFunction = (chartID: any) => {
    // console.log(chartID);

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
    if (chartUpdate === true) {
      console.log(audtitionName);

      ChartFetchAudience(audtitionName, "");
      ChartNumericalFetchAudience(audtitionName, "");
      // ChartNumericalFetchAudience(audtitionName, "");
      setChartUpdate(false);
    }
  }, [chartUpdate]);

  useEffect(() => {
    setChart(ChartID);
  }, []);

  useEffect(() => {
    // console.log(ChartID[0]);

    UpdateCharts();
  }, [SelectionArray]);

  function UpdateCharts() {
    // setTimeout(() => {
    //   setSelectedDasboard(false);
    // }, 100);

    if (
      dataForChartBase &&
      !SelectionArray.some((el: any) => el.Position === ChartID[0])
    ) {
      // console.log("test", dataForChartBase);
      setDataForChartBase();
      // setDataForChartAudience();
    }

    if (
      dataForChartAudience &&
      !SelectionArray.some((el: any) => el.Position === ChartID[0])
    ) {
      // console.log("test", dataForChartAudience);
      setDataForChartAudience();
    }

    if (selectedDashboard === true) {
      SelectionArray.forEach((element: any, chart: any) => {
        if (
          element.Position === ChartID[0] &&
          dataForChartBase &&
          dataForChartAudience
        ) {
          console.log("it went there as an selected dashbaord");
          if (element.Variable_type === "categorical") {
            ChartFetchBase(element.Variable, element.Chart_type);
            ChartFetchAudience(element.Variable, element.Chart_type);
            setChartIndividualTitle(element.Title);
            setAuditionName(element.Variable);
            setTryoutChartSize(element.Chart_size);
            setChartTitle(element.Variable);
            setSelectedDasboard(false);
          } else {
            ChartNumericalFetchBase(element.Variable, element.Chart_type);
            ChartNumericalFetchAudience(element.Variable, element.Chart_type);
            setChartIndividualTitle(element.Title);
            setAuditionName(element.Variable);
            setTryoutChartSize(element.Chart_size);
            setChartTitle(element.Variable);
            setSelectedDasboard(false);
          }
        }
      });
    }

    SelectionArray.forEach((element: any, chart: any) => {
      if (
        element.Position === ChartID[0] &&
        !dataForChartBase &&
        !dataForChartAudience
      ) {
        if (element.Variable_type === "categorical") {
          console.log("this is 1");
          ChartFetchBase(element.Variable, element.Chart_type);
          ChartFetchAudience(element.Variable, element.Chart_type);
          setChartIndividualTitle(element.Title);
          setAuditionName(element.Variable);
          setTryoutChartSize(element.Chart_size);
          setChartTitle(element.Variable);
          setSelectedDasboard(false);
        } else {
          console.log("this is 2");
          ChartNumericalFetchBase(element.Variable, element.Chart_type);
          ChartNumericalFetchAudience(element.Variable, element.Chart_type);
          setChartIndividualTitle(element.Title);
          setAuditionName(element.Variable);
          setTryoutChartSize(element.Chart_size);
          setChartTitle(element.Variable);
          setSelectedDasboard(false);
        }
      }
    });

    SelectionArray.forEach((element: any, chart: any) => {
      if (
        element.Position === ChartID[0] &&
        dataForChartBase &&
        !dataForChartAudience
      ) {
        if (element.Variable_type === "categorical") {
          setSelectedDasboard(false);
          console.log("this is 3");
          ChartFetchAudience(element.Variable, element.Chart_type);
        } else {
          setSelectedDasboard(false);
          console.log("this is 4");
          ChartNumericalFetchAudience(element.Variable, element.Chart_type);
        }
      }
    });
  }

  useEffect(() => {
    console.log(dataForChartBase);
  }, [dataForChartBase]);

  async function ChartFetchBase(audition: any, chart: any) {
    console.log(audition, "fetching chart data ", dataForChartBase);

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

      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            setDataForChartBase(data);
            setChartTypeBackend(chart);

            // console.log(loading);
          } else {
            setDataForChartBase(undefined);
          }
        } else {
        }
      } else {
        // ChartFetchBase(audition, chart);
        // setIsLoading(false);
        // if (dataForChartBase !== undefined) {
        //   ChartFetchBase(audition, chart);
        // }
        console.log(error);
      }
    } catch (err) {
      console.log({ err });

      if (dataForChartBase === undefined) {
        ChartFetchBase(audition, chart);
      }
    }
  }

  useEffect(() => {
    if (dataForChartBase !== undefined) {
      console.log("wow so it should work", dataForChartBase);
    }
  }, [dataForChartBase]);

  async function ChartNumericalFetchBase(audition: any, chart: any) {
    // console.log(audition, "fetching chart data ", object);
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: audition,
            Categorical_variable: null,
            Filters: {
              Categorical: [],
              Numerical: [],
            },
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };
      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            console.log(data);

            setDataForChartBase(data);
            setChartTypeBackend(chart);

            // console.log(loading);
          } else {
            // setDataForChartBase([]);
          }
        }
      } else {
        // ChartFetchBase(audition, chart);
        // setIsLoading(false);
        console.log(error);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function ChartNumericalFetchAudience(audition: any, chart: any) {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: audition,
            Categorical_variable: null,
            Filters: getFiltersFromAudience(),
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };
      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;
      console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            console.log(data);
            setDataForChartAudience(data);
          } else {
            setDataForChartBase([]);
          }
        }
      } else {
        console.log("this is on line 291", error);
      }
    } catch (err) {
      console.log("this is on line 294", { err });
    }
  }

  async function ChartFetchAudience(categoricalFactor: string, chart: any) {
    console.log(categoricalFactor, "fetching chart data ", object);
    try {
      const query_input = {
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: categoricalFactor,
            Filters: getFiltersFromAudience(),
          } as getChartDataAudience,
        },
      };
      // console.log(query_input);

      const response = (await API.graphql(query_input)) as {
        data: GetChartDataQuery;
      };
      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);

            setDataForChartAudience(data);
            // console.log(loading);
          } else {
            setDataForChartAudience([]);
          }
        }
      } else {
        // ChartFetchAudience(audition, chart);
        // setIsLoading(false);
        console.log(error);
      }
    } catch (err) {
      if (dataForChartAudience === undefined) {
        ChartFetchAudience(categoricalFactor, chart);
      }
      console.log({ err });
    }
  }

  const [tryoutChartSize, setTryoutChartSize] = useState<any>("small");
  const [chartChange, setChargeChange] = useState<any>();

  const [chartType, setChartType] = useState<any>();
  const [chartIndividualTitle, setChartIndividualTitle] = useState<any>();
  const { admin, accessData } = useContext(UserContext);

  useEffect(() => {
    const ChartDetails = SelectionArray.filter(
      (el: any) => el.Position === ChartID[0]
    );
    setChartType(ChartDetails.Chart_type);
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
            // chartType={chartType}
            chartIndividualTitle={chartIndividualTitle}
            chartSizeBackend={chartSizeBackend}
            chartTypeBackend={chartTypeBackend}
          />
        </div>
      ) : (
        <>
          {accessData.Report === true ? (
            <div className="this_is_container_main_chart card_small">
              <div className="templateChart_container">
                {/* <button className="Exist" onClick={() => DeleteChart()}>
                <img src={XIcon} alt="" />
              </button> */}
                <div className="templateChart_header">
                  <h1>This is your chart</h1>
                  <p>
                    <div className="templateChart_container_paragraph">
                      You can select your chart that will be displayed by
                      clicking on add chart button
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
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

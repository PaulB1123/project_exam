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
  const { showModal } = useGlobalModalContext();
  const { object, setIsLoading, setChart, chartUpdate } =
    useContext(FilterContext);
  const { setChartNumber, SelectionArray, slectedChart } =
    useGlobalModalContext();
  const [chart, setchart] = useState([]) as any;
  const [dataForChart, setDataForChart] = useState() as any;
  const { ArrayDragged, selectedModelId } = useContext(FilterContext);
  const [chartTitle, setChartTitle] = useState<any>();
  const [audtitionName, setAuditionName] = useState();
  const [loading, setloading] = useState(false);

  const bigFunction = (chartID: any) => {
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
    SelectionArray.forEach((element: any, chart: any) => {
      // if the position of the chart is the same as the position in the array

      // if (element.position === ChartID[0]) {
      //   setAuditionName(element.id);
      //   ChartFetch(element.id, element.chart_type);
      //   setChartTitle(element.selector);
      //   console.log(element, element.chart_type);
      // }
      console.log("comparing data", ChartID[0], element);

      if (element.Position === ChartID[0]) {
        setAuditionName(element.Variable);
        ChartFetch(element.Variable, element.Chart_type);
        setChartTitle(element.Title);
        console.log(element, element.Chart_type);
      }
    });
  }, [SelectionArray]);

  useEffect(() => {
    if (chartUpdate === true) {
      ChartFetch(audtitionName, "");
    }
  }, [chartUpdate]);

  async function ChartFetch(audition: any, chart: any) {
    console.log(audition, "fetching chart data ");
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

      console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            console.log(data);

            setDataForChart(data);
            console.log(loading);
          } else {
            setDataForChart([]);
          }
        }
      } else console.log(error);
    } catch (err) {
      setIsLoading(false);
      console.log({ err });
    }
  }

  return (
    <>
      {dataForChart !== undefined ? (
        <div className="this_is_container_visiable_chart card_large">
          <Charts
            el={props.el}
            chart={chart}
            ArrayCharts={props.ArrayCharts}
            setArrayCharts={(e: any) => props.setArrayCharts(e)}
            dataForChart={dataForChart}
            chartTitle={chartTitle}
            loading={loading}
            setloading={setloading}
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

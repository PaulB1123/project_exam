import { useState, useContext, useEffect } from "react";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../Dashboard/Modals/GlobalModal";
import "./TempleteChart.css";
import ChartIMG from "./Chart.svg";
import Charts from "../Charts/Charts";
import { DeleteModal } from "../Dashboard/Modals/SelectChart";
import { API } from "aws-amplify";
import XIcon from "../Filters/icons/X.svg";
import { getChartData } from "../../graphql/queries";
import {
  getChartDataAudience,
  GetChartDataQuery,
  getChartDataResponse,
} from "../../API";
import FilterContext from "../../Data/FilterContext";
// import Modal from "./Modal";

export interface Props {
  el: number;
  setArrayCharts(e: any): any;
  ArrayCharts: Array<number>;
}

export default function TemplateChart(props: Props) {
  const { showModal } = useGlobalModalContext();
  const {
    leftside,
    object,
    setObject,
    updateCharts,
    setIsLoading,
    Chart,
    setChart,
    chartUpdate,
  } = useContext(FilterContext);
  const {
    setChartNumber,
    ChartNumber,
    selectedAudition,
    slectedChart,
    setLoading,
    dataSelected,
    arrayData,
    SelectionArray,
  } = useGlobalModalContext();
  const [chart, setchart] = useState([]) as any;
  const [dataForChart, setDataForChart] = useState() as any;
  const [selectedArrayToFetchData, setSelectedArrayToFetchData] =
    useState() as any;

  const bigFunction = (chartID: any) => {
    setChartNumber(chartID);
    showModal(MODAL_TYPES.DELETE_MODAL, chartID);
    // DeleteModal(e);
  };

  function DeleteChart() {
    props.setArrayCharts((preState: any) => [
      ...preState.filter((item: number) => item !== props.el),
    ]);
  }

  // setChartID(props.ArrayCharts.filter((item: number) => item === props.el));
  const ChartID = props.ArrayCharts.filter((item: number) => item === props.el);

  useEffect(() => {
    setChart(ChartID);
  }, []);

  console.log(ChartID);

  const { ArrayDragged, selectedModelId } = useContext(FilterContext);
  const [chartTitle, setChartTitle] = useState<any>();
  const [selectedItems, setselectedItems] = useState() as any;
  const [audtitionName, setAuditionName] = useState();

  console.log(SelectionArray);

  // if (selectedArrayToFetchData !== undefined) {
  //   console.log(selectedArrayToFetchData.selectedAudition);
  // }

  useEffect(() => {
    SelectionArray.forEach((element: any) => {
      if (element.chartNumber === ChartID[0]) {
        setAuditionName(element.selectedAudition);
        ChartFetch(element.selectedAuditiont, element.chart);
        setChartTitle(element.selectedAudition);
      }
    });
  }, [SelectionArray]);

  // console.log(leftside);

  if (leftside !== undefined) {
    // console.log(leftside);
  }

  // useEffect(() => {
  //   if (chartUpdate === true) {
  //     ChartFetch(audtitionName, "");
  //   }
  // }, [chartUpdate]);

  async function ChartFetch(audition: any, chart: any) {
    // console.log(SelectionArray);
    console.log(audition);

    // console.log(arrayData);
    setIsLoading(true);

    try {
      console.log(audition);
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            numerical_variable: null,
            categorical_variable: audition,
            filters: {
              categorical: object,
              // categorical: [
              //   {
              //     id: "family",
              //     values: [],
              //   },
              // ],
              numerical: [],
            },
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };

      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      console.log(actual_list);
      if (StatusCode === 200) {
        console.log(data);
        setIsLoading(false);
        if (data) {
          if (data.length > 0) {
            setDataForChart(data);
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
          />
        </div>
      ) : (
        <>
          <div className="this_is_container_main_chart card_small">
            <div className="templateChart_container">
              <button className="Exist" onClick={() => DeleteChart()}>
                <img src={XIcon} alt="" />
              </button>
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

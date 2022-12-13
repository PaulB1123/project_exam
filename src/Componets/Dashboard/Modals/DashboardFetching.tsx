import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  chartDataItemUnion,
  getChartDataAudience,
  GetChartDataQuery,
  getChartDataResponse,
} from "../../../API";
import { useAudienceContext } from "../../../Data/AudienceContext";
import { getChartData } from "../../../graphql/queries";

const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

function useChartDataForGender() {
  const [data, setData] = useState<chartDataItemUnion[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // const updateGender = ChartGenderUpdated()
  const { getFiltersFromAudience, selectedModelId } = useAudienceContext();
  useEffect(() => {
    setIsLoading(true);
    ChartGenderUpdated().then((d) => {
      setIsLoading(false);
      if (d) {
        setData(d);
      }
    });
  }, []);

  async function ChartGenderUpdated() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: "Gender",
            Filters: getFiltersFromAudience(),
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };
      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
          return data;
          //   if (data.length > 0) {
          //     return (data.map((item: any) => item.Count));
          //   } else {
          //   }
        }
      }
      if (error) {
        console.log(error);
        if (data === undefined) {
          await delay(5000);
          console.log("Waited 5s");
          ChartGenderUpdated();
        }
      }
    } catch (err) {
      console.log({ err });
    }
  }

  return data;
}

export function FetchForChartWithAudienceCreated(selectedModelId: any) {
  const { getFiltersFromAudience } = useAudienceContext();

  ChartFetchUpdatedAudienceCoverage(selectedModelId);
  ChartUpdatedFetchCore();
  ChartFetchUpdatedPreditionScore();
  ChartGenderUpdated();

  async function ChartFetchUpdatedAudienceCoverage(selectedModelId: any) {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: null,
            Filters: getFiltersFromAudience(),
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
            return data;
          } else {
          }
        }
      } else {
        console.log(error);
      }
      if (error) {
        console.log(error);
        if (data === undefined) {
          await delay(5000);
          console.log("Waited 5s");
          ChartFetchUpdatedAudienceCoverage(selectedModelId);
        }
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function ChartGenderUpdated() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: null,
            Categorical_variable: "Gender",
            Filters: getFiltersFromAudience(),
          } as getChartDataAudience,
        },
      })) as { data: GetChartDataQuery };
      const { data: response_data } = response;
      const { getChartData: actual_list } = response_data;
      const { data, error, StatusCode }: getChartDataResponse = actual_list;

      if (StatusCode === 200) {
        if (data) {
          return [];
          //   if (data.length > 0) {
          //     return (data.map((item: any) => item.Count));
          //   } else {
          //   }
        }
      } else {
        // setIsLoading(false);
        console.log(error);
        // ChartGenderUpdated();
      }
    } catch (err) {
      console.log({ err });
      //   if (updatedGender === undefined) {
      //     await delay(5000);
      //     console.log("Waited 5s");
      //     ChartGenderUpdated();
      //   }
    }
  }

  async function ChartUpdatedFetchCore() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: "core",
            Categorical_variable: null,
            Filters: {
              Categorical: [], //TODO: should be changed
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
            let rounded = data[0].Avg_value;
            // if (data[0].Avg_value) {
            //   rounded = data[0].Avg_value?.toFixed(3);
            // }

            // setUpdatedCore(rounded);
            // setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else {
        // ChartUpdatedFetchCore();
        console.log(error);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
      //   if (updatedCore === undefined) {
      //     await delay(5000);
      //     console.log("Waited 5s");
      //     ChartUpdatedFetchCore();
      //   }
    }
  }

  async function ChartFetchUpdatedPreditionScore() {
    try {
      const response = (await API.graphql({
        query: getChartData,
        variables: {
          Model_id: selectedModelId,
          Audience: {
            Numerical_variable: "prediction_score",
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

      // console.log(actual_list);
      if (StatusCode === 200) {
        if (data) {
          if (data.length > 0) {
            // console.log(data);
            // let rounded = data[0].Avg_value;
            let rounded = data[0].Avg_value;
            // if (data[0].Avg_value) {
            //   rounded = data[0].Avg_value?.toFixed(3);
            // }

            // setUpdatedPreditionScore(rounded);
            // setAudienceCoverageUpdated(data);
          } else {
          }
        }
      } else {
        // ChartFetchUpdatedPreditionScore();
        console.log(error);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
      //   if (updatedPreditionScore === undefined) {
      //     await delay(5000);
      //     console.log("Waited 5s");
      //     ChartFetchUpdatedPreditionScore();
      //   }
    }
  }
}

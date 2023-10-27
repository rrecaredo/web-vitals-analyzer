import { functions } from "@dynatrace-sdk/app-utils";
import { useQuery } from "@tanstack/react-query";
import { BrowserType, MetricType, PageType } from "src/app/common/types";

type FetchSimulationResultsArgs = {
  tenant: string;
  app: string | null;
  range: { startDate: string; endDate: string };
  browserType: BrowserType | null;
  metricType: MetricType | null;
  pageName: PageType | null;
};

type ResponseType = {
  trends: {
    median: number;
    predicted: number;
    predictedMax: number;
    predictedMin: number;
  }[];
  target: number;
  current: number;
  benchmark: number;
};

const fetchSimulationResults = async ({
  tenant,
  app,
  range,
  browserType,
  metricType,
  pageName,
}: FetchSimulationResultsArgs) => {
  try {
    const apiResponse = await functions.call(
      "get-simulation-results",
      {
        data: {
          tenantId: tenant,
          appId: app,
          dates: `${range.startDate}_${range.endDate}`,
          pageName,
          metricType,
          browserType,
        },
      }
    );

    const jsonResponse = await apiResponse.json();

    if (jsonResponse.error) {
      throw new Error(jsonResponse?.error);
    }

    return jsonResponse.data;
  } catch (e) {
    console.error("Error fetching tenants", e.message, e.stack);
    throw e;
  }
};

export const useFetchSimulationResults = ({
  tenant,
  app,
  range,
  browserType,
  metricType,
  pageName,
}: FetchSimulationResultsArgs) => {
  const queryFnWithArgs = async () => {
    const simulationResults = await fetchSimulationResults({
      tenant,
      app,
      range,
      browserType,
      metricType,
      pageName,
    });
    return simulationResults;
  };

  const { data, refetch, isFetched, isLoading, error } = useQuery<ResponseType>({
    enabled: false,
    queryKey: [
      "simulation-results",
      tenant,
      app,
      range,
      browserType,
      metricType,
      pageName,
    ],
    queryFn: queryFnWithArgs,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, isFetched, request: refetch };
};

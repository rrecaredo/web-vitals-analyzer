import { functions } from "@dynatrace-sdk/app-utils";
import { useQuery } from "@tanstack/react-query";
import { BrowserType, MetricType, PageType } from "src/app/types";

type FetchSimulationResultsArgs = {
  tenant: string;
  app: string | null;
  range: { startDate: string; endDate: string };
  browserType: BrowserType | null;
  metricType: MetricType | null;
  pageName: PageType | null;
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
    const simulationResultResponse = await functions.call(
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
    return await simulationResultResponse.json();
  } catch (e) {
    // @TODO: Proper error handling
    console.warn("Error fetching simulation results", e);
    return [];
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

  /*
  @TODO: Type the response from useQuery, useQuery<ResponseType> where
  ResponseType should be something like
  {
    trends[],
    current,
    target,
    benchmark,
  }
  */
  const { data, refetch, isFetched, isLoading, error } = useQuery({
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

import { useEffect } from "react";
import { showToast } from "@dynatrace/strato-components-preview";

import { useFilters } from "@common/store";
import { useFetchSimulationResults } from "../requests";
import { useSimulationResultsFilters } from "../simulationResultsFilters.store";

export const useSimulationResults = () => {
  const { tenant, application, dateRange } = useFilters();
  const { browserType, page, metricType } = useSimulationResultsFilters();

  const { data, isLoading, isFetched, error, request } =
    useFetchSimulationResults({
      tenant,
      app: application,
      range: dateRange,
      browserType,
      pageName: page,
      metricType,
    });

  useEffect(() => {
    if (error)
      showToast({
        type: "critical",
        title: "Error",
        message: "Failed to load simulation results",
      });
  }, [error]);

  useEffect(() => {
    if (
      tenant &&
      application &&
      dateRange?.startDate &&
      dateRange?.endDate &&
      browserType &&
      page &&
      metricType
    ) {
      request();
    }
  }, [tenant, application, dateRange, request, browserType, page, metricType]);

  return {
    isLoading,
    isFetched,
    noData: !data?.trends?.length && isFetched,
    error,
    metricType,
    trends: data?.trends,
    target: data?.target,
    current: data?.current,
    benchmark: data?.benchmark,
  };
};

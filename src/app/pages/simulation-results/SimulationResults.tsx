import React, { useEffect } from "react";

import {
  Skeleton,
  Surface,
  TitleBar,
  showToast,
} from "@dynatrace/strato-components-preview";

import { useFiltersStore } from "src/app/store";
import { useFetchSimulationResults } from "./requests";
import { SimulationResultsFilters } from "./SimulationResultsFilters";
import { useSimulationResultsFiltersStore } from "./useSimulationResultsFilters.store";

export const SimulationResults = () => {
  const { tenant, application, dateRange } = useFiltersStore();
  const { browserType, page, metricType } = useSimulationResultsFiltersStore();
  const { data, isLoading, error, request } = useFetchSimulationResults();

  useEffect(() => {
    if (error)
      showToast({
        type: "critical",
        title: "Error",
        message: "Failed to load simulation results",
      });
  }, [error]);

  useEffect(() => {
    // @TODO: Move this to a custom hook
    if (
      tenant &&
      application &&
      dateRange?.startDate &&
      dateRange?.endDate &&
      browserType &&
      page &&
      metricType
    ) {
      request(tenant, application, dateRange, browserType, metricType, page);
    }
  }, [tenant, application, dateRange, request, browserType, page, metricType]);

  if (isLoading) return <Skeleton />;

  console.log(data);

  return (
    <>
      <TitleBar>
        <TitleBar.Title>Simulation Scores</TitleBar.Title>
      </TitleBar>
      {/* @TODO; Convert structure to a common component */}
      <main>
        {tenant && application && dateRange && (
          <>
            <Surface>
              <SimulationResultsFilters />
            </Surface>
          </>
        )}
      </main>
    </>
  );
};

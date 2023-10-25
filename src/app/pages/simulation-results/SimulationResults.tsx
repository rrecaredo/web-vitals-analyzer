import React, { useEffect } from "react";

import {
  Flex,
  Skeleton,
  Surface,
  TitleBar,
  showToast,
} from "@dynatrace/strato-components-preview";

import { useFiltersStore } from "src/app/store";
import { useFetchSimulationResults } from "./requests";
import { SimulationResultsFilters } from "./SimulationResultsFilters";
import { useSimulationResultsFiltersStore } from "./useSimulationResultsFilters.store";
import { SimulationResultPlot } from "./components/SimulationResultsPlot";

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
        <TitleBar.Title>Simulation Results</TitleBar.Title>
      </TitleBar>
      {/* @TODO; Convert structure to a common component */}
      <br />
      <main>
        {tenant && application && dateRange && (
          <Flex margin={2} flexDirection='column'>
            <Surface>
              <SimulationResultsFilters />
            </Surface>
            <br />
            {data && (
              <SimulationResultPlot width={500} height={500} data={data} />
            )}
          </Flex>
        )}
      </main>
    </>
  );
};

import React, { useEffect, useMemo } from "react";

import {
  Flex,
  SingleValue,
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
      request();
    }
  }, [tenant, application, dateRange, request, browserType, page, metricType]);

  const content = useMemo(() => {
    // Order of precedence: Error > Loading > Emptyness
    if (error) {
      return (
        <SingleValue data={""}>
          <SingleValue.ErrorState>Something went wrong</SingleValue.ErrorState>
        </SingleValue>
      );
    }

    if (!data?.trends?.length && isFetched) {
      return (
        <SingleValue data={""}>
          <SingleValue.EmptyState>No data available</SingleValue.EmptyState>
        </SingleValue>
      );
    }

    return isFetched ? (
      <SimulationResultPlot
        metricType={metricType || ""}
        data={data.trends}
        target={data.target}
        current={data.current}
        benchmark={data.benchmark}
      />
    ) : null;
  }, [data, error, isFetched, metricType]);

  if (error)
    return (
      <SingleValue data={""}>
        <SingleValue.ErrorState>Something went wrong</SingleValue.ErrorState>
      </SingleValue>
    );

  if (isLoading) return <Skeleton />;

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
            {content}
          </Flex>
        )}
      </main>
    </>
  );
};

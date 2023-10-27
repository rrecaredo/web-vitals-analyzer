import React, { useMemo } from "react";

import {
  Flex,
  SingleValue,
  Skeleton,
  Surface,
} from "@dynatrace/strato-components-preview";

import { SimulationResultsFilters, SimulationResultPlot } from "./components";
import { PageLayout } from "@common/components";
import { useSimulationResults } from "./hooks";

export const SimulationResults = () => {
  const {
    trends,
    target,
    current,
    benchmark,
    isLoading,
    isFetched,
    noData,
    error,
    metricType,
  } = useSimulationResults();

  console.log({
    trends,
    target,
    current,
    benchmark,
    metricType,
    isLoading,
    isFetched,
    noData,
    error,
  });

  const content = useMemo(() => {
    if (error) {
      return (
        <SingleValue data={""}>
          <SingleValue.ErrorState>Something went wrong</SingleValue.ErrorState>
        </SingleValue>
      );
    }

    if (noData) {
      return (
        <SingleValue data={""}>
          <SingleValue.EmptyState>No data available</SingleValue.EmptyState>
        </SingleValue>
      );
    }

    return isFetched ? (
      <SimulationResultPlot
        metricType={metricType || ""}
        data={trends || []}
        target={target}
        current={current}
        benchmark={benchmark}
      />
    ) : null;
  }, [
    error,
    isFetched,
    noData,
    metricType,
    benchmark,
    current,
    target,
    trends,
  ]);

  if (error)
    return (
      <SingleValue data={""}>
        <SingleValue.ErrorState>Something went wrong</SingleValue.ErrorState>
      </SingleValue>
    );

  if (isLoading) return <Skeleton />;

  return (
    <PageLayout title='Simulation Results'>
      <Flex margin={2} flexDirection='column'>
        <Surface>
          <SimulationResultsFilters />
        </Surface>
        <br />
        {content}
      </Flex>
    </PageLayout>
  );
};

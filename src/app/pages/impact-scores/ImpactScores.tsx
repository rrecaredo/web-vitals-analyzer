/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";

import {
  Skeleton,
  TitleBar,
  showToast,
} from "@dynatrace/strato-components-preview";

import { useFilters } from "@common/store";
import { useFetchImpactScores } from "./requests";
import { ImpactScoresTable } from "./components";

export const ImpactScores = () => {
  const { tenant, application, dateRange } = useFilters();
  const { data, isLoading, error, request } = useFetchImpactScores({
    tenant,
    application,
    dateRange,
  });

  useEffect(() => {
    if (error)
      showToast({
        type: "critical",
        title: "Error",
        message: "Failed to load impact scores",
      });
  }, [error]);

  useEffect(() => {
    if (tenant && application && dateRange?.startDate && dateRange?.endDate) {
      request();
    }
  }, [tenant, application, dateRange, request]);

  if (isLoading) return <Skeleton />;

  return (
    <>
      <TitleBar>
        <TitleBar.Title>Impact Scores</TitleBar.Title>
      </TitleBar>
      <main style={{ marginTop: "80px" }}>
        {data && <ImpactScoresTable data={data} />}
      </main>
    </>
  );
};

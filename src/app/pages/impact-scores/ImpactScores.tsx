import React, { useEffect } from "react";

import {
  Flex,
  Grid,
  Skeleton,
  Strong,
  Text,
  TitleBar,
  showToast,
} from "@dynatrace/strato-components-preview";

import { useFiltersStore } from "src/app/common/store";
import { useFetchImpactScores } from "./requests";
import { MetricCell, PageCell, PageColumn } from "./ImpactScores.styled";
import { getMetricColor } from "./utils";
import { METRICS_PRESETS } from "src/app/common";

export const ImpactScores = () => {
  const { tenant, application, dateRange } = useFiltersStore();
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
        {/* @TODO: Move to its own ImpactScoresTable component */}
        {data && (
          <Flex gap={0}>
            <PageColumn
              flexDirection='column'
              gap={0}
              paddingLeft={4}
              paddingRight={4}
              style={{ background: "white" }}
            >
              {Object.keys(data)?.map((page) => (
                <PageCell key={page}>
                  <Strong>{page}</Strong>
                </PageCell>
              ))}
            </PageColumn>
            <Flex
              flexGrow={1}
              flexWrap='wrap'
              flexDirection='column'
              style={{ position: "relative" }}
            >
              <Grid
                gridTemplateColumns='repeat(11, 1fr);'
                style={{ position: "absolute", top: "-36px" }}
              >
                {METRICS_PRESETS.map((metric) => (
                  <Text
                    key={metric.name}
                    textStyle='small-emphasized'
                    style={{ textAlign: "center" }}
                  >
                    {metric.name}
                  </Text>
                ))}
                {Object.entries(data)?.map(([_, metrics]) => {
                  return Object.entries(metrics)?.map(([_, metricValue], i) => (
                    <MetricCell
                      key={i}
                      color={getMetricColor(Number(metricValue))}
                    ></MetricCell>
                  ));
                })}
              </Grid>
            </Flex>
          </Flex>
        )}
      </main>
    </>
  );
};

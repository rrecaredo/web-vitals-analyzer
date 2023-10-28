import React from "react";
import {
  Flex,
  Strong,
  Grid,
  Text,
  Tooltip,
} from "@dynatrace/strato-components-preview";

import { METRICS_PRESETS } from "@common/constants";
import { PageColumn, PageCell, MetricCell } from "../ImpactScores.styled";
import { getMetricColor } from "../utils";
import { ImpactScoresResponseType } from "../requests";

type ImpactScoresTableProps = {
  data: ImpactScoresResponseType;
};

export const ImpactScoresTable = ({ data }: ImpactScoresTableProps) => {
  return (
    <div className='impact-scores-table'>
      <Flex gap={0} mt={64}>
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
                <Tooltip key={i} text={metricValue} delay='none'>
                  <MetricCell
                    color={getMetricColor(Number(metricValue))}
                  ></MetricCell>
                </Tooltip>
              ));
            })}
          </Grid>
        </Flex>
      </Flex>
    </div>
  );
};

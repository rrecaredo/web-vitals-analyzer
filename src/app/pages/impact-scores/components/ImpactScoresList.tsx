import React from "react";
import {
  Flex,
  Grid,
  Text,
  Surface,
  Heading,
} from "@dynatrace/strato-components-preview";

import { METRICS_PRESETS } from "@common/constants";
import { MetricCell } from "../ImpactScores.styled";
import { getMetricColor } from "../utils";
import { ImpactScoresResponseType } from "../requests";

type ImpactScoresListProps = {
  data: ImpactScoresResponseType;
};

export const ImpactScoresList = ({ data }: ImpactScoresListProps) => {
  return (
    <Flex flexDirection='row' gap={0} className='impact-scores-list' mt={16}>
      {Object.keys(data)?.map((page) => (
        <Surface key={page} mb={16}>
          <Flex width='100%' justifyContent='center'>
            <Heading as='h2' level={5}>
              {page}
            </Heading>
          </Flex>
          <Grid
            gridTemplateColumns='repeat(6, 1fr);'
            alignItems='center'
            pt={16}
          >
            {METRICS_PRESETS.map((metric) => (
              <React.Fragment key={metric.name}>
                <Text
                  textStyle='small-emphasized'
                  style={{ textAlign: "center" }}
                >
                  {metric.name}
                </Text>
                <MetricCell
                  color={getMetricColor(Number(data[page][metric.accessor]))}
                ></MetricCell>
              </React.Fragment>
            ))}
          </Grid>
        </Surface>
      ))}
    </Flex>
  );
};

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import useResizeObserver from "@react-hook/resize-observer";
import Colors from "@dynatrace/strato-design-tokens/colors";

import { Impact } from "../types";
import { useSimulationDataMapping } from "./useSimulationDataMapping";
import { MetricType } from "@common/types";
import { CustomReferenceArea } from "../CustomReferenceArea";
import { scaleLinear } from "d3-scale";

export type ThresholdProps = {
  data: Impact[];
  target?: number;
  current?: number;
  benchmark?: number;
  metricType: MetricType;
};

export function SimulationResultPlot({
  data = [],
  metricType,
  target,
  current,
  benchmark,
}: ThresholdProps) {
  const [chartWidth, setChartWidth] = useState(0);

  const plotData = useSimulationDataMapping(data);

  // Calculates the domain for both the x and y axis and adds some delta
  // to the edges to make extra room for the reference areas and their
  // labels.
  const yDomain = [0, Math.max(...data.map((d) => d.predictedMax)) + 0.1];

  const xDomain = useMemo(
    () => [
      Math.min(
        ...[
          ...data.map((d) => d.median),
          target || 0,
          current || 0,
          benchmark || 0,
        ]
      ) - 200,
      Math.max(
        ...[
          ...data.map((d) => d.median),
          target || 0,
          current || 0,
          benchmark || 0,
        ]
      ) + 200,
    ],
    [benchmark, current, data, target]
  );

  // Uses a ref to obtain the width of the chart container and
  // subtracts the cartesian grid offset to get the width of the
  // visible chart area.
  const chartRef = useRef<HTMLDivElement | null>(null);

  const cartesianGridOffset = 70;

  useLayoutEffect(() => {
    setChartWidth(
      chartRef.current?.offsetWidth
        ? chartRef.current.offsetWidth - cartesianGridOffset
        : 0
    );
  }, []);

  useResizeObserver(chartRef, (entry) =>
    setChartWidth(entry.contentRect.width + cartesianGridOffset)
  );

  const invertedXDomain = [xDomain[1], xDomain[0]];

  // Leverages the d3 scale to calculate the x position of the reference
  // areas based on the new scale. (scores to pixels ratio)
  const xScale = useMemo(
    () => scaleLinear().domain(xDomain).range([0, chartWidth]),
    [chartWidth, xDomain]
  );

  const percentageTickFormatter = (value: number) =>
    `${(value * 100).toFixed(1)}%`;

  // Adds dummy points to the edges of the chart to make sure
  // the reference areas are always within the viewport of the chart.
  const augmentedPlotData = [
    {
      median: xDomain[1] + 200,
      fakeValue: 0,
    },
    ...plotData,
    {
      median: xDomain[0] - 200,
      fakeValue: 0,
    },
  ];

  return (
    <div style={{ width: "100%", height: "600px" }} ref={chartRef}>
      <ResponsiveContainer debounce={1} width='99%'>
        <ComposedChart data={augmentedPlotData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey={"median"}
            tickFormatter={(value) => `${value}`}
            fontSize={12}
            domain={invertedXDomain}
            angle={-90}
            tickMargin={15}
            label={{
              value: `Median ${metricType}`,
              fontSize: 12,
              fontWeight: "bold",
              offset: 50,
              position: "insideBottom",
            }}
          />
          <YAxis
            tickFormatter={percentageTickFormatter}
            fontSize={12}
            domain={yDomain}
            label={{
              value: "Median Exit Rate",
              angle: -90,
              fontSize: 12,
              fontWeight: "bold",
              position: "insideLeft",
            }}
          />
          <Line
            dataKey='predicted'
            stroke={Colors.Charts.Categorical.Color01.Default}
            isAnimationActive={false}
          />
          <Line
            dataKey='fakeValue'
            stroke={Colors.Charts.Categorical.Color01.Default}
            isAnimationActive={false}
          />
          <Area
            dataKey='predictedRange'
            strokeWidth={0}
            fillOpacity={0.5}
            fill={Colors.Charts.CategoricalThemed.Swamps.Color01.Default}
            isAnimationActive={false}
          />
          {target && (
            <>
              {CustomReferenceArea({
                value: chartWidth - xScale(target),
                fill: Colors.Charts.CategoricalThemed.PurpleRain.Color05
                  .Default,
                label: "target",
              })}
            </>
          )}
          {current && (
            <>
              {CustomReferenceArea({
                value: chartWidth - xScale(current),
                fill: Colors.Charts.CategoricalThemed.Swamps.Color04.Default,
                label: "current",
              })}
            </>
          )}
          {benchmark && (
            <>
              {CustomReferenceArea({
                value: chartWidth - xScale(benchmark),
                fill: Colors.Charts.CategoricalThemed.Fireplace.Color04.Default,
                label: "benchmark",
              })}
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

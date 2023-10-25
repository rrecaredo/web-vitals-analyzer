import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Colors from "@dynatrace/strato-design-tokens/colors";

import { Impact } from "./types";
import { useSimulationDataMapping } from "./useSimulationDataMapping";
import { MetricType } from "src/app/types";
import { CustomReferenceArea } from "./CustomReferenceArea";
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

  const yDomain = [0, Math.max(...data.map((d) => d.predictedMax)) + 0.1];

  const xDomain = useMemo(
    () => [
      Math.max(...data.map((d) => d.median)),
      Math.min(...data.map((d) => d.median)),
    ],
    [data]
  );

  const updateChartDimensions = useCallback(() => {
    const chartContainer: HTMLElement = document.querySelector(
      ".recharts-cartesian-grid"
    ) as HTMLElement;

    setChartWidth(chartContainer?.offsetWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateChartDimensions);

    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, [updateChartDimensions]);

  const xScale = useMemo(
    () => scaleLinear().domain(xDomain).range([0, chartWidth]),
    [chartWidth, xDomain]
  );

  const percentageTickFormatter = (value: number) =>
    `${(value * 100).toFixed(1)}%`;

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ResponsiveContainer debounce={1} width='99%'>
        <ComposedChart data={plotData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey={"median"}
            tickFormatter={(value) => `${value}`}
            fontSize={12}
            domain={xDomain}
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
          <Area
            dataKey='predictedRange'
            strokeWidth={0}
            fillOpacity={0.5}
            fill={Colors.Charts.CategoricalThemed.Swamps.Color01.Default}
            isAnimationActive={false}
          />
          {/* ---------------------------------------------------------------------------------------------- */}
          {/* REFERENCE AREAS ARE NOT RENDERING CORRECTLY BECAUSE THE SCALE IS NOT PROPERLY BEING CALCULATED */}
          {/* ---------------------------------------------------------------------------------------------- */}

          {/* {target && (
            <>
              {CustomReferenceArea({
                value: xScale(target),
                fill: Colors.Charts.CategoricalThemed.PurpleRain.Color05
                  .Default,
                label: "Target",
              })}
            </>
          )} */}
          {/* {current && (
            <>
              {CustomReferenceArea({
                value: xScale(current),
                fill: Colors.Charts.CategoricalThemed.Swamps.Color04.Default,
                label: "Current",
              })}
            </>
          )}
          {benchmark && (
            <>
              {CustomReferenceArea({
                value: xScale(benchmark),
                fill: Colors.Charts.CategoricalThemed.Fireplace.Color04.Default,
                label: "Benchmark",
              })}
            </>
          )} */}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

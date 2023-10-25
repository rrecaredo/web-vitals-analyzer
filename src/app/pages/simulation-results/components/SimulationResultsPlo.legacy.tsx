/*
-----------------------------------------------------------------------------
I wanted to use a Dynatrace equivalent of TimeSeriesChart so as to leverage
Annotations, Markers, Tracks and so on, but as the name suggests, TimeSeries
components are coupled to over time specific data, which is not the case for
the use case.

Originally I considered creating the entire chart from scratch by composing SVG
elements, using a coorddinate system and event delegation to handle tooltips
but I soon discarded it as although possible, I found this approach to be
too complex for a take home assignment.

Next, this was an attempt to use Airbnb visx charting solution to create a chart
for the simulation results but then I realized it was going to take me too
long tweak it to my needs, so I decided to go with Recharts instead.
-----------------------------------------------------------------------------
*/

/*
import React from "react";
import { Group } from "@visx/group";
import { curveBasis } from "@visx/curve";
import { Threshold } from "@visx/threshold";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";

export const background = "#f3f3f3";

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

type Impact = {
  median: number;
  predictedMin: number;
  predictedMax: number;
};

export type ThresholdProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  data: Impact[];
};

export function SimulationResultPlot({
  width,
  height,
  margin = defaultMargin,
  data = [],
}: ThresholdProps) {
  if (width < 10) return null;

  const yScale = scaleLinear<number>({
    domain: [
      Math.min(...data.map((d) => d.predictedMin)),
      Math.max(...data.map((d) => d.predictedMax)),
    ],
    nice: true,
  });

  const xScale = scaleLinear<number>({
    domain: [
      Math.min(...data.map((d) => d.median)),
      Math.max(...data.map((d) => d.median)),
    ],
  });

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={xMax}
            height={yMax}
            stroke='#e0e0e0'
          />
          <GridColumns
            scale={xScale}
            width={xMax}
            height={yMax}
            stroke='#e0e0e0'
          />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke='#e0e0e0' />
          <AxisBottom
            top={yMax}
            scale={xScale}
            numTicks={width > 520 ? 10 : 5}
          />
          <AxisLeft
            scale={yScale}
            tickFormat={(d) => {
              console.log(Math.ceil(d as number) * 100);
              return `${Math.floor((d as number) * 100)}%`;
            }}
          />
          <Threshold<Impact>
            id={`${Math.random()}`}
            data={data}
            x={(d) => xScale(d.median) ?? 0}
            y0={(d) => yScale(d["predictedMin"]) ?? 0}
            y1={(d) => yScale(d["predictedMax"]) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: "violet",
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: "green",
              fillOpacity: 0.4,
            }}
          />
        </Group>
      </svg>
    </div>
  );
}
*/

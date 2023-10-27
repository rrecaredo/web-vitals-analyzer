import React, { useRef } from "react";

type ReferenceAreaProps = {
  value: number;
  fill: string;
  label: string;
};

/**
 * Creates a canvas elenment on the fly with the goal of measuring text
 * and using the width of the text to position the label on the chart.
 */
const getCanvasContext = (): CanvasRenderingContext2D | null => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = getComputedStyle(document.body).font;
  }
  return context;
};

/**
 * Custom reference area component that allows for custom labels
 * and positioning.
 * @param value - The delta value from the start of the chart
 * @param fill - The color of the reference area
 * @param label - The label to display on the chart
 **/
export const CustomReferenceArea = ({
  value,
  fill,
  label,
}: ReferenceAreaProps) => {
  const context = useRef(getCanvasContext());
  const textMetrics = context.current?.measureText(label);

  return (
    <>
      <rect
        x={75 + value}
        y={25}
        width={40}
        height='calc(100% - 60px)'
        fill={fill}
        fillOpacity={0.3}
      />
      <rect
        x={getLabelOffset(label) + value}
        y={0}
        width={textMetrics?.width ? textMetrics?.width : 0}
        height='20'
        rx='5'
        ry='5'
        fill={fill}
        fillOpacity={0.3}
      />
      <text
        x={
          getLabelOffset(label) +
          value +
          (textMetrics?.width ? textMetrics?.width / 2 : 0)
        }
        y={10}
        textAnchor='middle'
        fill='black'
        dominantBaseline='middle'
        style={{ fontSize: "12px", fontWeight: "500" }}
      >
        {label}
      </text>
    </>
  );
};

/**
 * Helper function to determine the offset of the label
 * based on the label name.
 * Label positioning should be deterministic, but for some reason I have not
 * figured out, the positioning is off by a few pixels so I am forcing a more
 * accurate positioning with this function.
 **/
function getLabelOffset(label: string) {
  switch (label) {
    case "target":
      return 72;
    case "current":
      return 60;
    default:
      return 50;
  }
}

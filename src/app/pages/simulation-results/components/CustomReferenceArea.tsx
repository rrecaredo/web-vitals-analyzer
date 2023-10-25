import React, { useRef } from "react";

type ReferenceAreaProps = {
  value: number;
  fill: string;
  label: string;
};

const getCanvasContext = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = getComputedStyle(document.body).font;
  }
  return context;
};

// This is a workaround because I had issues with the recharts official ReferenceArea
// It didn't like the fact that the domain is reversed and was not drawing the area
// correctly.
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
        y={45}
        width={40}
        height='calc(100% - 80px)'
        fill={fill}
        fillOpacity={0.3}
      />
      <rect
        x={70 + value}
        y={0}
        width={textMetrics?.width ? textMetrics?.width : 0}
        height='30'
        rx='10'
        ry='10'
        fill={fill}
        fillOpacity={0.3}
      />
      <text
        x={70 + value + (textMetrics?.width ? textMetrics?.width / 2 : 0)}
        y={15}
        textAnchor='middle'
        fill='black'
        dominantBaseline='middle'
        style={{ fontSize: "12px" }}
      >
        {label}
      </text>
    </>
  );
};

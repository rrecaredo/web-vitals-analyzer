import React from "react";

type ReferenceAreaProps = {
  value: number;
  fill: string;
  label: string;
};

// This is a workaround because I had issues with the recharts official ReferenceArea
// It didn't like the fact that the domain is reversed and was not drawing the area
// correctly.
export const CustomReferenceArea = ({
  value,
  fill,
  label,
}: ReferenceAreaProps) => {
  return (
    <>
      <rect
        x={65 + value}
        y={5}
        width={40}
        height='calc(100% - 40px)'
        fill={fill}
        fillOpacity={0.3}
      />
      <text
        x={130 + value / 2}
        y={15}
        textAnchor='middle'
        fill='black'
        style={{ fontSize: "12px" }}
      >
        {label}
      </text>
    </>
  );
};

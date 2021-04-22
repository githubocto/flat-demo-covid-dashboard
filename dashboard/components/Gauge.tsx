import React from "react";
import { arc, scaleLinear, format } from "d3";

type Props = {
  value: number;
  label: string;
  min?: number;
  max?: number;
  units?: string;
};

export const Gauge = ({
  value = 50,
  label,
  min = 0,
  max = 100,
  units,
}: Props) => {
  const backgroundArc = arc().cornerRadius(1)({
    innerRadius: 0.55,
    outerRadius: 1,
    startAngle: -Math.PI / 1.75,
    endAngle: Math.PI / 1.75,
  });
  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
  const percent = percentScale(value);
  const angleScale = scaleLinear()
    .domain([-0.25, 1.25])
    .range([-Math.PI / 1.75, Math.PI / 1.75])
    .clamp(true);
  const angle = angleScale(percent);
  const filledArc = arc()({
    innerRadius: 0.55,
    outerRadius: 1,
    startAngle: 0,
    endAngle: angle,
  });

  const colorScale = scaleLinear<string>()
    .domain([0, 0.5, 1])
    .range(["#F05C3B", "#fff", "#35C970"]);
  const markerLocation = getCoordsOnArc(angle, 1 - (1 - 0.55) / 2);
  return (
    <div className="flex-col align-center">
      <svg
        className="m-auto mb-8 overflow-visible"
        width="9em"
        viewBox={[-1, -1, 2, 1].join(" ")}
      >
        <defs>
          <pattern
            id="Gauge__gradient"
            patternUnits="userSpaceOnUse"
            x="-1"
            width="2"
            height="1"
          >
            <image
              href="/flat-demo-covid-dashboard/gauge_background.png"
              x="0"
              y="0"
              width="2"
              height="1"
            ></image>
          </pattern>
        </defs>
        <path d={backgroundArc || ""} className="text-gray-200 fill-current" />
        <path d={filledArc || ""} fill="url(#Gauge__gradient)" />
        <line y1="-1" y2="-0.5" stroke="white" strokeWidth="0.027" />
        <circle
          className="text-gray-600 stroke-current transition-all duration-400"
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r="0.24"
          strokeWidth="0.01"
          fill={colorScale(percent)}
        />
        <path
          d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
          transform={`rotate(${
            angle * (180 / Math.PI)
          }) translate(-0.2, -0.33)`}
          className="text-gray-300 fill-current transition-all duration-400"
        />
      </svg>
      <div className="text-6xl line-height-1 text-gray-800 font-black tabular-nums text-center w-36">
        <span
          className="text-gray-800 font-black text-5xl"
          style={{ verticalAlign: "11%" }}
        >
          {value > 0 ? "+" : "-"}
        </span>
        {format(",")(Math.abs(value))}
        <span className="text-gray-300 font-medium ml-1 text-5xl">%</span>
      </div>
      {!!label && (
        <div className="mt-1 text-lg text-gray-500 font-light text-center">
          {label}
        </div>
      )}
      {!!units && (
        <div className="text-xs text-gray-600 font-light">{units}</div>
      )}
    </div>
  );
};
const getCoordsOnArc = (angle: number, offset = 10) => [
  Math.cos(angle - Math.PI / 2) * offset,
  Math.sin(angle - Math.PI / 2) * offset,
];

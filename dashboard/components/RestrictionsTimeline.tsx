import React from "react";
import { extent, range, scaleLinear, scaleTime, line, timeFormat } from "d3";
import fromPairs from "lodash/fromPairs";
import startCase from "lodash/startCase";

type AccessorType = (d: any) => number | Date | null;
type Props = {
  data: any[];
  xAccessor: AccessorType;
};

const formatDate = (d: Date) =>
  d.getDate() === 1 ? timeFormat("%-b %Y")(d) : timeFormat("%-b %-d, %Y")(d);
export const RestrictionsTimeline = ({ data, xAccessor }: Props) => {
  const filteredData = data.filter((d) =>
    Object.values(d).find((d) => typeof d === "number")
  );
  const lineOffset = 2.3;
  const yOffset = (lineOffset * 6) / 2;
  // @ts-ignore
  const xScale = scaleTime()
    .domain(extent(filteredData, xAccessor) as [number, number])
    .range([0, 100]);
  const xTicks = xScale
    .ticks(3)
    .map((tick) => [xScale(tick), formatDate(tick)]);
  const yScale = scaleLinear().domain([0, 5]).range([100, 0]);
  const yTicks = [0, 1, 2, 3, 4].map((tick) => [
    yScale(tick),
    tick.toLocaleString(),
  ]);

  const lineGenerator = (yAccessor: AccessorType) =>
    line()
      .x((d: any) => xScale(xAccessor(d)))
      .y((d: any) => yScale(yAccessor(d)))
      .defined((d: any) => Number.isFinite(yAccessor(d)))(filteredData);

  const lastPoint = filteredData.slice(-1)[0] || {};
  const keys = Object.keys(lastPoint).filter((d) => d !== "Date");
  const keyColors = fromPairs(
    keys.map((key, i) => [key, colors[i % colors.length]])
  );
  const lastKeyValues = keys.map((key) => [
    key,
    ([...data].reverse().find((d) => d[key] !== null) || {})[key],
  ]);

  return (
    <div
      className="relative w-full max-w-7xl mb-8 flex"
      style={{ height: 460 }}
    >
      <div className="relative h-full flex-none w-0">
        {yTicks.map(([offset, value]) => (
          <div
            className="absolute w-0 h-0 flex items-center justify-end left-full -ml-2 tabular-nums"
            style={{ top: `${offset}%` }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <svg
          className="overflow-visible w-full h-full"
          preserveAspectRatio="none"
          viewBox={[0, yOffset, 100, 100].join(" ")}
        >
          {range(1, 6).map((i) => (
            <g key={i} transform={`translate(0, ${yScale(i - 0.5) + yOffset})`}>
              <line
                x2="100"
                className="text-gray-200 stroke-current"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
          {keys.map((key, i) => (
            <g key={key} transform={`translate(0, ${lineOffset * i})`}>
              <path
                d={lineGenerator((d) => d[key]) || ""}
                className={`${
                  colors[i % colors.length]
                } stroke-current mix-blend-multiply transition-all duration-400`}
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </svg>
        <div className="w-full h-10 mt-10 whitespace-nowrap">
          {xTicks.map(([offset, value]) => (
            <div
              className="absolute w-0 flex justify-center tabular-nums"
              style={{ left: `${offset}%` }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="h-full flex-none w-40">
        {lastKeyValues.map(
          ([key, value], i) =>
            value !== undefined && (
              <div
                key={key}
                className={`absolute ${keyColors[key]} -mt-6 whitespace-nowrap text-xs pl-2 font-semibold transition-all duration-400`}
                style={{
                  top: `${yScale(value) + i * 2.3 - 3.5}%`,
                }}
              >
                {startCase(key)}
              </div>
            )
        )}
      </div>
    </div>
  );
};

const colors = [
  "text-indigo-500",
  "text-green-500",
  "text-yellow-600",
  "text-gray-500",
  "text-pink-500",
  "text-blue-500",
];

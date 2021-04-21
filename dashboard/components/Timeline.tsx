import React from "react";
import { extent, scaleLinear, scaleTime, area, line, timeFormat } from "d3";
import flatten from "lodash/flatten";

type AccessorType = (d: any) => number | Date | null;
type Props = {
  data: any[];
  xAccessor: AccessorType;
  yAccessors: AccessorType[];
};

const formatDate = (d) =>
  d.getDate() === 1 ? timeFormat("%-b %Y")(d) : timeFormat("%-b %-d, %Y")(d);
export const Timeline = ({ data, xAccessor, yAccessors }: Props) => {
  // @ts-ignore
  const yExtent = extent(
    flatten(yAccessors.map((accessor) => data.map(accessor)))
  ) as [number, number];
  const xScale = scaleTime()
    .domain(extent(data, xAccessor) as [number, number])
    .range([0, 100]);
  const xTicks = xScale
    .ticks(5)
    .map((tick) => [xScale(tick), formatDate(tick)]);
  const yScale = scaleLinear().domain(yExtent).range([0, 100]);
  const yTicks = yScale
    .ticks(3)
    .map((tick) => [100 - yScale(tick), tick.toLocaleString()]);

  const areaGenerator = (yAccessor: AccessorType) =>
    area()
      .x((d: any) => xScale(xAccessor(d)))
      .y0(100)
      .y1((d: any) => yScale(yAccessor(d)))
      .defined((d: any) => Number.isFinite(yAccessor(d)))(data);
  const lineGenerator = (yAccessor: AccessorType) =>
    line()
      .x((d: any) => xScale(xAccessor(d)))
      .y((d: any) => yScale(yAccessor(d)))
      .defined((d: any) => Number.isFinite(yAccessor(d)))(data);

  return (
    <div className="relative w-full max-w-7xl mb-8 flex">
      <div className="relative h-40 flex-none w-20">
        {yTicks.map(([offset, value]) => (
          <div
            className="absolute w-0 h-0 flex items-center justify-end left-full -ml-2 tabular-nums"
            style={{ top: `${offset}%` }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="w-full">
        <svg
          className="overflow-visible w-full h-40"
          preserveAspectRatio="none"
          viewBox={[0, 0, 100, 100].join(" ")}
        >
          {yAccessors.map((yAccessor, i) => (
            <g key={i}>
              {yAccessors.length === 1 && (
                <path
                  d={areaGenerator(yAccessor) || ""}
                  className="text-indigo-50 fill-current"
                />
              )}
              <path
                d={lineGenerator(yAccessor) || ""}
                className={`${
                  colors[i % colors.length]
                } stroke-current mix-blend-multiply`}
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </svg>
        <div className="w-full h-10 mt-2 whitespace-nowrap">
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
    </div>
  );
};

const colors = [
  "text-indigo-500",
  "text-green-500",
  "text-yellow-500",
  "text-gray-500",
  "text-pink-500",
  "text-blue-500",
];

import React from "react";
import { MobilityDataType } from "../interfaces";
import { MobilityDataPill } from "./MobilityDataPill";

type Props = {
  data: MobilityDataType;
};

export const MobilityData = ({ data }: Props) => {
  const { date, ...metrics } = data;

  return (
    <div className="flex flex-wrap -m-2 -mx-10">
      {(Object.keys(metrics) as MetricType[]).map((metric) => (
        <MobilityDataPill
          key={metric}
          name={metricKeyToLabelMap[metric]}
          value={metrics[metric]}
        />
      ))}
    </div>
  );
};

type MetricType =
  | "groceryAndPharmacyPercentChangeFromBaseline"
  | "parksPercentChangeFromBaseline"
  | "residentialPercentChangeFromBaseline"
  | "retailAndRecreationPercentChangeFromBaseline"
  | "transitStationsPercentChangeFromBaseline"
  | "workplacesPercentChangeFromBaseline";

const metricKeyToLabelMap = {
  groceryAndPharmacyPercentChangeFromBaseline: "Grocery & pharmacy",
  parksPercentChangeFromBaseline: "Parks",
  residentialPercentChangeFromBaseline: "Residential",
  retailAndRecreationPercentChangeFromBaseline: "Retail & recreation",
  transitStationsPercentChangeFromBaseline: "Transit stations",
  workplacesPercentChangeFromBaseline: "Workplaces",
};

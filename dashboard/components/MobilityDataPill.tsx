import React from "react";
import { Gauge } from "./Gauge";

type Props = {
  name: string;
  value: number;
};

export const MobilityDataPill = ({ name, value }: Props) => {
  return (
    <div className="p-4 px-10 m-2">
      <Gauge value={value} label={name} min={-40} max={40} />
    </div>
  );
};

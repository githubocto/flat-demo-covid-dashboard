import React from "react";
import { timeParse } from "d3";
import { StateDataType } from "../interfaces";
import { MobilityData } from "./MobilityData";
import { Timeline } from "./Timeline";
import { RestrictionsTimeline } from "./RestrictionsTimeline";
import data from "../data.json";

console.log(data);
type Props = {
  state: string;
};

export const StateData = ({ state }: Props) => {
  const stateData = (data as StateDataType[]).find(
    (item) => item.name === state
  );
  if (!stateData) return null;

  return (
    <div className="p-6 px-10 lg:px-20" id={state}>
      <div className="flex align-center">
        <h1 className="title relative">
          {/* <a
            className="font-light text-gray-300 absolute right-full mr-4"
            href={`#${state}`}
          >
            #
          </a> */}
          {state}
        </h1>
      </div>

      <section className="mt-6 mb-24">
        <h2 className="heading">
          Mobility{" "}
          <span className="font-extralight">(Change from baseline)</span>
        </h2>
        <MobilityData data={stateData["mobility"]} />
      </section>

      <section className="mt-6 mb-44">
        <h2 className="heading">Restrictions</h2>
        <RestrictionsTimeline
          data={stateData["restrictions"]}
          xAccessor={xAccessor}
        />
      </section>

      <section className="mt-6 mb-24">
        <h2 className="heading">COVID Cases</h2>
        <Timeline
          data={stateData["covidStats"]}
          xAccessor={xAccessor}
          yAccessors={[(d) => d["Cases_Total"]]}
        />
        <h2 className="heading">COVID Deaths</h2>
        <Timeline
          data={stateData["covidStats"]}
          xAccessor={xAccessor}
          yAccessors={[(d) => d["Deaths_Total"]]}
        />
      </section>
    </div>
  );
};

const parseDate = timeParse("%Y%m%d");
const xAccessor = (d: any) => parseDate(d["Date"]);

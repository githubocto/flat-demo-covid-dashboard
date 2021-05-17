import React from "react";
import { timeParse } from "d3";
import { StateDataType } from "../interfaces";
import { MobilityData } from "./MobilityData";
import { Timeline } from "./Timeline";
import { RestrictionsTimeline } from "./RestrictionsTimeline";

type Props = {
  data: StateDataType;
};

export const StateData = ({ data }: Props) => {
  return (
    <div className="p-6 px-10 lg:px-20" id={data.name}>
      <div className="flex align-center">
        <h1 className="title relative">
          {/* <a
            className="font-light text-gray-300 absolute right-full mr-4"
            href={`#${state}`}
          >
            #
          </a> */}
          {data.name}
        </h1>
      </div>

      <section className="mt-6 mb-24">
        <h2 className="heading">
          Mobility{" "}
          <span className="font-extralight">(Change from baseline)</span>
        </h2>
        <p className="text-gray-500 mb-6 font-light tracking-wide">
          This data is from{" "}
          <a
            className="underline"
            href="https://www.google.com/covid19/mobility/"
          >
            Google's Community Mobility Reports
          </a>
          . We're looking at the percent change from baseline (the median value,
          for the corresponding day of the week, from Jan 3 – Feb 6, 2020).
        </p>
        <MobilityData data={data["mobility"]} />
      </section>

      <section className="mt-6 mb-44">
        <h2 className="heading">Restrictions</h2>
        <div className="text-gray-500 mb-6 font-light tracking-wide">
          <p>
            This data is from{" "}
            <a
              className="underline"
              href="https://www.bsg.ox.ac.uk/research/research-projects/covid-19-government-response-tracker"
            >
              Oxford's COVID-19 Government Response Tracker
            </a>
            . A higher number indicates more restriction for a specific
            category, broadly:
          </p>
          <ul className="my-4">
            <li>
              <strong>0</strong> no restrictions
            </li>
            <li>
              <strong>1</strong> recommend closing
            </li>
            <li>
              <strong>2</strong> required some closing
            </li>
            <li>
              <strong>3</strong> required all closing
            </li>
            <li>
              <strong>4</strong> ban all
            </li>
          </ul>
          <p>
            For specific levels for each category, see{" "}
            <a
              className="underline"
              href="https://github.com/OxCGRT/covid-policy-tracker/blob/master/documentation/codebook.md#containment-and-closure-policies"
            >
              the official codebook
            </a>
            .
          </p>
        </div>

        <RestrictionsTimeline
          data={data["restrictions"]}
          xAccessor={xAccessorRestrictions}
        />
      </section>

      <section className="mt-6 mb-24">
        <h2 className="heading">COVID Cases</h2>
        <p className="text-gray-500 mb-12 font-light tracking-wide">
          This data is from{" "}
          <a
            className="underline"
            href="https://github.com/nytimes/covid-19-data#cumulative-cases-and-deaths"
          >
            this NYTimes GitHub repository
          </a>
          , depicting up-to-date stats on COVID-19 cases and deaths per state in
          the United States.
        </p>
        <Timeline
          data={data["covidStats"]}
          xAccessor={xAccessor}
          yAccessors={[(d) => d["cases"]]}
        />
        <h2 className="heading">COVID Deaths</h2>
        <Timeline
          data={data["covidStats"]}
          xAccessor={xAccessor}
          yAccessors={[(d) => d["deaths"]]}
        />
      </section>
    </div>
  );
};

const parseDate = timeParse("%m/%d/%Y");
const xAccessor = (d: any) => parseDate(d["Date"]);
const xAccessorRestrictions = (d: any) => timeParse("%Y%m%d")(d["Date"]);

import React from "react";
import Layout from "../components/Layout";
import { StateData } from "../components/StateData";
import data from "./../data.json";
import { StateDataType } from "./../interfaces";

const states = (data as StateDataType[]).map((d) => d["name"]).sort();

const IndexPage = () => {
  const [selectedState, setSelectedState] = React.useState("Alabama");
  return (
    <Layout title="COVID state dashboard">
      <div className="flex">
        <div
          className="flex-none flex flex-col items-start p-6 overflow-auto mt-6"
          // style={{ maxHeight: "100vh" }}
        >
          {states.map((state) => (
            <button
              className={`block w-full text-left py-1 px-4 ${
                state === selectedState ? "bg-indigo-50" : ""
              }`}
              key={state}
              onClick={() => setSelectedState(state)}
            >
              {state}
            </button>
          ))}
          {/* <select value={state} onChange={(e) => setState(e.target.value)}>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
          </select> */}
        </div>
        <section className="mt-8 mb-24">
          <StateData state={selectedState} />
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;

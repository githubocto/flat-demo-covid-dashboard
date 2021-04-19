import Layout from "../components/Layout";
import { StateData } from "../components/StateData";
import data from "./../data.json";
import { StateDataType } from "./../interfaces";

const states = (data as StateDataType[]).map((d) => d["name"]).sort();

const IndexPage = () => (
  <Layout title="COVID state dashboard">
    {states.map((state) => (
      <section className="mt-8 mb-24" key={state}>
        <StateData state={state} />
      </section>
    ))}
  </Layout>
);

export default IndexPage;

import data from "./../../data.json";
import { StateDataType } from "interfaces";
import Layout from "./../../components/Layout";
import { StateData } from "./../../components/StateData";
import { kebabCase } from "lodash";

const states = (data as StateDataType[]).map((d) => d["name"]).sort();

type StateProps = {
  slug: string;
  data: StateDataType;
};
const State = ({ data }: StateProps) => {
  return (
    <Layout>
      <StateData data={data} />
    </Layout>
  );
};

export const getStaticPaths = () => {
  return {
    paths: states.map((state) => ({
      params: {
        slug: kebabCase(state),
      },
    })),
    fallback: false,
  };
};

export default State;

export const getStaticProps = ({ params }: { params: StateProps }) => {
  const stateData = data.find((d) => kebabCase(d["name"]) === params.slug);
  return {
    props: {
      slug: params.slug,
      data: stateData,
    },
  };
};

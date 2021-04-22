import React from "react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/state/alabama");
  }, []);
  return null;
};

export default IndexPage;

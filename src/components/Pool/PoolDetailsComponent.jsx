import { useRouter } from "next/router";
import React from "react";

const PoolDetailsComponent = () => {
  const {
    query: { slug },
  } = useRouter();

  return <div>PoolDetailsComponent of {slug}</div>;
};

export default PoolDetailsComponent;

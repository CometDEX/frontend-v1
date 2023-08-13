import React from "react";
import PoolDetailsComponent from "../../components/Pool/PoolDetailsComponent";
import { useRouter } from "next/router";
import CreatePoolComponent from "../../components/Pool/CreatePoolComponent";

const PoolDetailsPage = () => {
  const {
    query: { slug },
  } = useRouter();

  if (slug === "create") {
    return <CreatePoolComponent />;
  } else {
    return <PoolDetailsComponent />;
  }
};

export default PoolDetailsPage;

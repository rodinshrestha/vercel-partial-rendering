import React from "react";

import Error404Page from "@/core/components/ErrorPage";

export async function generateMetadata() {
  return {
    title: "Dogman 404 Page",
    description: "Page Not Found",
    keywords: "Dogman",
  };
}

const Page = async () => {
  return <Error404Page />;
};

export default Page;

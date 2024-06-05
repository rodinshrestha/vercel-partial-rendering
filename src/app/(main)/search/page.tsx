import React, { Suspense } from "react";

import { PageProps } from "@/core/types/page-props.types";
import SearchSuspenseLoader from "@/search/components/SearchSuspenseLoader";

import SearchServerComponent from ".";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    title: "Search page",
    description: "jackson Search Page",
  };
}

const Search = async ({ searchParams }: PageProps) => {
  const key = `search=${searchParams.q}&page=${searchParams?.page || 1}`;

  return (
    <Suspense
      key={key}
      fallback={<SearchSuspenseLoader searchParams={searchParams} />}
    >
      <SearchServerComponent searchParams={searchParams} />;
    </Suspense>
  );
};

export default Search;

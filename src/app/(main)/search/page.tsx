import React, { Suspense } from "react";

import { PageProps } from "@/core/types/page-props.types";
import SearchSuspenseLoader from "@/search/components/SearchSuspenseLoader";
import SearchHeader from "@/search/components/SearchHeader";

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
  return (
    <>
      <SearchHeader searchParams={searchParams} />
      <Suspense
        key={JSON.stringify({ ...searchParams })}
        fallback={<SearchSuspenseLoader />}
      >
        <SearchServerComponent searchParams={searchParams} />;
      </Suspense>
    </>
  );
};

export default Search;

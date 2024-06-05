import React, { Suspense } from "react";

import { PageProps } from "@/core/types/page-props.types";
import SearchSuspenseLoader from "@/search/components/SearchSuspenseLoader";
import SearchHeader from "@/search/components/SearchHeader";
import SearchProductPage from "@/search/ssrcomponents/SearchedProductPage";

export async function generateMetadata() {
  return {
    title: "Search page",
    description: "jackson Search Page",
  };
}

const Search = async ({ searchParams }: PageProps) => {
  return (
    <>
      <Suspense fallback={<p>Search title loading</p>}>
        <SearchHeader searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<SearchSuspenseLoader />}>
        <SearchProductPage searchParams={searchParams} />;
      </Suspense>
    </>
  );
};

export default Search;

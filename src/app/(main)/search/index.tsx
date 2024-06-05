import React from "react";

import { PageProps } from "@/core/types/page-props.types";
import { makeStaticHeaders } from "@/core/utils/static-header";
import SearchPage from "@/search/components/SearchPage";
import {
  getCatalogSearch,
  getCatalogSearchFilter,
} from "@/search/services/search-service";

const SearchServerComponent = async ({
  searchParams,
}: Pick<PageProps, "searchParams">) => {
  const { q } = searchParams;
  const headers = makeStaticHeaders();

  const [data, searchFilters] = await Promise.all([
    getCatalogSearch(q, headers, searchParams),
    getCatalogSearchFilter(q, headers),
  ]);

  return (
    <SearchPage
      searchParams={searchParams}
      filterdData={data?.data || null}
      filterAttributes={searchFilters?.data || null}
    />
  );
};

export default SearchServerComponent;

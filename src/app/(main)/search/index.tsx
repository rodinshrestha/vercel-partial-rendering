import React from "react";

import { PageProps } from "@/core/types/page-props.types";
import SearchPage from "@/search/components/SearchPage";
import {
  getCatalogSearch,
  getCatalogSearchFilter,
} from "@/search/services/search-service";
import { makeHeaders } from "@/core/utils/header";
import { fetchProfile } from "@/auth/services/auth-service";

const SearchServerComponent = async ({
  searchParams,
}: Pick<PageProps, "searchParams">) => {
  const { q } = searchParams;
  const headers = makeHeaders();

  const [data, searchFilters, user] = await Promise.all([
    getCatalogSearch(q, headers, searchParams),
    getCatalogSearchFilter(q, headers),
    fetchProfile(),
  ]);

  return (
    <SearchPage
      searchParams={searchParams}
      filterdData={data?.data || null}
      filterAttributes={searchFilters?.data || null}
      user={user?.data || null}
    />
  );
};

export default SearchServerComponent;

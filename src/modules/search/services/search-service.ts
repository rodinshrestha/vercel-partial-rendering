import { FilterAttributeType } from "@/category/types/category.types";
import { executeFetch } from "@/lib/execute-fetch";
// import { publicAxios } from "@/core/utils/axios";
// import { HeaderType } from "@/core/types/api-headers.types";
import { PageProps } from "@/core/types/page-props.types";

import { SearchType } from "../types/search.types";

export const getCatalogSearch = async (
  q: string,
  headers: HeadersInit,
  searchParams: PageProps["searchParams"]
) => {
  const { page = 1 } = searchParams;

  const response = await executeFetch(
    `/sf/catalog/search?product_page=${page}&q=${q}`,
    {
      headers,
      cache: "no-store",
      next: {
        tags: ["search", `search+${q}`, "all"],
      },
    }
  );

  return (await response.json()) as { data: SearchType };
};

export const getCatalogSearchFilter = async (
  q: string,
  headers: HeadersInit
) => {
  const response = await executeFetch(
    `/sf/catalog/search/navigation/layered?q=${q}`,
    {
      headers,
      cache: "no-cache",
      next: {
        tags: ["search-filter", "all"],
      },
    }
  );
  if (!response.ok) {
    return { data: [] as FilterAttributeType[] };
  }

  return (await response.json()) as { data: FilterAttributeType[] };
};

// export const fetchfilteredCatalogSearchFilter = (
//   headers: HeaderType,
//   filteredQueryParams: string,
//   searchParams: PageProps["searchParams"]
// ) => {
//   const { page = 1 } = searchParams;
//   const searchQuery = filteredQueryParams ? `&${filteredQueryParams}` : "";

//   const url = `/sf/catalog/search?product_page=${page}${searchQuery}`;

//   return publicAxios.get(url, { headers });
// };

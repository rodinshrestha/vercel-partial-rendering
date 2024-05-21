import { notFound } from "next/navigation";

import { executeFetch } from "@/lib/execute-fetch";
import {
  CategoryDataTypes,
  CategoryProductTypes,
  FilterAttributeType,
} from "@/category/types/category.types";
import { publicAxios } from "@/core/utils/axios";
import { HeaderType } from "@/core/types/api-headers.types";
import { PageProps } from "@/core/types/page-props.types";
import { isObjectEmpty } from "@/core/utils/object";
import { filterQueryResponse } from "@/core/utils/url";

import {
  categoryListRevalidate,
  categoryRevalidate,
} from "../constants/revalidate";
import { CATEGORY_PAGINATION_LIMIT } from "../constants/category-pagation-limit";

export const getCategory = async (slug: string, headers: HeadersInit) => {
  const _slug = Array.isArray(slug) ? slug.join("/") : slug;
  const actualSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const response = await executeFetch(`/sf/categories/${_slug}`, {
    headers,
    next: {
      tags: ["category", `category-${actualSlug}`, "all"],
      revalidate: categoryRevalidate,
    },
  });
  if (!response.ok) {
    notFound();
  }
  return (await response.json()) as { data: CategoryDataTypes };
};

export const getCategoryFilters = async (
  slug: string,
  headers: HeadersInit
) => {
  const _slug = Array.isArray(slug) ? slug.join("/") : slug;
  const actualSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const response = await executeFetch(
    `/sf/categories/${_slug}/navigation/layered`,
    {
      headers,
      // cache: 'no-cache',
      next: {
        tags: ["category", `category-${actualSlug}`, "all"],
        revalidate: categoryListRevalidate,
      },
    }
  );
  if (!response.ok) {
    return { data: [] as FilterAttributeType[] };
  }

  return (await response.json()) as { data: FilterAttributeType[] };
};

export const getCategoryProducts = async (
  slug: string,
  headers: HeadersInit,
  searchParams: PageProps["searchParams"]
) => {
  const { page = 1 } = searchParams;
  const _slug = Array.isArray(slug) ? slug.join("/") : slug;

  let url: `/${string}` = `/sf/categories/${_slug}/products?page=${page}&limit=${CATEGORY_PAGINATION_LIMIT}`;

  if (!isObjectEmpty(searchParams)) {
    const searchQuery = filterQueryResponse(searchParams)
      ? `&${filterQueryResponse(searchParams)}`
      : "";

    url = `/sf/categories/${_slug}/products?page=${page}&limit=${CATEGORY_PAGINATION_LIMIT}${searchQuery}`;
  }

  const response = await executeFetch(url, {
    headers,
    cache: "no-cache",
    next: {
      tags: ["category", "all"],
      // revalidate: categoryRevalidate,
    },
  });
  if (!response.ok) {
    return { data: null as null };
  }
  return (await response.json()) as {
    data: { products: CategoryProductTypes | null };
  };
};

export const loadMoreCategories = (
  headers: HeaderType,
  slug: string | undefined,
  params: string,
  currentPage: number
) => {
  // TODO refactor use url params
  // const urlParams = new URLSearchParams({
  //   ...(params ? { params } : {}),
  //   page: `${currentPage + 1}`,
  // });
  const url = `/sf/categories/${slug}/products${params ? `?${params}&` : "?"}page=${currentPage + 1}`;

  return publicAxios.get(url, { headers });
};

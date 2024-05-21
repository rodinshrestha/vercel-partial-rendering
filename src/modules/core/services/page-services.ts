import "server-only";

import { cache } from "react";

import { notFound } from "next/navigation";

import { executeFetch } from "@/lib/execute-fetch";

import { PageResponse } from "../types/page-props.types";
import { pageRevalidate } from "../constants/revalidation";

/** Fetches page data */
export const fetchPage = cache(async (slug: string, headers: HeadersInit) => {
  const response = await executeFetch(`/sf/pages/${slug}`, {
    headers,
    // cache: 'force-cache',
    next: {
      revalidate: pageRevalidate,
      tags: ["page", `page-${slug}`, "all"],
    },
  });

  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as { data: PageResponse };
});

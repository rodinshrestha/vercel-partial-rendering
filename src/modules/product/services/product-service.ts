import { notFound } from "next/navigation";

import { executeFetch } from "@/lib/execute-fetch";

import { productRevalidate } from "../constants/revalidate";
import { PriceHistoryDataType, ProductTypes } from "../types/product.types";

type GetProductType = {
  slug: string;
  headers: HeadersInit;
  cache?: boolean;
};

export const getProduct = async (args: GetProductType) => {
  const { slug, headers, cache = true } = args || {};

  const _slug = Array.isArray(slug) ? slug.join("/") : slug;

  const cacheObject: any = cache
    ? {
        tags: ["product", `product-${slug}`, "all"],
        revalidate: productRevalidate,
      }
    : { cache: "no-store" };

  const response = await executeFetch(`/sf/products/${_slug}`, {
    headers,
    ...cacheObject,
  });
  if (!response.ok) {
    return notFound();
  }
  return (await response.json()) as { data: ProductTypes };
};

export const getProductPriceHistory = async (
  slug: string,
  headers: HeadersInit
) => {
  const _slug = Array.isArray(slug) ? slug.join("/") : slug;

  const cacheObject = {
    tags: ["product", `price-history-${_slug}`, "all"],
    revalidate: productRevalidate,
  };

  const response = await executeFetch(`/sf/product/${_slug}/price/history`, {
    headers,
    ...cacheObject,
  });
  return (await response.json()) as { data: PriceHistoryDataType };
};

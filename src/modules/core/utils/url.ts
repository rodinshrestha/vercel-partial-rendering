import type { ReadonlyURLSearchParams } from "next/navigation";

import type { PageProps } from "@/core/types/page-props.types";
import { SORT_BY } from "@/core/constants/filter";

import { CALLBACK_URL } from "../constants/url.constant";

import {
  getSessionStorageItem,
  setSessionStorageItem,
} from "./session-storage";

/**
 * Filter url query
 * @param params
 * @returns
 */
export const filterQueryResponse = (params: PageProps["searchParams"]) => {
  const responseParams = Object.entries(params).reduce((acc, iterator) => {
    const [key, value] = iterator;
    if (!value || key === "page") {
      return acc;
    }
    if (key === SORT_BY || key === "q") return (acc += `${key}=${value}&`);

    return (acc += mappedValue(key, value));
  }, "");
  //remove & from the last string
  return responseParams.slice(0, -1);
};

/**
 *
 * @param key Filtered key
 * @param value value of id
 * @returns key[index]=value
 */
const mappedValue = (key: string, value: string | number | string[]) => {
  if (typeof value !== "string" || key === "country") return "";

  const splitValue = value.split(",");

  return splitValue.reduce((acc, iterator, i) => {
    return (acc += `${key}[${i}]=${iterator}&`);
  }, "");
};

/** TODO: Refactor this (similar to filterQueryResponse() fn above) */
export const blogFilterQueryResponse = (params: PageProps["searchParams"]) => {
  const responseParams = Object.entries(params).reduce((acc, iterator) => {
    const [key, value] = iterator;
    if (key === SORT_BY) return (acc += `sort_by=title&sort_order=${value}&`);
    if (key === "categories")
      return (acc += `filter[0][filter_by]=categories.title&filter[0][value]=${value}&`);
    if (key === "is_featured") return (acc += `_eq_is_featured=${value}&`);

    if (!value) {
      return acc;
    }
    return (acc += mappedValue(key, value));
  }, "");
  //remove & from the last string
  return responseParams.slice(0, -1);
};

/** TODO add a proper description & example on how to use it*/
export const filterAsPathParams = (query: {
  [x: string]: string | string[] | number | undefined;
}) => {
  const cloneQuery = { ...query };
  delete cloneQuery.channel;
  delete cloneQuery.store;
  if (cloneQuery.id) {
    delete cloneQuery.id;
  }

  return Object.entries(cloneQuery).reduce((acc, iterator, i) => {
    const [key, value] = iterator;
    if (i === 0) return (acc += `?${key}=${value}`);

    return (acc += `&${key}=${value}`);
  }, "");
};

/**
 * Return query string object
 * Similar to next page router useQuery() except only handles queryParams
 * @param params ReadonlyURLSearchParams
 * @returns {}
 */
export const getQuery = (params: ReadonlyURLSearchParams) => {
  const iterator = params.keys();
  let linkedList = iterator.next();
  const query: Record<string, string> = {};
  while (!linkedList.done) {
    query[linkedList.value] = params.get(linkedList.value) || "";
    linkedList = iterator.next();
  }
  return query;
};

export const filterQuery = (query: {
  [x: string]: string | string[] | number | undefined;
}) => {
  const cloneQuery = { ...query };
  delete cloneQuery.page;
  delete cloneQuery["per-page"];
  return Object.entries(cloneQuery).reduce((acc, iterator) => {
    const [key, value] = iterator;
    if (!value) {
      return acc;
    }
    if (key === "q") return (acc += `&search=${value}`);
    return (acc += `&${key}=${value}`);
  }, "");
};

/**
 * Get the call back URL,
 * Redirect the user from where user clicks login btn
 */
export const getCallBackURL = () => {
  const callbackURL = getSessionStorageItem(CALLBACK_URL);

  if (callbackURL) {
    return `/${callbackURL}`;
  }

  return `/`;
};

/**
 * Set the current URL from where user
 */
export const setCallBackURL = () => {
  const { pathname } = window.location;

  //Skip channel and store
  const currentURL = pathname.split("/").filter((x) => x !== "");

  setSessionStorageItem(CALLBACK_URL, currentURL.join("/"));
};

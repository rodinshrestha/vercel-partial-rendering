"use client";
import React from "react";

import AbstractFilter from "@/lib/AbstractFilter";

import {
  IDLE,
  LOADING,
  PENDING,
  REJECTED,
  RESOLVED,
} from "../constants/states";
import toastAlert from "../utils/toast";
import { publicAxios } from "../utils/axios";
import { PageProps } from "../types/page-props.types";

import useHeaders from "./useHeaders";

type TablePropsType<T> = {
  url: string | null;
  filter: AbstractFilter | null;
  storeSetter: (list: T) => void;
  shouldFetch?: boolean;
  searchParams?: PageProps["searchParams"];
  fetchData?: T;
};
const DEFAULT_PAGINATION = [1, 5];

const useTableListing = <T extends object>({
  url,
  filter,
  storeSetter,
  searchParams = {},
  fetchData,
}: TablePropsType<T>) => {
  const [data, setData] = React.useState<T | null>(null);
  const [status, setStatus] = React.useState(IDLE);
  const { clientHeaders } = useHeaders();
  React.useEffect(() => {
    if (!url) {
      setStatus(REJECTED);
      return;
    }

    if (fetchData && !Object.entries(searchParams).length) {
      storeSetter(fetchData);
      setStatus(RESOLVED);
      return;
    }

    setStatus(PENDING);
    const queryFilter = { ...searchParams };
    delete queryFilter["page"];
    delete queryFilter["per-page"];

    const [defaultPerPage, defaultPageLimit] = DEFAULT_PAGINATION;

    const page = searchParams?.page || defaultPerPage;
    const limit = searchParams?.["per-page"] || defaultPageLimit;

    /**
     * Resolve filter DB query
     */
    const mappedFilters = filter ? filter.mappedQueryFilters(queryFilter) : {};

    publicAxios
      .get(url as string, {
        headers: clientHeaders,
        params: {
          page: page,
          per_page: limit,
          ...mappedFilters,
        },
      })
      .then((res) => {
        storeSetter(res.data as T);
        setData(res as T);
        setStatus(RESOLVED);
      })
      .catch((err) => {
        toastAlert(err, "error");
        setStatus(REJECTED);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, filter, storeSetter, url]);
  return {
    data,
    error: status === REJECTED,
    isLoading: status === LOADING || status === PENDING,
  };
};

export const useRunTableListing = <T,>({
  url,
  filter,
  storeSetter,
  searchParams,
}: TablePropsType<T>) => {
  const { clientHeaders } = useHeaders();

  const run = React.useCallback(() => {
    const queryFilters = { ...(searchParams || {}) };
    delete queryFilters["page"];
    delete queryFilters["per-page"];
    const [defaultPerPage, defaultPageLimit] = DEFAULT_PAGINATION;

    const page = searchParams?.page || defaultPerPage;
    const limit = searchParams?.["per-page"] || defaultPageLimit;

    /**
     * Resolve filter DB query
     */
    const mappedfilters = filter ? filter.mappedQueryFilters(queryFilters) : {};

    publicAxios
      .get(url as string, {
        headers: clientHeaders,
        params: {
          page,
          per_page: limit,
          ...mappedfilters,
        },
      })
      .then((res) => storeSetter(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, filter, url, storeSetter]);

  return { run };
};

export default useTableListing;

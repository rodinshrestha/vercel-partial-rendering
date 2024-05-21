import React from "react";

import { usePathname, useRouter } from "next/navigation";

import { isObjectEmpty } from "../utils/object";
import { filterAsPathParams } from "../utils/url";

type FilterArgsType = {
  name?: string | number | undefined;
  value?: string | number | undefined;
  push?: boolean;
  filterQueryParams?: Record<string, string>;
};

type FunctionReturnTypes<T> = [
  T,
  ({ name, value, push }: FilterArgsType) => void,
  () => void,
];

type QueryType = {
  [x: string]: string | string[] | number | undefined;
};

const useFilter = <T,>(
  initialState: T,
  searchParams: any
): FunctionReturnTypes<T> => {
  const [filter, setFilter] = React.useState<T>(initialState);

  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | number>(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const resetFilter = () => {
    if (isObjectEmpty(searchParams)) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    router.push(pathname);
    setFilter(initialState);
  };

  React.useEffect(() => {
    if (searchParams) {
      setFilter(searchParams);
    }
  }, [searchParams]);

  const handleFilter = ({
    filterQueryParams,
    name,
    value,
    push = true,
  }: FilterArgsType) => {
    if (push) {
      clearTimeout(timeoutRef.current);
      const cloneQueryFilter = { ...searchParams, [name as string]: value };

      delete cloneQueryFilter.page;
      delete cloneQueryFilter["per-page"];

      timeoutRef.current = setTimeout(() => {
        const query = { ...cloneQueryFilter };
        const finalQuery = filterAsPathParams(query);
        const path = query ? `${pathname}${finalQuery}` : pathname;
        router.push(path);
      }, 500);

      setFilter((prev) => ({
        ...prev,
        [name as string]: value,
      }));
    } else {
      // Filter out empty fields from filterQueryParams
      const nonEmptyFilterQueryParams = Object.fromEntries(
        Object.entries(filterQueryParams || {}).filter(
          ([_, value]) => value !== ""
        )
      );

      const query = { ...nonEmptyFilterQueryParams } as QueryType;
      const finalQuery = filterAsPathParams(query);
      const path = query ? `${pathname}${finalQuery}` : pathname;
      router.push(path);
      setFilter((prev) => ({
        ...prev,
        ...nonEmptyFilterQueryParams,
      }));
    }
  };

  return [filter, handleFilter, resetFilter];
};

export default useFilter;

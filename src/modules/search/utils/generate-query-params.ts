import { PageProps } from "@/core/types/page-props.types";

import {
  SelectedFilterDataType,
  SelectedFilterType,
} from "../types/SelectedFilterTypes.types";

/** NOTE: This is also similar to b2b generate query params */

/** TODO: Discuss & add example */
export const generateQueryParams = (selectedFilterAttr: SelectedFilterType) => {
  return Object.entries(selectedFilterAttr).reduce((acc, iterator, i) => {
    const [key, value] = iterator;

    if (i === Object.keys(selectedFilterAttr).length - 1) {
      return (acc += `${key}=${convertValueIntoString(value)}`);
    } else {
      return (acc += `${key}=${convertValueIntoString(value)}&`);
    }
  }, "");
};

/** TODO: Discuss & add example */
export const queryConversion = (
  searchParams: PageProps["searchParams"],
  selectedFilterAttr: SelectedFilterType
) => {
  if ("q" in searchParams) {
    const queryParams = generateQueryParams(selectedFilterAttr);
    return `?q=${searchParams.q}${queryParams ? `&${queryParams}` : ""}`;
  }
  return `?${generateQueryParams(selectedFilterAttr)}`;
};

/** TODO: Discuss & add example */
const convertValueIntoString = (value: Array<SelectedFilterDataType>) => {
  return value.reduce((acc, iterator, i) => {
    if (i === value.length - 1) {
      return (acc += `${iterator.selectedValue || iterator.value}`);
    }
    return (acc += `${iterator.selectedValue || iterator.value},`);
  }, "");
};

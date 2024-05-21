import {
  FilterAttributeOptionType,
  SelectedFilterAttributeType,
} from "@/category/types/category.types";
import { PageProps } from "@/core/types/page-props.types";
import { SORT_BY } from "@/core/constants/filter";

export const generateFilterQueryParams = (
  selectedFilterAttr: SelectedFilterAttributeType
) => {
  return Object.entries(selectedFilterAttr).reduce((acc, iterator, i) => {
    const [key, value] = iterator;

    if (!value.length) {
      return acc;
    }

    if (key === "page") {
      return acc;
    }

    if (i === Object.keys(selectedFilterAttr).length - 1) {
      return (acc += `${key}=${convertValueIntoString(value)}`);
    } else {
      return (acc += `${key}=${convertValueIntoString(value)}&`);
    }
  }, "");
};

export const categoryqueryConversion = (
  selectedFilterAttr: SelectedFilterAttributeType,
  searchParams?: PageProps["searchParams"]
) => {
  if (searchParams && "q" in searchParams) {
    const queryParams = generateFilterQueryParams(selectedFilterAttr);
    return `?q=${searchParams.q}${queryParams ? `&${queryParams}` : ""}`;
  }
  return `?${generateFilterQueryParams(selectedFilterAttr)}`;
};

const convertValueIntoString = (value: Array<FilterAttributeOptionType>) => {
  return value.reduce((acc, iterator, i) => {
    if (i === value.length - 1) {
      return (acc += `${iterator.value}`);
    }
    return (acc += `${iterator.value},`);
  }, "");
};

export const updateSelectedFilter = (
  item: FilterAttributeOptionType,
  selectedFilterAttribute: SelectedFilterAttributeType | null,
  slug: string
) => {
  // Initialize first selected attributes
  if (!selectedFilterAttribute) {
    return { [slug]: [item] };
  }

  // Check if the key already exist in filter attributes
  if (!(slug in selectedFilterAttribute)) {
    return {
      ...selectedFilterAttribute,
      [slug]: [item],
    };
  }

  // get current selected value from selected value
  const currentKeyValue = selectedFilterAttribute[slug];

  let updatedValue: Array<FilterAttributeOptionType> = [];

  // checks if exist
  const isValueExist = currentKeyValue.some((x) => x.value === item.value);
  if (isValueExist) {
    // Remove the selected value
    updatedValue = selectedFilterAttribute[slug].filter(
      (x) => x.value !== item.value
    );
  } else {
    // Prepare the item
    const newItem = {
      ...item,
      sort: item.sort || 100,
      value: item.value,
    };

    // Append new value in key
    if (slug === SORT_BY) {
      updatedValue = [newItem];
    } else {
      updatedValue = [...currentKeyValue, newItem];
    }
  }

  return { ...selectedFilterAttribute, [slug]: updatedValue };
};

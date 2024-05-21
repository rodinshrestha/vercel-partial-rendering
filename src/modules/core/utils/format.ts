import { NavigationItem } from "@/core/types/navigation-type";

import { MetaType, SeoType } from "../types/page-props.types";

// TODO: we might not need this for selects
// Also update the name if required to format option / label or something else
/** TODO: similar to get option */
/** Format navigation options */
export const generateStoreOpts = (obj: { [key: string]: string }) => {
  return Object.entries(obj).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};

/** TODO: REFACTOR THIS */
/**
 * Probably need to remove this for select field
 * This is also similar to above util generateStoreOPs
 */
export type optionsProps = Array<{ name: string; id: string }>;
export const getOption = (data: optionsProps) => {
  const options = data.map((el) => ({
    label: el.name,
    value: el.id,
  }));
  return options;
};

/** Format with dynamic key  */
export const formatWithDynamicKey = (
  data: Array<{ [key: string]: string | boolean }>,
  option: { label: string; value: string }
): Array<{ label: string; value: string }> => {
  return data.map((el) => ({
    label: el[option.label] as string,
    value: el[option.value] as string,
  }));
};

/** Format navigation links */
export const navigationLinkGenerator = (data: NavigationItem) => {
  const { type, custom_link, link } = data;
  switch (type) {
    case "category":
      return `/category${link}`;
    case "custom":
      return custom_link || "#";
    case "page":
      return `/page${link}`;
    default:
      return "#";
  }
};

/** Format SEO meta data */
const defaultSEO = {
  title: "Jacson",
  keywords: "Jacson",
  description: "Jacson Page",
};
export const getMetaData = (
  data: SeoType,
  defaultData: MetaType = defaultSEO
) => {
  const {
    meta_title,
    meta_keywords,
    meta_description,
    seo_title,
    seo_description,
  } = (data && data.search_engine_optimization) ?? {};
  const { name = "" } = data;
  const { title, description, keywords } = defaultData;
  return {
    title: meta_title || seo_title || name || title,
    description: meta_description || seo_description || description,
    keywords: meta_keywords || keywords,
  };
};

// Backend logic
export const getCurrencyPositionWhenPriceLessThanZero = (
  currencyPosition: number,
  currencySymbol: string | null,
  price: string,
  minusPosition: number,
  minusSign: string | null
) => {
  if (!currencySymbol) {
    throw new Error("Currency symbol not found");
  }

  let formattedPrice = "";
  switch (true) {
    case currencyPosition == 1 && [1, 4].includes(minusPosition):
      formattedPrice = `${currencySymbol}${minusSign}${price}`;
      break;

    case currencyPosition == 1 && minusPosition == 2:
      formattedPrice = `${minusSign}${currencySymbol}${price}`;
      break;

    case currencyPosition == 1 && minusPosition == 3:
      formattedPrice = `${currencySymbol}${price}${minusSign}`;
      break;

    case currencyPosition == 2 && [1, 4].includes(minusPosition):
      formattedPrice = `${currencySymbol}${minusSign} ${price}`;
      break;

    case currencyPosition == 2 && minusPosition == 2:
      formattedPrice = `${minusSign}${currencySymbol} ${price}`;
      break;

    case currencyPosition == 2 && minusPosition == 3:
      formattedPrice = `${currencySymbol} ${price}${minusSign}`;
      break;

    case currencyPosition == 3 && minusPosition == 1:
      formattedPrice = `${minusSign}${price}${currencySymbol}`;
      break;

    case currencyPosition == 3 && [2, 3].includes(minusPosition):
      formattedPrice = `${price}${minusSign}${currencySymbol}`;
      break;

    case currencyPosition == 3 && minusPosition == 4:
      formattedPrice = `${price}${currencySymbol}${minusSign}`;
      break;

    case currencyPosition == 4 && minusPosition == 1:
      formattedPrice = `${minusSign}${price} ${currencySymbol}`;
      break;
    case currencyPosition == 4 && [2, 3].includes(minusPosition):
      formattedPrice = `${price}${minusSign} ${currencySymbol}`;
      break;

    case currencyPosition == 4 && minusPosition == 4:
      formattedPrice = `${price} ${currencySymbol}${minusSign}`;
      break;
  }

  return formattedPrice;
};

export const getCurrencyPositionWhenPriceGreaterThanZero = (
  currencyPosition: number,
  currencySymbol: string | null,
  price: string
) => {
  if (!currencySymbol) {
    // throw new Error('Currency symbol not found');
  }
  let formattedPrice = "";
  switch (currencyPosition) {
    case 1:
      formattedPrice = `${currencySymbol}${price}`;
      break;

    case 2:
      formattedPrice = `${currencySymbol} ${price}`;
      break;

    case 3:
      formattedPrice = `${price}${currencySymbol}`;
      break;

    default:
      formattedPrice = `${price} ${currencySymbol} `;
      break;
  }

  return formattedPrice;
};

export const numberFormat = (
  price: number,
  decimals = 0,
  decimalSeparatorValue: string | null,
  separator: string | null
) => {
  // Ensure number is a valid numeric value
  if (isNaN(price) || price === null) {
    return "";
  }
  const [_price, decimal] = String(price).split(".");
  // Convert number to a string with the specified decimal places
  const formattedNumber = decimal ? price.toFixed(decimals) : _price;

  // Split the string into integer and decimal parts
  const parts = formattedNumber.split(".");

  // Format the integer part with grouped thousands
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator || ",");

  // Join the integer and decimal parts with the specified decimal point
  return parts.join(decimalSeparatorValue || ".");
};

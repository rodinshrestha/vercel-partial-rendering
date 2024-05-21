import { PageProps } from "@/core/types/page-props.types";

export const initializeCategoryFilter = (
  searchParams: PageProps["searchParams"]
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { q, ...rest } = searchParams || {};

  return Object.entries(rest || {}).reduce((acc, iterator) => {
    const [key, value] = iterator;

    const valueInArray = value ? (value as string).split(",") : [];

    if (!valueInArray.length) {
      return acc;
    }

    return {
      ...acc,
      [key]: valueInArray.map((x) => ({ value: x })),
    };
  }, {});
};

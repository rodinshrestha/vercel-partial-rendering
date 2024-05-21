/**
 * Attributes for builder can have null values
 * so this funciton removes the null values from the object
 * for attributes
 *
 * @param obj
 * @returns
 */
export const removeNullFromObject = <T extends object>(
  obj: T
): { [key: string]: string | number } => {
  return Object.entries(obj).reduce((acc, iterator) => {
    const [key, value] = iterator;

    if (value !== null && value !== '') {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {});
};

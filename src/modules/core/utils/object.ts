/**
 * Checks the keys in objects
 * Return boolean
 */
export const isObjectEmpty = <
  T extends { [key: string]: string | number | unknown },
>(
  obj: T
): boolean => {
  return !Object.keys(obj).length;
};

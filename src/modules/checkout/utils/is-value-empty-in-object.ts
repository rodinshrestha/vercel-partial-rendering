// Returns boolean if any key in boject is empty or null
export const isValueEmptyInObject = (obj: any) =>
  Object.entries(obj).reduce((acc, iterator) => {
    const [_, value] = iterator;

    if (acc) {
      return acc;
    }

    if (!value) {
      return true;
    }
    return acc;
  }, false);

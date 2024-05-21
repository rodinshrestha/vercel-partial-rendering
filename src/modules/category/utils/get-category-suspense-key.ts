export const getCategorySuspenseKey = (
  searchParams: Record<string, string> = {}
) => {
  return Object.entries(searchParams || {}).reduce((acc, iterator, i) => {
    const [key, value] = iterator;

    if (i === 0) {
      return (acc += `${key}=${value}`);
    }

    return (acc += `&${key}=${value}`);
  }, '');
};

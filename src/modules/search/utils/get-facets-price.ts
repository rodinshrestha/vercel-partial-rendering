export const getFacetsPrice = (str: string) => {
  if (!str) return '';
  const [min, max] = str.split(',');

  return `$${min} - $${max}`;
};

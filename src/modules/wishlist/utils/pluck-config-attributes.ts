import { isObjectEmpty } from '@/core/utils/object';

//Todo : Refactor the function to make it easy to understand
export const pluckConfigAttributes = (configAttr: {
  [key: string]: string;
}) => {
  if (isObjectEmpty(configAttr)) return '';

  if (Object.keys(configAttr).length === 1)
    return `Choose ${Object.keys(configAttr)[0]}`;

  return Object.entries(configAttr).reduce((acc, iterator, i) => {
    const [key] = iterator;
    if (i === Object.entries(configAttr).length - 1) {
      return `${acc.slice(0, -1)} & ${key}`;
    }

    return (acc += ` ${key},`);
  }, 'Choose');
};

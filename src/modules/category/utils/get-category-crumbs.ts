import { BreadCrumbType } from '../types/category.types';

export const getCategoryCrumbs = (breadcrumb: BreadCrumbType) =>
  breadcrumb.reduce(
    (acc, iterator, i) => {
      if (i === breadcrumb.length - 1)
        return [...acc, { title: iterator.name, link: '#' }];
      return [
        ...acc,
        {
          title: iterator.name,
          link: `/category/${iterator.url_key}`,
        },
      ];
    },
    [{ title: 'home', link: '/' }]
  );

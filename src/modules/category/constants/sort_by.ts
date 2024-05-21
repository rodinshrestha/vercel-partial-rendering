import { Keyword, ReadOnlyTranslation } from '@/core/types/translation.types';

export const SORT_BY = 'sort_by';

export const sortByData = (
  _t: <T extends Keyword>(
    keyWord: T,
    defaultTranslation: ReadOnlyTranslation[T]
  ) => string
) => [
  {
    name: _t('sort_by', 'Sort by'),
    slug: SORT_BY,
    options: [
      {
        label: _t('name', 'Name'),
        value: 'name',
        key: SORT_BY,
        sort: 0,
        translation_text: 'name',
      },
      {
        label: _t('price', 'Price'),
        value: 'price',
        key: SORT_BY,
        sort: 1,
        translation_text: 'price',
      },
    ],
  },
];

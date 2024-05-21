import { FacetsDataType } from './search-facets.types';

export type SelectedFilterType = {
  [key: string]: Array<SelectedFilterDataType>;
};

export type SelectedFilterDataType = Partial<FacetsDataType> & {
  selectedValue: string;
  value?: string;
  /** Max price selected */
  max_value: number;

  /** Min price selected */
  min_value: number;

  /** Selected price value */
  priceValue: string;

  /** Facet sort */
  sort: number;

  /** Key is equavalent to id */
  key: string;
};

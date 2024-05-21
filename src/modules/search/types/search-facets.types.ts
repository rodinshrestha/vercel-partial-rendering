import { FacetSizeTypes } from './search-facets-size.types';

export type FacetsDataType = {
  /** Facets id, unique id */
  id: string;

  /** Facets labels, Filter label */
  label: string;

  /** Facets selected count */
  selectedCount: number;

  /** Facets type, filter type by */
  type: string;

  /** Facets values list */
  values: Array<FacetsValuesType>;

  /** Facets value for size */
  sizeTypes: Array<FacetSizeTypes>;

  /** Range slider min value */
  min: number;

  /** Range slider max value */
  max: number;
};

export type FacetsValuesType = {
  /** Facets value count */
  count: number;

  /** Facets value id */
  id: string;

  /** Facets value label */
  label: string;

  /** Facets value selected */
  selected: boolean;

  /** Facets color value, Color hex code */
  color: string;
};

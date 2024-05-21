export type FacetSizeTypes = {
  /** Size label */
  label: string;

  /** Size listing formats */
  formats: Array<FacetSizeFormatTypes>;
};

type FacetSizeFormatTypes = {
  /** Facets size format label */
  format: string;

  /** Factes size value list */
  values: Array<FacetSizeFormatValueTypes>;
};

export type FacetSizeFormatValueTypes = {
  /** size id */
  id: string;

  /** size label */
  label: string;

  /** selected, selected the size boool */
  selected: boolean;

  /** count, total number of counts for the size */
  count: number;
};

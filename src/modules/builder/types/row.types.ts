export type RowAdvanced = {
  /** Custom classes for row */
  row_custom_classes: string | null;

  /** Custom row id */
  row_custom_id: string | null;
};

export type RowBackground = {
  /** No gutter, default to null */
  no_gutter: boolean;

  /** Background color for row */
  row_background_color: string | null;

  /** Row Background iamge */
  row_background_image: string | null;

  /** Row background position */
  row_background_position: string | null;

  /** Row background size */
  row_background_size: string | null;
};

// TODO : Remove if not used created by rakesh assigned to rodin
// check after the builder component is done
// type RowCommonAttributes = {
//   [key: string]: string | null;
// };

// TODO : Remove if not used created by rakesh assigned to rodin
// check after the builder component is done
// type RowCommonAttributesWithGutter = {
//   [key in keyof RowCommonAttributes]: RowCommonAttributes[key];
// } & { gutterSpace: boolean };

// TODO : Remove if not used created by rakesh assigned to rodin
// check after the builder component is done
export type RowBackgrounds = {
  backgroundColor: string | null;
  backgroundImage: string | null;
  backgroundPosition: string | null;
  backgroundSize: string | null;
  id: string | null;
  className: string | null;
};

export type RowAttributes = any;
//todo
//  RowCommonAttributesWithGutter & RowBackgrounds;

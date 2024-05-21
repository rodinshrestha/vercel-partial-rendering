export type LayoutType = 'slider' | 'normal';

export type ProductSubModuleBlock = {
  show_button: 0 | 1;
  /** Product title label */
  button_label: string;

  /** Button link */
  button_link: string;

  /** Button type, variant */
  button_type: any;

  /** Module background type */
  content_module_background_type: string;

  /** Module content  */
  content_module_content: string;

  /** Product module title */
  content_module_title: string;

  /** Module type: normal or slider */
  content_module_layout_type: LayoutType;

  /** Module show separator */
  show_separator: 0 | 1;

  /** Module title tag */
  title_heading_tag: any;

  dynamic_link: 0 | 1;
};

export type ProductModule = {
  /** product details */
  product: any;

  /** product image */
  image: string | null;

  /** Product hover image */
  hover_image: string;
};

export type CategoryImageBlockType = {
  content: string;
  button_title: string;
  button_link: string;
  category_image_repeater: Array<CategoryImageRepeater>;
};

export type CategoryImageRepeater = {
  content_module_title: string;
  image: string;
  link_group: LinkGroup;
};

/*...Link Group Type...*/
export type LinkGroup = {
  page_id: string | null;
  link_type: string | null;
  image_link: 0 | 1;
  category_id: string | null;
  custom_link: string | null;
  product_sku: string | null;
  is_dynamic_link: 0 | 1;
  open_in_new_tab: 0 | 1 | null;
};

export type CategoryImageType = {
  title: string | null;
  src: string | null;
  link: Link;
};

/*...Link Type...*/
export type Link = {
  categoryId: string | null;
  customLink: string | null;
  imageLink: 0 | 1;
  isDynamicLink: 0 | 1;
  linkType: string | null;
  newTab: 1 | 0 | null;
  pageId: string | null;
  productSku: string | null;
};

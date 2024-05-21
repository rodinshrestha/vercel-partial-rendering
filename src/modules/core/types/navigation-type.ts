export type NavigationItem = {
  category_id: string;
  children: Array<NavigationItem>;
  link: string;
  title: string;
  id?: string;
  parent_id?: string | null;
  admin_title?: string | null;
  type?: string;
  all_named_sub_category?: number | null;
  custom_link?: string;
  open_in_new_tab?: 0;
};

export type NavProps = {
  title: string;
  items: Array<NavigationItem>;
  id?: string;
  slug?: string;
};

/** Navigation Menu Types */
export type NavigationType = {
  primary_menu: NavProps;
  secondary_menu: NavProps;
  footer_menu: NavProps;
};

/** Footer Navigation Types */
export type FooterMetaTypes = {
  footer_meta_title: string;
  footer_meta_sub_title: string;
  footer_meta_short_description: string;
  copyright_text: string;
  assurance_logo: string;
  footer_logo: string;
};

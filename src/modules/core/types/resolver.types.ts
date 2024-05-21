export type Resolver = {
  channel: {
    id: string;
    code: string;
    name: string;
  } | null;
  store: {
    id: string;
    code: string;
    name: string;
  } | null;
  country: string | null;
  site_meta: SiteMeta;
  area: 'default' | 'b2b' | null;
  price_format: PriceFormat;
  customer_group: {
    default: PriceGroupFormatType;
    member: PriceGroupFormatType;
  } | null;
  voyado: {
    voyado_market?: string;
    voyado_locale?: string;
  };
  pages: {
    home: string;
    checkout: string;
  } | null;
  social_media: {
    [key: string]: {
      icon: string | null;
      url: string | null;
    };
  };
  shipping_methods: string[];
  payment_methods: string[];
  lipscore_meta: {
    widget_language: string;
    widget_api_key: string;
  };
};

type SiteMeta = {
  logo: {
    primary: string | null;
    favicon: string | null;
    footer: string | null;
  };
  meta: {
    meta_description: string | null;
    meta_keywords: string | null;
  };
  defaults: {
    title: string | null;
    title_prefix: string | null;
    title_suffix: string | null;
  };
};

type PriceFormat = {
  price_format_data: {
    currency_symbol: string;
    symbol_position: string;
    group_separator: string;
    decimal_separator: string;
    minus_sign: string;
    minus_sign_position: string;
  } | null;
  group_separator_value: string;
  decimal_separator_value: string;
};

type PriceGroupFormatType = {
  /** Price group id */
  id: string;

  /** Price with tax id */
  tax_group_id: string;

  /** Price group name */
  name: string;

  /** Price group code */
  code: string;

  /** Erp customer price group */
  erp_customer_price_group: null | string;

  /** Price group created at */
  created_at: string;

  /** Price group updated at */
  updated_at: string;
};

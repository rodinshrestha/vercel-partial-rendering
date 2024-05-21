import { AlignmentType } from '@/builder/components/BannerBuilder/banner-type';

export type ProductTypes = {
  custom_name: string;
  /** Product id */
  id: string;

  ean_code: string;

  country_of_manufacture: string;
  /** Product parent id, which is configurable product */
  parent_id: string | null;

  /** Product Image */
  base_image: Image;
  background_color: null | string;
  icon: null | string;

  /** Product name */
  name: string;

  /** Features */
  features: Array<ProductFeaturesprops>;

  /** Product stock status: Boolean */
  is_in_stock: 0 | 1;

  min_order_qty: number;

  unit_of_measurement: string;

  /** Product image gallery */
  images: Array<Image>;

  /** Product Quantity */
  quantity: string | null | number;

  /** Photo Slurp Title */
  photo_slurp_title: string;

  /**Photo Slurp Widget Key */
  photo_slurp_widget_key: string;

  /** Product stock status */
  stock_status: 'In Stock' | 'Out Stock';

  /** Product SKU name */
  sku: string;

  brand: BrandProps;

  /** Product URL key */
  url_key: string;

  /** Price history */
  price_history?: 0 | 1;

  /** Product color */
  color_value: string | null;

  /** Product description */
  description: string | null;

  /** product size chart id */
  size_chart_id: string;

  /** Product Price format */
  price_format: PriceFormatList;

  /** Member product price */
  member_price_format: PriceFormatList;

  /** Page builder components */
  components: any;

  /** Product types */
  type: ProductVariantsType;

  /** Hover image */
  hoverImage: string | null;

  /** Product technical details */
  product_specification: Array<ProductSpecification>;

  /** Technical details */
  technical_details: Array<{
    label: string;
    slug: string;
    value: string | null;
  }>;

  /** Configurable attributes for the configurable products */
  configurable_attributes?: ConfigurableAttributes;

  /** Product group by */
  group_by_slug: string;

  /** Product group by 0,1 : 1 = page reload */
  is_group_by: 0 | 1;

  /** Product color code */
  color_code: string;

  /** Product short description */
  short_description: string;

  /** Rollover image: Hover image */
  rollover_image: Image;

  /** Product free returns */
  free_returns: null | string;

  /** Product free shipping */
  free_shipping: null | string;

  /** Product shipping information */
  shipping_information: string | null;

  /** Producr checkout information */
  checkout_information: string | null;

  /** Product qty for cart */
  qty: number;

  /** product article number */
  article_number: string;

  /** Product shipping page url */
  shipping_information_page: string;

  /** Variant category code */
  variant_category_code: string;

  /** Seo  */
  search_engine_optimization: ProductSeoType;

  promotion_applied: 0 | 1;

  is_new_product?: boolean | null;

  /** Visibility */
  visibility_code: 'visible' | 'not_visible';
};

type ThumbnailImageType = {
  background_color: string | null;

  background_size: string | null;
  url: string | null;
};

export type ProductSpecification = {
  label: string;
  slug: string;
  value: string;
  type:
    | 'string'
    | 'text'
    | 'select'
    | 'multiselect'
    | 'checkbox'
    | 'texteditor'
    | 'date';
  data:
    | string
    | number
    | productSpecificationDetails
    | Array<productSpecificationDetails>
    | null;
};

type productSpecificationDetails = {
  id: string;
  name: string;
  code: string;
  background_color: string | null;
  icon: string | null;
};

export type ProductSeoType = {
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  seo_title: string;
  seo_description: string;
  position: AlignmentType;
  title_position: AlignmentType;
};

type ProductFeaturesprops = {
  /** Product feature description  */
  description: string | null;

  /** product feature id  */
  id: string | null;

  /** Prodiuct feature image  */
  image: string | null;

  /** Product feature name */
  name: string | null;

  /** Product feature sort */
  sort: number;
};

type ProductVariantsType = 'simple' | 'configurable';

export type PriceFormatType = {
  /** Price amount */
  amount: number;

  /** Price amount formatted with curreny */
  amount_formatted: string;

  /** Price amount included tax */
  amount_incl_tax: string | number;

  /** Price amount included tax and currency formatted */
  amount_incl_tax_formatted: string;

  /** Tax amount */
  tax_amount: number;

  /** Total tax amount */
  total_tax_amount: number;

  /** Tax formatted with currency */
  tax_amount_formatted: string;

  /** product grand total price */
  grand_total_formatted: string;

  /** Product shipping amount  */
  shipping_amount: string;
};

export type ConfigurableAttributes = {
  /** Configurable products individual details */
  product_details: { [key: string]: ProductVariantsDetails };

  /** product variation details */
  variations: { [key: string]: Array<VariationProductDetails> };

  /** Used to map variants key */
  variation_label_mapping: Array<{ slug: string; label: string }>;

  /** TODO: RODIN MUST ADD THIS TYPE - Hard fix bcz of API */
  [key: string]: any;
};

export type VariationProductDetails =
  VariationDetailsInProductDetails<VariationProductDetails> & {
    article_number: string;
    /** Varation product identifier */
    identifier: string | null;

    /** Variant  Product nane */
    name: string;

    /** Varaiant sku */
    sku: string;

    /** Varation product background color */
    background_color: string | null;

    /** Varation product icon */
    icon: string | null;

    /** Varation product label */
    label: string | null;

    /** Varation product thumbnail image  */
    thumbnail_image: ThumbnailImageType | string | null;

    /** Varation product url key */
    url_key: string;

    /** Varation attribute id */
    attribute_option_id: string;

    /** Final product id */
    id: string;

    /** Variations attribute slug */
    attribute_slug: string;

    /** Product quantity */
    quantity: string;

    min_order_qty?: number;

    /** price format */
    price_format: {
      final_price: null | PriceFormatType;
      regular_price: null | PriceFormatType;
    };

    member_price_format: {
      final_price: null | PriceFormatType;
    };

    /** Varation product varations */
    variants?: {
      [key: string]: Array<VariationProductDetails>;
    };

    // variants: any;
  };

export type ProductVariantsDetails =
  VariationDetailsInProductDetails<VariationProductDetails> & {
    /** Child Product SKU */
    sku: string;

    /** Child Product stock status */
    stock_status: string;

    /** Child Product quantity */
    quantity: string;

    /** Child product parent id */
    parent_id: string;

    /** Child product id */
    id: string;
  };

interface VariationDetailsInProductDetails<T> {
  [key: string]: T;
}

export type Image = {
  /** Product rollover background color */
  background_color: null | string;

  /** Product rollover background size */
  background_size: 'contain' | 'cover' | null;

  /** Product rollover URL */
  url: string | null;
};

export type BrandProps = {
  id: string;
  name: string;
  url_key: string;
  status: number;
  image: string | null;
  description: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  seo_title: string;
  seo_description: string;
};

export type PriceFormatList = {
  /** Price with discount discarded */
  discount_discarded_price: null | PriceFormatType;

  /** Recommended Price */
  recommendedPrice: null | PriceFormatType;

  /** Price with discount price */
  discounted_price: null | PriceFormatType;

  /** product final price */
  final_price: null | PriceFormatType;

  /** Product regular price */
  regular_price: null | PriceFormatType;

  /** product special price */
  special_price: null | PriceFormatType;
};

export type ChangeAbleValueType = {
  price: string | null;
  discountPrice: string | null;
  qty: number | null;
  sku: string | null;
  productName: string | null;
  memberPrice: null | string;
};

export type PriceHistoryType = {
  id: string;
  product_id: string;
  price: string;
  price_formatted: string;
  cutomer_group_id: string;
  channel_id: string;
  date: string;
  created_at: string;
  updated_at: string;
};

export type VarientProductDetailsType = {
  b2b_status: boolean;
  label: string;
  min_order_qty: number;
  price_format: PriceFormatList;
  product_id: string;
  status: boolean;
  stock_status: boolean;
  value: string;
  background_color: null | string;
  icon: null | string;
};
export type PriceHistoryDataType = Array<PriceHistoryType>;

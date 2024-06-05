export type OrderDetailsType = {
  created_at: string;
  created_at_local: string;
  created_at_human: string;
  created_at_human_local: string;
  id: string;
  increment_id: number;
  is_migrated_from_erp: number;
  cart_id: string;
  channel_id: string;
  store_id: string;
  channel_code: string;
  store_code: string;
  customer_type: string;
  customer_id: string;
  is_guest: number;
  shipping_method: string;
  shipping_method_label: string;
  payment_method: string;
  payment_method_label: string;
  currency_code: string;
  sub_total: string;
  recommended_sub_total: string;
  sub_total_inc_tax: string;
  recommended_sub_total_inc_tax: string;
  tax_percent: string;
  total_tax_amount: string;
  recommended_total_tax_amount: string;
  discount_percent: string;
  discount_amount: string;
  recommended_discount_amount: string;
  discount_tax_amount: string;
  recommended_discount_tax_amount: string;
  grand_total: string;
  recommended_grand_total: string;
  shipping_amount: string;
  shipping_tax_amount: string;
  weight: string;
  items_count: number;
  total_items_qty: number;
  customer_first_name: string;
  customer_middle_name: any;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  status: string;
  external_document_no: string;
  order_items: Array<OrderItems>;
  shipping_address: {
    id: string;
    order_id: string;
    type: string;
    full_name: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
    gender: string;
    postal_code: string;
    address1: string;
    address2: string;
    country_code: string;
    city_name: string;
    region_name: string;
    phone: string;
  };
};

export type CustomerOrderType = {
  items: Array<CustomerOrderItems>;
  totalCount: 2;
  offset: 1;
  count: 1;
};

export interface CustomerOrderItems {
  id: string;
  transactionNumber: string;
  createdDate: string;
  storeName: string;
  numberOfItems: number;
  netPriceSum: number;
  localNetPriceSum: number;
  localCurrency: string;
  groupCurrency: string;
  storeType: string;
  lineItems: Array<LineItems>;
  externalId: string;
}

export interface LineItems {
  type: string;
  isReturned: boolean;
  quantity: number;
  price: number;
  netPrice: number;
  localPrice: number;
  articleNumber: string;
  articleName: string;
  articleGroup: string | null;
  sku: string;
}
export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: null;
      label: string;
      active: boolean;
    },
  ];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export type Links = {
  first: string;
  last: string;
  prev: null;
  next: string;
};
export type OrderType = {
  data: Array<OrderDetailsType>;
  links: Links;
  meta: Meta;
};

export interface OrderItems {
  order_id: string;
  channel_id: string;
  store_id: string;
  product_id: string;
  sku: string;
  name: string;
  qty: number;
  qty_invoiced: number;
  qty_canceled: number;
  qty_refunded: number;
  cost: string;
  price: string;
  recommended_price: string;
  tax_amount: string;
  recommended_tax_amount: string;
  sub_total: string;
  recommended_sub_total: string;
  sub_total_inc_tax: string;
  recommended_sub_total_inc_tax: string;
  tax_percent: string;
  total_tax_amount: string;
  recommended_total_tax_amount: string;
  weight: string;
  total_weight: string;
  discount_percent: string;
  discount_amount: string;
  recommended_discount_amount: string;
  discount_tax_amount: string;
  recommended_discount_tax_amount: string;
  grand_total: string;
  recommended_grand_total: string;
  product_data: ProductData;
}

export interface ProductData {
  sku: string;
  name: string;
  type: string;
  brand: any;
  url_key: string;
  parent_id: string;
  base_image: BaseImage;
  categories: Category[];
  is_group_by: number;
  group_by_slug: string;
  article_number: string;
  configurable_attributes: ConfigurableAttributes;
  configurable_attribute_ids: ConfigurableAttributeIds;
}

export interface BaseImage {
  url: string;
  background_size: string;
  background_color: string;
}

export interface Category {
  id: string;
  name: string;
  position: number;
  category_group_id: string;
  category_group_position: number;
}

export interface ConfigurableAttributes {
  size: string;
  color: string;
}

export interface ConfigurableAttributeIds {
  size: string;
  color: string;
}

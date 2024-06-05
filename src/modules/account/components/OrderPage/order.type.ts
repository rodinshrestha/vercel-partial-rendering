import { Links, Meta } from '@/core/types/response.types';

export type OrderDataType = {
  link: Links;
  meta: Meta;
  data: Array<OrderType>;
};

export type OrderType = {
  customer_last_name: string;

  customer_first_name: string;
  /** Order id */
  id: string;

  /** Order date */
  created_at: string;

  /** totla price */
  grand_total: string;

  /** order number: increment id */
  increment_id: string;

  /** Is imgrated from ERP */
  is_migrated_from_erp: BooleanInNumber;

  /** External document number*/
  external_document_no: string;

  /** Order status */
  status: string;

  /** Order metas */
  metas: Array<{ identifier: string; value: string }>;

  link: Links;

  parent_items: Array<ItemType>;

  channel_code: string;

  store_code: string;

  shipping_address: {
    first_name: string;
    address1: string;
    postal_code: string;
    city_name: string;
    country: { name: string };
    delivery_contact_person: string;
    phone: string;
  };
};

export type OrderFilterType = {
  created_at: string;
  increment_id: string;
  user: string;
  q: string;
};

export type ItemType = {
  sku: string;
  name: string;
  article_number: string;
  base_image: [];
  discount_percent: number;
  total_qty: number;
  children: false;
  identifier: string;
  items: {
    id: string;
    qty: number;
    product: {
      id: string;
      configurable_attributes: [];
    };
  };
};

export type BooleanInNumber = 0 | 1;

import { ProductTypes } from '@/product/types/product.types';

export type OrderSummaryType = {
  /** Order Summary detail order id */
  cart_id: string;

  /**Order Summary subtotal price */
  sub_total: string;

  /** Order Summary currency */
  currency_code: string;

  /** Order Summary shipping amount */
  shipping_amount_tax: string;

  /** Created at date */
  created_at: string;

  /**Status */
  status: string;

  /** Cart id tax amount */
  total_tax_amount: string;

  /** Order Summary sub total included tax amount */
  sub_total_inc_tax: string;

  /** customer email */
  customer_email: string;

  /** Coupon */
  coupon_code: string;

  /** CUstomer first name */
  customer_first_name: string;

  /** Payment type */
  payment_method: string;

  /** discount amount */
  discount_amount?: number;

  /** Discount amount formatted */
  discount_amount_formatted?: string;

  //hard fix
  grand_total_formatted: string;

  /** Shipping tax with formmated */
  shipping_inc_tax: string;

  /** Formatted final price: for regular user or normal price selected user */
  formatted_final_price: OrderSummaryPriceFormat;

  /** Formmated recommend price: for b2b user with selected recommended price */
  formatted_recommended_price: OrderSummaryPriceFormat;

  /** recommend tax amount */
  recommended_total_tax_amount: string;

  /** recommend discount amount  with tax*/
  recommended_discount_tax_amount: string;

  /** recommended discount amount */
  recommended_discount_amount: string;

  /** Discount amount */
  discount_tax_amount: string;

  order_items: Array<{
    sub_total: string;
    product_data: Partial<ProductTypes>;
    grand_total_formatted: string;
    /** Recommended sub total included tax formatted */
    recommended_sub_total_inc_tax_formatted: string;
    formatted_final_price: OrderSummaryPriceFormat;

    /** Subtotal included tax formatted */
    sub_total_inc_tax_formatted: string;

    qty: number;
  }>;

  order_metas: {
    contact: {
      email: string;
    };
  };

  items_count: number;

  increment_id: string;

  shipping_amount: string;

  shipping_information: {
    first_name: string;
    last_name: string;
    address1: string;
    email: string;
    city_name: string;
    address: string;
    phone: string;
    postal_code: string;
    region_name: string;
    delivery_contact_person: string;
    attention: string;
    country: {
      name: string;
    };
  };

  grand_total: string;
};

export type OrderSummaryPriceFormat = {
  /** Discount amount with formatted price */
  discount_amount_formatted: string;

  /** Discount amount with tax formatted */
  discount_tax_amount_formatted: string;

  /** Grand total price with formatted */
  grand_total_formatted: string;

  /** Subtotal formatted */
  sub_total_formatted: string;

  /** Sub total with tax formatted */
  sub_total_inc_tax_formatted: string;

  /** Tax amount formatted */
  tax_amount_formatted: string;

  /** Total tax amount with formatted */
  total_tax_amount_formatted: string;

  /** shipping amount included tax */
  shipping_inc_tax_formatted: string;

  /** recommended discount amount formatted */
  recommended_discount_amount_formatted: string;
};

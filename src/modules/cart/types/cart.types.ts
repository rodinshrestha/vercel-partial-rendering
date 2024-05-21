import { ProductTypes } from '@/product/types/product.types';

export type CartTypes = {
  /**Coupon code in cart */
  coupon_code: Array<string>;

  /** Cart item sub total */
  sub_total: number;

  /** Cart items */
  items: Array<CartDetailTypes>;

  /** TOtal product quantity in cart */
  total_items_qty: number;

  /**Product id */
  id: string;

  items_count: number;

  /** Total cart price */
  price_format: {
    final_price: PriceInCart;
    recommended_price: PriceInCart;
  };

  /** Total price for member */
  member_price: PriceInCart;

  /**Payment methods */
  payment_method: string;
};

export type CartDetailTypes = {
  /** Cart id */
  cart_id: string;

  /** Id */
  id: string;

  /**Sub total included tax price */
  sub_total_inc_tax: number;

  /** Product details */
  product: ProductTypes;

  proceed_to_checkout: boolean;

  message: Array<string>;

  /** Custom Name */
  custom_name: string;

  /**Price for cart */
  price_format: {
    final_price: PriceInCart;

    /** TOtal recommended price */
    recommended_price: PriceInCart;

    /** Regular price  */
    regular_price: {
      /** Regular price without format */
      regular_price: number;

      /** Regular price with format */
      regular_price_formatted: string;
    };
  };

  /** Product qty */
  qty: number;

  /** final price: //your price */
  unit_final_price_formatted: string;

  /** Regular price:// net price  */
  unit_regular_price_formatted: string;
};

export type PriceInCart = {
  /** Cart discount amount */
  discount_amount: number;

  /** Cart discount amount in formatted */
  discount_amount_formatted: string;

  /** Cart discount amount  taxt in formatted */
  discount_amount_tax_formatted: string;

  /** Cart price grand total */
  grand_total: number;

  /** Cart grand amount with formatted */
  grand_total_formatted: string;

  /** Cart sub total */
  sub_total: number;

  /** Cart sub total formatted */
  sub_total_formatted: string;

  /** Cart sub total included tax */
  sub_total_inc_tax: number;

  /** Cart sub total included tax with format */
  sub_total_inc_tax_formatted: string;

  /** Cart total tax amount */
  total_tax_amount: number | string;

  /** Cart total tax amount with formatted */
  total_tax_amount_formatted: string;

  /** Shipping amount with tax */
  shipping_inc_tax: string;

  /** Shipping amount with tax and currency formatted */
  shipping_inc_tax_formatted: string;

  /** Cart shipping amount */
  shipping_amount: number | string;

  total?: number;

  discount_amount_tax: number;
};

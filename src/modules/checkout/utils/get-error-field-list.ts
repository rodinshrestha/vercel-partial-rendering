import { FormikProps } from 'formik';

import { CartDetailTypes, CartTypes } from '@/cart/types/cart.types';

import { CheckoutFormType } from '../types/checkout.types';

export const getErrorFieldList = (formik: FormikProps<CheckoutFormType>) => {
  const { shipping, shipping_option } = formik.values;
  const formField = { ...shipping, shipping_option };

  return Object.entries(formField).reduce((acc: Array<string>, iterator) => {
    const [key, value] = iterator;

    if (!value) {
      return [...acc, key];
    }

    return acc;
  }, []);
};

/**
 * Is qty out of stock in checkout summary
 */

export const isItemOutOfStock = (item: Array<CartDetailTypes> = []) => {
  if (!item.length) return true;

  return item.some(
    (x) => !x.product.is_in_stock || x.qty > Number(x.product.quantity)
  );
};

//Checks if there is any issue in summary items
export const shouldProceedToCheckout = (checkoutSummary: CartTypes | null) => {
  const { items = [] } = checkoutSummary || {};

  if (!items.length) {
    return false;
  }

  return items.every((item) => item.proceed_to_checkout);
};

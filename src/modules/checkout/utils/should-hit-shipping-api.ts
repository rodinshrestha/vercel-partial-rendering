import { CheckoutShippingFormType } from '../types/checkout.types';

export const shouldHitShippingApi = (shipping: CheckoutShippingFormType) => {
  return Object.entries(shipping).reduce((acc, iterator) => {
    const [_, value] = iterator;
    if (!acc) {
      return acc;
    }

    if (!value) {
      return false;
    }

    return !!value;
  }, true);
};

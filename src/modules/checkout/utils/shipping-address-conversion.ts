import { NSHIFT } from '../components/NshiftWidget/constant/nshift.constants';
import { NshiftType } from '../components/NshiftWidget/types/nshift.types';
import { ShippingMethodType } from '../types/checkout.types';

export const shippingAddressConversion = (
  shippingMethod: Array<ShippingMethodType>,
  item: NshiftType
) => {
  const isSelectedAddressCustom = shippingMethod.some(
    (x) => x.identifier === item.selectedOptionId
  );

  if (isSelectedAddressCustom) {
    return {
      shipping_option: item.selectedOptionId,
      selected_agent: '',
      selected_option: '',
    };
  }

  return {
    shipping_option: NSHIFT,
    selected_agent: item.agent || '',
    selected_option: item.selectedOptionId,
  };
};

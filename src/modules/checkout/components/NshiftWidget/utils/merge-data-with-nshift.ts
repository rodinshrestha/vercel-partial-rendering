import { NSHIFT } from '../constant/nshift.constants';
import { ShippingMethodType } from '../../../types/checkout.types';
import { NshiftType } from '../types/nshift.types';

export const mergeDataWithNshift = (
  shippingData: Array<ShippingMethodType> = [],
  nshiftData: NshiftType | null = null
) => {
  const { options = [] } = nshiftData || {};

  const convertDataForNshift = shippingData
    .filter((x) => x.identifier !== NSHIFT)
    .map((x) => ({
      name: x.name,
      id: x.identifier,
      optionIdFirstPart: x.identifier,
    }));
  return {
    ...nshiftData,
    options: [...options, ...convertDataForNshift],
  };
};

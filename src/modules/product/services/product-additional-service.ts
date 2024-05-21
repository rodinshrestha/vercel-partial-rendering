import { HeaderType } from '@/core/types/api-headers.types';
import { publicAxios } from '@/core/utils/axios';

export const fetchProductAdditionalData = async (
  productID: string,
  headers: HeaderType
) => {
  return publicAxios.get(`/sf/products/${productID}/additional/information`, {
    headers,
  });
};

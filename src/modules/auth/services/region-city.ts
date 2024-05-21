import { HeaderType } from '@/core/types/api-headers.types';
import { publicAxios } from '@/core/utils/axios';

export const getRegion = (country_code: string, headers: HeaderType) =>
  publicAxios.get(`/countries/${country_code}/regions`, { headers });

export const getCities = (
  country_code: string,
  region_id: string,
  headers: HeaderType
) =>
  publicAxios.get(`/countries/${country_code}/regions/${region_id}/cities`, {
    headers,
  });

import { HeaderType } from '@/core/types/api-headers.types';
import { publicAxios } from '@/core/utils/axios';

export const getOrganizationDetails = (
  headers: HeaderType,
  organization_id: string | string[]
) => publicAxios.get(`/sf/b2b/organizations/${organization_id}`, { headers });

export const getOrganization = (
  headers: HeaderType,
  ORG_ID: string | string[]
) => publicAxios.get(`/b2b/organizations/${ORG_ID}`, { headers });

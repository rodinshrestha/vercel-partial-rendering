import { executeFetch } from '@/lib/execute-fetch';
import { Resolver } from '@/core/types/resolver.types';
import { AddressType } from '@/auth/types/user.types';

import { OfferType } from '../types/offer.types';

export const getOffers = async (headers: HeadersInit) => {
  const response = await executeFetch('/sf/customer/promotions', {
    headers,
    cache: 'no-cache',
  });
  if (!response.ok) {
    return { data: [], error: true };
  }

  return (await response.json()) as { data: Array<OfferType> };
};

export const getAddresses = async (
  headers: HeadersInit,
  { channel }: { channel: Resolver['channel'] }
) => {
  if (!channel) {
    return { data: [], error: false };
  }
  const response = await executeFetch(
    `/sf/customer/channels/${channel.id}/addresses`,
    {
      headers,
      cache: 'no-cache',
    }
  );
  if (!response.ok) {
    return { data: [], error: true };
  }

  return (await response.json()) as { data: Array<AddressType> };
};

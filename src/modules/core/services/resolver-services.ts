import 'server-only';

import { notFound } from 'next/navigation';

import { executeFetch } from '@/lib/execute-fetch';
import { Resolver } from '@/core/types/resolver.types';

export const getResolver = async (headers: HeadersInit) => {
  const response = await executeFetch('/sf/resolver', {
    headers,
    cache: 'force-cache',
  });
  if (!response.ok) {
    return notFound();
  }
  return (await response.json()) as { data: Resolver };
};

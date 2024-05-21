'server-only';

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { LOCAL_DEFAULT_HOST } from '../constants/local-default-host';

import { isDevelopment } from './check-environment';

export const getHost = () => {
  const header = headers();

  const host = isDevelopment()
    ? LOCAL_DEFAULT_HOST
    : header.get('X-Forwarded-Host');
  // const host = LOCAL_DEFAULT_HOST;

  if (!host) {
    throw notFound();
  }

  return host;
};

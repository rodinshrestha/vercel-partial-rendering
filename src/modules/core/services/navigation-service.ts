import 'server-only';

import { executeFetch } from '@/lib/execute-fetch';
import type {
  FooterMetaTypes,
  NavigationType,
} from '@/core/types/navigation-type';

import {
  footerRevalidate,
  navigationRevalidate,
} from '../constants/revalidation';

/** Fetches navigation menu items */
export const getNavigation = async (headers: HeadersInit) => {
  const response = await executeFetch('/sf/navigation-menus', {
    headers,
    next: {
      revalidate: navigationRevalidate,
      tags: ['navigation', 'all'],
    },
  });

  return (await response.json()) as { data: NavigationType };
};

/** Fetches footer & footer menu items */
export const getFooter = async (headers: HeadersInit) => {
  const response = await executeFetch('/sf/footer-meta', {
    headers,
    // cache: 'force-cache',
    next: {
      revalidate: footerRevalidate,
      tags: ['footer', 'all'],
    },
  });

  return (await response.json()) as { data: FooterMetaTypes };
};

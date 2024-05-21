'use client';

import { getAuthToken } from '@/auth/utils/auth-cookie';

export const showWishlist = () => {
  const authToken = getAuthToken();

  return Boolean(authToken);
};

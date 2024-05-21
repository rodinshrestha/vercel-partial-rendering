import "server-only";

import { cookies } from "next/headers";

import { AUTH_TOKEN } from "@/auth/constants/auth.constant";

/**
 * Returns cache object
 * b2c requires a revalidation for guest user
 * and {cache: "no-cache"} for logged in customers
 */
export const getCacheConfig = (
  nextConfig: RequestInit["next"] = {}
): RequestInit => {
  const cookie = cookies();
  const isCustomer = cookie.get(AUTH_TOKEN)?.value;

  if (isCustomer) {
    return {
      cache: "no-cache",
      next: { tags: nextConfig.tags || [] },
    };
  }

  if (!nextConfig.revalidate || !nextConfig.tags) {
    throw new Error("getCacheConfig should contain revalidate & tags");
  }

  return {
    next: {
      ...nextConfig,
    },
  };
};

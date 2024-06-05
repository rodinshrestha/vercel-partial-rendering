"use client";

import {
  cartHeaderKey,
  channelHeaderKey,
  storeHeaderKey,
} from "@/core/constants/token.constants";
import { getCartToken } from "@/modules/cart/utils/cart-cookie";
import { getAuthToken } from "@/auth/utils/auth-cookie";

import { initializeHeaderType } from "../types/api-headers.types";

/**
 * Returns headers for channel, store, orgID & area (if logged in),
 * Consume this in client side api requests
 * You need to send http-only cookies from useHeaders()
 * @example:
 * ```ts
 * makeClientHeaders({channel: 'se', store: 'en',})
 * ```
 */
export const makeClientHeaders = (
  initializeHeaders: initializeHeaderType & { cartToken: string }
) => {
  const { channel, store } = initializeHeaders || {};
  const cartID = getCartToken();
  const authToken = getAuthToken();

  return {
    [channelHeaderKey]: channel,
    [storeHeaderKey]: store,
    ...(cartID && !authToken ? { [cartHeaderKey]: cartID } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
};

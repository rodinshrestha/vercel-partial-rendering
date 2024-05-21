"use client";

import {
  cartHeaderKey,
  channelHeaderKey,
  storeHeaderKey,
} from "@/core/constants/token.constants";
import { getCartToken } from "@/modules/cart/utils/cart-cookie";

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
  const { channel, store, authId, cartToken } = initializeHeaders || {};
  const cartID = cartToken || getCartToken();

  return {
    [channelHeaderKey]: channel,
    [storeHeaderKey]: store,
    ...(cartID && !authId ? { [cartHeaderKey]: cartID } : {}),
    ...(authId ? { Authorization: `Bearer ${authId}` } : {}),
  };
};

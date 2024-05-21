import "server-only";

import { cookies, headers } from "next/headers";

import {
  cartHeaderKey,
  channelHeaderKey,
  storeHeaderKey,
} from "@/core/constants/token.constants";
import { AUTH_TOKEN } from "@/auth/constants/auth.constant";

import { getChannelStore } from "./get-channel-store";

/**
 * Formats the channel & store
 * as the headers required by the backend
 * @example
 * ```js
 * const headers = makeHeaders({channel: "se", store: 'en})
 * ```
 * @returns `{ "hc-channel": string; "hc-store": string; }`
 */
export const makeHeaders = () => {
  const cookie = cookies();

  const authToken = cookie.get(AUTH_TOKEN)?.value || "";
  const cartID = cookie.get(cartHeaderKey)?.value || "";

  const channelStoreObj = getChannelStore();

  const { channel, store } = channelStoreObj;

  return {
    [channelHeaderKey]: channel,
    [storeHeaderKey]: store,
    ...(cartID && !authToken ? { [cartHeaderKey]: cartID } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
};

export const makeChannelStore = () => {
  const channelStoreObj = getChannelStore();

  return channelStoreObj;
};

/**
 * It returns the current host,
 * From where browser request, i.e current browser domain
 */
export const getNextHost = () => {
  const header = headers();
  // const { NEXT_PUBLIC_DOMAIN_URL = 'Please set host in .env file' } =
  //   process.env;

  const forwardedHost = header.get("X-Forwarded-Host");

  // if (!forwardedHost) {
  //   throw Error(NEXT_PUBLIC_DOMAIN_URL);
  // }

  return `https://${forwardedHost}`;
};

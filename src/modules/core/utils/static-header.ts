import {
  channelHeaderKey,
  storeHeaderKey,
} from "@/core/constants/token.constants";

import { getChannelStore } from "./get-channel-store";

/**
 * Formats the channel & store
 * as the headers required for every API request
 * @example
 * ```js
 * const headers = makeStaticHeaders({channel: "se", store: 'en})
 * ```
 * @returns `{ "hc-channel": string; "hc-store": string; }`
 */
export const makeStaticHeaders = () => {
  const channelStoreObj = getChannelStore();

  const { channel, store } = channelStoreObj;

  return {
    [channelHeaderKey]: channel,
    [storeHeaderKey]: store,
  };
};

export const makeChannelStore = () => {
  const channelStoreObj = getChannelStore();

  return channelStoreObj;
};

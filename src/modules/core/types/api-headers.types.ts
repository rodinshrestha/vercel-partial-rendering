import {
  cartHeaderKey,
  channelHeaderKey,
  storeHeaderKey,
} from "../constants/token.constants";

export type initializeHeaderType = {
  channel: string;
  store: string;
  cartId?: string;
  authId?: string;
};

export type HeaderType = {
  [channelHeaderKey]: string;
  [storeHeaderKey]: string;
  [cartHeaderKey]?: string;
  Authorization?: string;
};

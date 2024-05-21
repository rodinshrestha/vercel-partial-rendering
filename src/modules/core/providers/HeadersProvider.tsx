"use client";

import React from "react";

import {
  cartHeaderKey,
  channelHeaderKey,
  storeHeaderKey,
} from "../constants/token.constants";
import { makeClientHeaders } from "../utils/make-client-headers";
import { initializeHeaderType, HeaderType } from "../types/api-headers.types";

type ContextType = {
  clientHeaders: HeaderType;
  updateCartToken: React.Dispatch<React.SetStateAction<string>>;
  channel: string;
  store: string;
};

const initialValues: ContextType = {
  clientHeaders: {
    [channelHeaderKey]: "",
    [storeHeaderKey]: "",
    [cartHeaderKey]: "",
    Authorization: "",
  },
  updateCartToken: () => {},
  channel: "",
  store: "",
};

export const HeaderContext = React.createContext(initialValues);

/**
 * @param param children
 * @param headers {typeof intialContext} - Contains cookie headers
 * @returns
 */

type HeaderProps = {
  children: React.ReactNode;
  initializeHeaders: initializeHeaderType;
};
const HeadersProvider = ({ children, initializeHeaders }: HeaderProps) => {
  const [cartToken, setCartToken] = React.useState<string>(
    initializeHeaders?.cartId || ""
  );

  const { channel, store } = initializeHeaders;

  const clientHeaders = React.useMemo(
    () => makeClientHeaders({ ...initializeHeaders, cartToken }),
    [initializeHeaders, cartToken]
  );

  return (
    <HeaderContext.Provider
      value={{
        clientHeaders,
        updateCartToken: setCartToken,
        channel,
        store,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
export default HeadersProvider;

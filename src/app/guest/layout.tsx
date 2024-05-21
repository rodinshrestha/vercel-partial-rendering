import React from "react";

import HeadersProvider from "@/core/providers/HeadersProvider";
import ResolverProvider from "@/core/providers/ResolverProvider";
import TranslationProvider from "@/core/providers/TranslationProvider";
import { getResolver } from "@/core/services/resolver-services";
import { initializeHeaderType } from "@/core/types/api-headers.types";
import { getChannelStore } from "@/core/utils/get-channel-store";
import { getTranslation } from "@/core/utils/i18n";
import { makeStaticHeaders } from "@/core/utils/static-header";
import CheckoutProvider from "@/checkout/providers/CheckoutProviders";
import CartProvider from "@/cart/providers/CartProvider";
import WishlistProvider from "@/wishlist/providers/WishlistProvider";

type Props = {
  children: React.ReactNode;
};

const GuestLayout = async ({ children }: Props) => {
  const { channel, store } = getChannelStore();
  const initializeHeader: initializeHeaderType = {
    channel,
    store,
  };

  const [data, translation] = await Promise.all([
    getResolver(makeStaticHeaders()),
    getTranslation(store),
  ]).then((res) => res);

  return (
    <HeadersProvider initializeHeaders={initializeHeader}>
      <ResolverProvider resolver={data.data}>
        <TranslationProvider translation={translation}>
          <HeadersProvider initializeHeaders={initializeHeader}>
            <CheckoutProvider>
              <CartProvider>
                <WishlistProvider>
                  <div>{children}</div>
                </WishlistProvider>
              </CartProvider>
            </CheckoutProvider>
          </HeadersProvider>
        </TranslationProvider>
      </ResolverProvider>
    </HeadersProvider>
  );
};

export default GuestLayout;

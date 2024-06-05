import { Josefin_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import {
  makeChannelStore,
  makeStaticHeaders,
} from "@/core/utils/static-header";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import GlobalStyles from "@/theme/GlobalStyles";
import ToastContainer from "@/core/components/ToastContainer";
import { getTranslation } from "@/core/utils/i18n";
import TranslationProvider from "@/core/providers/TranslationProvider";
import StyleThemeProvider from "@/core/providers/StyleThemeProvider";
import CartProvider from "@/cart/providers/CartProvider";
import WishlistProvider from "@/wishlist/providers/WishlistProvider";
import { getResolver } from "@/core/services/resolver-services";
import ResolverProvider from "@/core/providers/ResolverProvider";
import HeadersProvider from "@/core/providers/HeadersProvider";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { channel = "en", store } = makeChannelStore() || {};

  const initializeHeaders = { channel, store };

  const [data, translations] = await Promise.all([
    getResolver(makeStaticHeaders()),
    getTranslation(store),
  ]).then((res) => res);

  return (
    <html lang={channel}>
      <body className={josefinSans.className}>
        <NextTopLoader color="#303336" />
        <StyledComponentsRegistry>
          <StyleThemeProvider>
            <GlobalStyles />
            <HeadersProvider initializeHeaders={initializeHeaders}>
              <TranslationProvider translation={translations}>
                <ToastContainer />
                <ResolverProvider resolver={data.data}>
                  <CartProvider>
                    <WishlistProvider>{children}</WishlistProvider>
                  </CartProvider>
                </ResolverProvider>
              </TranslationProvider>
            </HeadersProvider>
          </StyleThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

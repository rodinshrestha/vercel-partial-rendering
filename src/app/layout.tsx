import { Josefin_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { makeChannelStore } from "@/core/utils/static-header";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import GlobalStyles from "@/theme/GlobalStyles";
import ToastContainer from "@/core/components/ToastContainer";
import { getTranslation } from "@/core/utils/i18n";
import TranslationProvider from "@/core/providers/TranslationProvider";
import StyleThemeProvider from "@/core/providers/StyleThemeProvider";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { channel = "en" } = makeChannelStore() || {};

  const translations = getTranslation(channel);

  return (
    <html lang={channel}>
      <body className={josefinSans.className}>
        <NextTopLoader color="#303336" />
        <StyledComponentsRegistry>
          <StyleThemeProvider>
            <GlobalStyles />
            <TranslationProvider translation={translations}>
              <ToastContainer />
              {children}
            </TranslationProvider>
          </StyleThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

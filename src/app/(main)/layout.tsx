import React, { PropsWithChildren, Suspense } from "react";

import { PageProps } from "@/core/types/page-props.types";
import { getFooter, getNavigation } from "@/core/services/navigation-service";
import Header from "@/core/components/Header";
import Footer from "@/core/components/Footer";
import { getChannels } from "@/core/services/channel-store-service";
import { makeStaticHeaders } from "@/core/utils/static-header";
import HeaderAuthSection from "@/core/components/Header/ssrcomponents/HeaderAuthSection";

export async function generateStaticParams() {
  return [];
}

const HeaderComponent = async () => {
  const headers = makeStaticHeaders();

  const [navigation, channels] = await Promise.all([
    getNavigation(headers),
    getChannels(headers),
  ]).then((res) => res);

  return (
    <Header {...{ data: navigation.data, channelList: channels.data }}>
      <Suspense fallback={<p>loading..</p>}>
        <HeaderAuthSection />
      </Suspense>
    </Header>
  );
};

const FooterComponent = async () => {
  const headers = makeStaticHeaders();

  const [footerMeta, navigation] = await Promise.all([
    getFooter(headers),
    getNavigation(headers),
  ]).then((res) => res);

  return (
    <Footer
      {...{
        data: navigation.data,
        footerMeta: footerMeta.data,
      }}
    />
  );
};

const MainLayout = ({ children }: PropsWithChildren<PageProps>) => {
  return (
    <>
      <Suspense>
        <HeaderComponent />
      </Suspense>
      <main>{children}</main>
      <FooterComponent />
    </>
  );
};
export default MainLayout;

import React, { PropsWithChildren } from "react";

import { PageProps } from "@/core/types/page-props.types";
import { getFooter, getNavigation } from "@/core/services/navigation-service";
import Header from "@/core/components/Header";
import Footer from "@/core/components/Footer";
import { getChannels } from "@/core/services/channel-store-service";
import { makeStaticHeaders } from "@/core/utils/static-header";

const HeaderComponent = async () => {
  const headers = makeStaticHeaders();

  /** Sequential fetching of profile */

  const [navigation, channels] = await Promise.all([
    getNavigation(headers),
    getChannels(headers),
  ]).then((res) => res);

  return <Header {...{ data: navigation.data, channelList: channels.data }} />;
};

const FooterComponent = async () => {
  const headers = makeStaticHeaders();
  /** Sequential fetching of profile */

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
    <React.Fragment>
      <HeaderComponent />
      <main>{children}</main>
      <FooterComponent />
    </React.Fragment>
  );
};
export default MainLayout;

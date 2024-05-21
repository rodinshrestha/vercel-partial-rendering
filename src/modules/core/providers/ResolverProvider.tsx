"use client";

import React, { PropsWithChildren } from "react";

import type { Resolver } from "@/core/types/resolver.types";
import { getCookie, setCookie } from "@/core/utils/cookie";
import { FAV_ICON } from "@/core/constants/token.constants";

// import { initialResolverContext } from "./initial-context/initial-resolver-context";

const initialStateMeta = {
  defaults: {
    title: null,
    title_prefix: null,
    title_suffix: null,
  },
  logo: {
    primary: null,
    footer: null,
    favicon: null,
  },
  meta: {
    meta_description: null,
    meta_keywords: null,
  },
};

const initialPriceFormatData = {
  price_format_data: null,
  group_separator_value: "",
  decimal_separator_value: "",
};
const initialResolverContext: Resolver = {
  area: null,
  channel: null,
  country: null,
  store: null,
  pages: null,
  site_meta: initialStateMeta,
  customer_group: null,
  shipping_methods: [],
  payment_methods: [],
  social_media: {
    facebook: {
      icon: "",
      url: "",
    },
    instagram: {
      icon: "",
      url: "",
    },
    youtube: {
      icon: "",
      url: "",
    },
    pinterest: {
      icon: "",
      url: "",
    },
  },
  price_format: initialPriceFormatData,
  voyado: { voyado_locale: "", voyado_market: "" },
  lipscore_meta: {
    widget_language: "",
    widget_api_key: "",
  },
};

type Props = {
  resolver: Resolver;
};
type Context = Resolver;

const contextMapper = (data: Resolver) => {
  if (!data) return initialResolverContext;

  const {
    channel,
    pages,
    store,
    site_meta,
    area,
    country,
    price_format,
    social_media,
    voyado,
    payment_methods,
    shipping_methods,
    customer_group,
    lipscore_meta,
  } = data;

  if (site_meta?.logo?.favicon) {
    setCookie(FAV_ICON, site_meta.logo.favicon);
  }

  return {
    area,
    channel,
    pages,
    store,
    site_meta: {
      ...site_meta,
      logo: {
        ...site_meta.logo,
        favicon: site_meta?.logo?.favicon || getCookie(FAV_ICON) || "",
      },
    },
    country,
    social_media,
    price_format,
    voyado,
    payment_methods,
    shipping_methods,
    customer_group,
    lipscore_meta,
  };
};

export const ResolverContext = React.createContext<Context>({
  ...initialResolverContext,
});

const ResolverProvider = ({ resolver, children }: PropsWithChildren<Props>) => {
  return (
    <ResolverContext.Provider value={{ ...contextMapper(resolver) }}>
      {children}
    </ResolverContext.Provider>
  );
};
export default ResolverProvider;

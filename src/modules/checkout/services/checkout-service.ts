import { HeaderType } from "@/core/types/api-headers.types";
import { publicAxios } from "@/core/utils/axios";
import toastAlert from "@/core/utils/toast";
import { executeFetch } from "@/lib/execute-fetch";
import { PageProps } from "@/core/types/page-props.types";

import {
  CountriesTypes,
  PaymentMethodsType,
  ShippingMethodType,
} from "../types/checkout.types";
import { PromotionsType } from "../types/promotion.types";

export const fetchPromotions = (
  headers: HeaderType
): Promise<Array<PromotionsType>> => {
  return executeFetch("/sf/customer/promotions", {
    headers,
    cache: "no-store",
  }).then(async (res) => {
    if (!res.ok) {
      return [];
    }

    const response = await res.json();

    return response.data;
  });
};

export const fetchCheckoutSummary = async (headers: HeaderType) => {
  return publicAxios.get("sf/checkout/cart/summary", { headers });
};

export const getCartInfo = (headers: HeaderType) => {
  return executeFetch("/sf/checkout/cart/info", {
    headers,
    cache: "no-store",
  }).then(async (res) => {
    if (!res.ok) {
      return null;
    }

    const response = await res.json();

    return response?.data?.shipping_addresses || null;
  });
};

export const getCart = async (headers: HeadersInit) => {
  const response = await executeFetch(`/sf/checkout/cart`, {
    headers,
    cache: "no-cache",
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
};

export const getShippingMethod = async (headers: HeadersInit) => {
  const response = await executeFetch(
    `/sf/checkout/cart/shipping-information`,
    {
      headers,
      cache: "no-cache",
    }
  );
  return (await response.json()) as { data: ShippingMethodType[] };
};

export const getPaymentMethod = async (headers: HeadersInit) => {
  const response = await executeFetch(`/sf/checkout/cart/payment-information`, {
    headers,
    cache: "no-cache",
  });
  return (await response.json()) as { data: PaymentMethodsType[] };
};

export const getAdyenPaymentList = async (headers: HeadersInit) => {
  const response = await executeFetch(`/sf/adyen/payment-methods`, {
    headers,
    cache: "no-cache",
  });
  return await response.json();
};

export const getCountryList = async (headers: HeadersInit) => {
  const response = await executeFetch(`/sf/channels/countries`, {
    headers,
    next: {
      tags: ["countries", "all"],
      revalidate: 86400,
    },
  });
  return (await response.json()) as { data: CountriesTypes[] };
};

export const getPostPaymentMode = (headers: HeaderType, paymentMode: string) =>
  publicAxios
    .post(
      "sf/checkout/cart/payment-information",
      {
        payment_option: paymentMode,
      },

      { headers }
    )
    .catch((error) => {
      toastAlert(error, "error");
    });

// TODO: Add type for body (after project is stable)
export const postSaveShippingData = (body: any, headers: HeaderType) => {
  return publicAxios.post("/sf/checkout/cart/addresses", body, { headers });
};

// TODO: Add type for body (after project is stable)
export const postSaveShippingMethod = async (
  body: any,
  headers: HeaderType
) => {
  return await publicAxios
    .post("/sf/checkout/cart/shipping-information", body, {
      headers,
    })
    .catch((error) => {
      toastAlert(error, "error");
    });
};

export const paymentIntent = (headers: HeaderType) =>
  publicAxios.get("sf/checkout/cart/payment-intent", { headers });

export const postPaymentInformation = (
  headers: HeaderType,
  body: { payment_option: string }
) =>
  publicAxios.post("sf/checkout/cart/payment-information", body, {
    headers,
  });

export const makeAdyenPayment = async (headers: HeaderType, data: unknown) => {
  return await publicAxios
    .post(`/sf/adyen/make-payment`, data, { headers })
    .then((response) => response)
    .catch(console.error);
};

export const applyCouponCode = (
  headers: HeaderType,
  body: { [key: string]: string | number | Array<string> }
) => publicAxios.post("sf/checkout/cart/rules/coupon-code", body, { headers });

export const paymentDetails = async (
  searchParams: PageProps["searchParams"],
  headers: HeaderType
) => {
  const { redirectResult, threeDSResult } = searchParams;

  return await publicAxios
    .post(
      "/sf/adyen/details-payment",
      {
        details: {
          ...(redirectResult ? { redirectResult } : { threeDSResult }),
        },
      },
      { headers }
    )
    .then((res) => {
      const { resultCode } = res.data.data;

      return { resultCode };
    })
    .catch((err) => console.log(err.response, "errrr"));
};

export const getNshift = async (
  headers: HeaderType,
  body: { [key: string]: string | number }
) => {
  return publicAxios.post("/sf/nshift/options", body, { headers });
};

"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { CartTypes } from "@/cart/types/cart.types";
import { LoadingStates } from "@/core/types/loading.types";
import { IDLE, LOADING, REJECTED, RESOLVED } from "@/core/constants/states";
import toastAlert from "@/core/utils/toast";
import useHeaders from "@/core/hooks/useHeaders";
import type { AdyenDataType } from "@/checkout/components/Adyen/adyen.types";
import {
  fetchCheckoutSummary,
  getNshift,
  paymentIntent,
} from "@/checkout/services/checkout-service";
import { ADYEN } from "@/checkout/constant/payment-mode.constant";
import { ShippingMethodType } from "@/checkout/types/checkout.types";
import { NshiftType } from "@/checkout/components/NshiftWidget/types/nshift.types";
import { mergeDataWithNshift } from "@/checkout/components/NshiftWidget/utils/merge-data-with-nshift";
import { isItemOutOfStock } from "@/checkout/utils/get-error-field-list";

type ContextType = {
  cartSummary: CartTypes | null;
  setCartSummary: React.Dispatch<React.SetStateAction<null | CartTypes>>;
  iframeStatus: LoadingStates;
  setIframeStatus: React.Dispatch<React.SetStateAction<LoadingStates>>;
  getCheckoutSummary: (selectedPayment?: string) => any;
  adyenData: AdyenDataType | null;
  setAdyenData: React.Dispatch<React.SetStateAction<AdyenDataType | null>>;
  setPaymentType: React.Dispatch<React.SetStateAction<string | null>>;
  paymentType: string | null;
  setCartSummaryLoader: React.Dispatch<React.SetStateAction<boolean>>;
  cartSummaryLoader: boolean;
  getPaymentIntent: () => any;
  nShiftData: Partial<NshiftType> | null;
  setNShiftData: React.Dispatch<
    React.SetStateAction<Partial<NshiftType> | null>
  >;
  setNShiftLoader: React.Dispatch<React.SetStateAction<boolean>>;
  nShiftLoader: boolean;
  fetchNshiftData: (
    shippingMethod: Array<ShippingMethodType>,
    body: { [key: string]: string }
  ) => void;
};

const initialValue = {
  cartSummary: null,
  paymentType: null,
  cartSummaryLoader: false,
  adyenDropInData: null,
  setCartSummary: () => {},
  setPaymentType: () => {},
  iframeStatus: IDLE as LoadingStates,
  getCheckoutSummary: () => {
    return Promise.resolve("");
  },
  setIframeStatus: () => {},
  adyenData: null,
  setAdyenData: () => {},
  setCartSummaryLoader: () => {},
  getPaymentIntent: () => {
    return Promise.resolve("");
  },
  setAdyenDropInData: () => {},
  setNShiftData: () => {},
  nShiftData: null,
  setNShiftLoader: () => {},
  nShiftLoader: false,
  fetchNshiftData: () => {},
};

export const CheckoutContext = React.createContext<ContextType>(initialValue);

type Props = {
  children: React.ReactNode;
};

const CheckoutProvider = ({ children }: Props) => {
  const [cartSummary, setCartSummary] = React.useState<null | CartTypes>(null);
  const [cartSummaryLoader, setCartSummaryLoader] = React.useState(false);
  const [paymentType, setPaymentType] = React.useState<string | null>(null);
  const [adyenData, setAdyenData] = React.useState<AdyenDataType | null>(null);
  const [nShiftLoader, setNShiftLoader] = React.useState(false);
  const [nShiftData, setNShiftData] =
    React.useState<Partial<NshiftType> | null>(null);
  const [iframeStatus, setIframeStatus] =
    React.useState<LoadingStates>(LOADING);

  const router = useRouter();
  const { clientHeaders } = useHeaders();

  const getPaymentIntent = React.useCallback(() => {
    return paymentIntent(clientHeaders)
      .then((res) => {
        const { value = "" } = res?.data?.data || {};
        setAdyenData(value);
        setIframeStatus(RESOLVED);
        return res;
      })
      .catch((err: unknown) => {
        setIframeStatus(REJECTED);
        toastAlert(err, "error");
        throw err;
      });
  }, [clientHeaders]);

  const getCheckoutSummary = React.useCallback(
    (selectedPayment = ""): Promise<string> => {
      return new Promise((resolve, reject) => {
        setCartSummaryLoader(true);
        fetchCheckoutSummary(clientHeaders)
          .then((res) => {
            const { data } = res.data;

            const paymentMode = selectedPayment || paymentType;

            setPaymentType(paymentMode);
            if (data.length === 0 || isItemOutOfStock(data.items)) {
              toastAlert(
                "There is the product that is currently unavailable in your cart",
                "custom-error"
              );
              setCartSummaryLoader(false);
              router.push(`/cart`);
              reject("failed");
            } else {
              setCartSummary(data);
              if (paymentMode === ADYEN) {
                getPaymentIntent().finally(() => {
                  setCartSummaryLoader(false);
                });
              } else {
                setCartSummaryLoader(false);
              }
            }
            resolve("success");
          })
          .catch((err) => {
            toastAlert(err, "error");
            reject("failed");
            setCartSummaryLoader(false);
          });
      });
    },
    [clientHeaders, paymentType, router, getPaymentIntent]
  );

  const fetchNshiftData = React.useCallback(
    (
      shippingMethod: Array<ShippingMethodType>,
      body: { [key: string]: string }
    ) => {
      setNShiftLoader(true);
      getNshift(clientHeaders, body)
        .then((res) => {
          const { data } = res.data;
          setNShiftData(mergeDataWithNshift(shippingMethod, data));
        })
        .catch(() => {
          setNShiftData(mergeDataWithNshift(shippingMethod, null));
        })
        .finally(() => {
          setNShiftLoader(false);
        });
    },
    [clientHeaders]
  );

  return (
    <CheckoutContext.Provider
      value={{
        adyenData,
        cartSummary,
        cartSummaryLoader,
        getCheckoutSummary,
        getPaymentIntent,
        iframeStatus,
        paymentType,
        setAdyenData,
        setCartSummary,
        setCartSummaryLoader,
        setIframeStatus,
        setPaymentType,
        fetchNshiftData,
        nShiftData,
        nShiftLoader,
        setNShiftData,
        setNShiftLoader,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;

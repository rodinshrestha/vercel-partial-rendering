"use client";
import React from "react";

import AdyenCheckout from "@adyen/adyen-web";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { FormikProps } from "formik";

import { setCartToken } from "@/cart/utils/cart-cookie";
import { IDLE, LOADING, REJECTED } from "@/core/constants/states";
import KlarnaSkeletonLoader from "@/core/components/Loader/KlarnaSkeletonLoader";
import { createOrderConfirmation } from "@/order/services/order-service";
import { scrollToSection } from "@/core/utils/scroll";
import useHeaders from "@/core/hooks/useHeaders";
import useCheckout from "@/checkout/hooks/useCheckout";
import toastAlert from "@/core/utils/toast";
import { publicAxios } from "@/core/utils/axios";
import useCart from "@/cart/hooks/useCart";

import { makeAdyenPayment } from "../../services/checkout-service";
import { CheckoutFormType } from "../../types/checkout.types";
import { getErrorFieldList } from "../../utils/get-error-field-list";

import { StyledDiv } from "./style";
import { AdyenDropInType, AdyenTypes } from "./adyen.types";

type Props = {
  formik: FormikProps<CheckoutFormType>;
  adyenPaymentList: AdyenTypes;
  adyenDropInRef: React.MutableRefObject<AdyenDropInType | null>;
  setAccordinActiveTitle: React.Dispatch<React.SetStateAction<string>>;
  setAdyenLoader: React.Dispatch<React.SetStateAction<boolean>>;
  adyenLoader: boolean;
  setIsPaymentError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPaymentInProgress: React.Dispatch<React.SetStateAction<boolean>>;
};

const Adyen = ({
  formik,
  adyenPaymentList,
  adyenDropInRef,
  setAccordinActiveTitle,
  setAdyenLoader,
  adyenLoader,
  setIsPaymentError,
  setIsPaymentInProgress,
}: Props) => {
  const [isError, setIsError] = React.useState(false);

  const {
    adyenData,
    iframeStatus,
    cartSummaryLoader,
    cartSummary,
    getPaymentIntent,
  } = useCheckout();
  const { clientHeaders } = useHeaders();
  const router = useRouter();
  const { cartStatus } = useCart();

  const paymentContainer = React.useRef<HTMLDivElement>(null);

  const handleOnSubmit = async (state: any, component: any) => {
    try {
      if (!cartSummary?.id) {
        // component.handleError();
        throw new Error("cart id not found");
      }
      const errorFieldList = getErrorFieldList(formik);

      if (errorFieldList.length) {
        formik.handleSubmit();
        // component.handleError();
        scrollToSection("#checkout-form");
        return;
      }

      setIsPaymentInProgress(true);

      await createOrderConfirmation(clientHeaders, cartSummary.id)
        .then(async () => {
          setCartToken(cartSummary.id);
          const result = await makeAdyenPayment(clientHeaders, state.data);

          if (result?.data.data.action) {
            component.handleAction(result.data.data.action);
            return;
          }

          if (result?.data.data.resultCode === "Authorised") {
            setIsPaymentInProgress(false);
            router.push(`/checkout/success`);
          } else {
            setIsPaymentError(true);
            setIsPaymentInProgress(false);
            getPaymentIntent();
            // adyenDropInRef.current?.update();
          }
        })
        .catch((err: any) => {
          setIsPaymentError(true);
          getPaymentIntent();
          toastAlert(err, "error");
          return;
        });
    } catch (error) {
      toastAlert(error, "error");
      setIsPaymentInProgress(false);
      getPaymentIntent();

      // adyenDropInRef.current?.update();
    }
  };

  const handleOnChange = React.useCallback(() => {
    setAccordinActiveTitle("");
    setIsPaymentError(false);
  }, [setAccordinActiveTitle, setIsPaymentError]);

  const handleOnAdditionalDetails = (state: any) => {
    return publicAxios
      .post(
        "/sf/adyen/details-payment",
        {
          ...state.data,
        },
        { headers: clientHeaders }
      )
      .then((resp) => {
        const { resultCode } = resp.data.data;
        if (resultCode === "Authorised") {
          return router.push(`/checkout/success`);
        } else {
          setIsPaymentError(true);
          getPaymentIntent();
          setIsPaymentInProgress(false);
        }
      })
      .catch((error) => {
        getPaymentIntent();
        console.log(error, "detail-payment-error");
      });
  };

  React.useEffect(() => {
    if (!adyenData) return;

    const applePayConfiguration = {
      amount: {
        ...adyenData.amount,
      },
      countryCode: adyenData.countryCode,
    };

    const configuration = {
      clientKey: adyenData.client_key,
      merchantAccount: adyenData.merchantAccount,
      environment: adyenData.environment || "test",
      session: {
        id: adyenData.id,
        sessionData: adyenData.sessionData,
      },
      paymentMethodsConfiguration: {
        applepay: applePayConfiguration,
      },
      onAdditionalDetails: handleOnAdditionalDetails,
      onSubmit: handleOnSubmit,
      onSelect: handleOnChange,
      onchange: handleOnChange,
      onError(err: any) {
        console.error(err);
        console.error(err);
        if (err.name === "NETWORK_ERROR") {
          setIsError(true);
        } else {
          // adyenDropInRef.current?.update();
          getPaymentIntent();
        }
      },
      paymentMethods: adyenPaymentList?.paymentMethods || [],
    };

    const adyenInit = async () => {
      setAdyenLoader(true);
      const res = await AdyenCheckout(configuration);

      adyenDropInRef.current = res;

      if (paymentContainer.current) {
        res
          .create("dropin", {
            openFirstPaymentMethod: false,
          })
          .mount(paymentContainer.current);
      }
      res.update();
      setAdyenLoader(false);
    };

    adyenInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adyenData, adyenDropInRef, adyenPaymentList, handleOnChange]);

  if (iframeStatus === REJECTED || isError) {
    return <div>Something Went Wrong</div>;
  }

  const loader =
    cartSummaryLoader ||
    adyenLoader ||
    cartStatus === LOADING ||
    cartStatus === IDLE;

  return (
    <StyledDiv className="adyen-payment-continer">
      {loader && <KlarnaSkeletonLoader />}

      <div ref={paymentContainer} className={clsx({ disable: loader })} />
    </StyledDiv>
  );
};

export default Adyen;

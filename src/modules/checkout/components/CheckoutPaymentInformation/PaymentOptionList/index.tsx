import React from "react";

import { FormikProps } from "formik";
import { useRouter } from "next/navigation";

import {
  CheckoutFormType,
  PaymentMethodsType,
} from "@/checkout/types/checkout.types";
import useTranslations from "@/core/hooks/useTranslations";
import { getPostPaymentMode } from "@/checkout/services/checkout-service";
import toastAlert from "@/core/utils/toast";
import { setCartToken } from "@/cart/utils/cart-cookie";
import { getErrorFieldList } from "@/checkout/utils/get-error-field-list";
import { createOrderConfirmation } from "@/order/services/order-service";
import { ADYEN } from "@/checkout/constant/payment-mode.constant";
import Accordion from "@/core/components/Accordion";
import Button from "@/core/components/Button";
import { scrollToSection } from "@/core/utils/scroll";
import useHeaders from "@/core/hooks/useHeaders";
import useCheckout from "@/checkout/hooks/useCheckout";

import { AdyenDropInType, AdyenTypes } from "../../Adyen/adyen.types";
import Adyen from "../../Adyen";

import { StyledDiv } from "./style";

type Props = {
  paymentList: Array<PaymentMethodsType>;
  formik: FormikProps<CheckoutFormType>;
  adyenPaymentList: AdyenTypes;
};

const PaymentOptionList = ({
  paymentList,
  formik,
  adyenPaymentList,
}: Props) => {
  const [accordionActiveTitle, setAccordionActiveTitle] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [adyenLoader, setAdyenLoader] = React.useState(false);
  const [isPaymentError, setIsPaymentError] = React.useState(false);
  const [ispaymentInProgress, setIsPaymentInProgress] = React.useState(false);

  const { _t } = useTranslations();
  const { setPaymentType, cartSummaryLoader, cartSummary } = useCheckout();
  const { clientHeaders } = useHeaders();
  const router = useRouter();
  const adyenDropInRef = React.useRef<AdyenDropInType | null>(null);

  const handleOnChange = async (identifier: string) => {
    setIsPaymentError(false);
    if (identifier !== accordionActiveTitle) {
      setLoader(true);
      setAccordionActiveTitle(identifier);
      setPaymentType(identifier);
      adyenDropInRef.current?.update();
      await getPostPaymentMode(clientHeaders, identifier)
        .catch((err) => {
          toastAlert(err, "error");
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const handleCustomPayment = async () => {
    if (!cartSummary?.id) {
      toastAlert("Cart id not found", "custom-error");
      return;
    }

    const errorFieldList = getErrorFieldList(formik);

    if (errorFieldList.length) {
      formik.handleSubmit();
      scrollToSection("#checkout-form");
      return;
    }
    setLoader(true);
    await createOrderConfirmation(clientHeaders, cartSummary.id)
      .then(() => {
        setCartToken(cartSummary?.id);
        router.push(`/checkout/success`);
      })
      .catch((err) => {
        toastAlert(err, "error");
        setIsPaymentError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const paymentLoader = adyenLoader || cartSummaryLoader;
  return (
    <StyledDiv>
      <div className="title text-uppercase">
        <h6>
          <strong>{_t("payment_options", "Payment Options")}</strong>
        </h6>
      </div>

      {isPaymentError && (
        <div className="payment-error-wrapper">
          <strong>{_t("oh_no", "Oh no!")}</strong>{" "}
          <span>
            {_t(
              "payment_error",
              "Your payment failed. Please try again or select a different payment option. If the problem still persist please contact our customer service team."
            )}
          </span>
        </div>
      )}
      <Adyen
        formik={formik}
        adyenPaymentList={adyenPaymentList}
        adyenDropInRef={adyenDropInRef}
        setAccordinActiveTitle={setAccordionActiveTitle}
        adyenLoader={adyenLoader}
        setAdyenLoader={setAdyenLoader}
        setIsPaymentError={setIsPaymentError}
        setIsPaymentInProgress={setIsPaymentInProgress}
      />
      {!paymentLoader &&
        paymentList.map((item) => {
          if (item.identifier === ADYEN) return;
          return (
            <Accordion
              className="payment-opts"
              key={item.identifier}
              title={item.title}
              tag="h6"
              expanded={accordionActiveTitle === item.identifier}
              onChange={() => handleOnChange(item.identifier)}
              activeIcon="circle"
              disable={ispaymentInProgress}
            >
              <div className="option-contain">
                <Button
                  skin="dark"
                  variant="contained"
                  size="lg"
                  disabled={cartSummaryLoader}
                  isLoading={loader}
                  onClick={handleCustomPayment}
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </Accordion>
          );
        })}
    </StyledDiv>
  );
};

export default PaymentOptionList;

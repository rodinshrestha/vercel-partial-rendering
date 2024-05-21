import React from "react";

import { FormikProps } from "formik";
import clsx from "clsx";

import useTranslations from "@/core/hooks/useTranslations";
import Loader from "@/core/components/Loader";
import useCheckout from "@/checkout/hooks/useCheckout";

import {
  CheckoutFormType,
  ShippingMethodType,
} from "../../types/checkout.types";
import NshiftWidget from "../NshiftWidget";

import { StyledDiv } from "./style";

type Props = {
  formik: FormikProps<CheckoutFormType>;
  shippingMethod: Array<ShippingMethodType>;
};

const CheckoutDeliveryAddress = ({ formik, shippingMethod = [] }: Props) => {
  const [loader, setLoader] = React.useState(false);

  const { nShiftData, nShiftLoader } = useCheckout();

  const { _t } = useTranslations();

  return (
    <StyledDiv
      className={clsx("delivery-wrapper", {
        error: formik.touched.shipping_option && formik.errors.shipping_option,
      })}
    >
      {(loader || nShiftLoader) && (
        <div className="loader-container">
          <Loader color="primary" size="20px" />
        </div>
      )}

      <div className="delivery-option-wrapper mt-35">
        <div className="title text-uppercase">
          <h6>
            <strong>{_t("delivery_options", "Delivery Options")}</strong>
          </h6>
        </div>

        {/* {!!nShiftData?.options?.length && (
          <div className="delivery-notice text-center">
            <small>
              <strong>
                Shop for an additional SEK 101.60 for free shipping (value SEK
                49).
              </strong>
            </small>
          </div>
        )} */}

        <div className="delivery-option-list">
          {nShiftData?.options?.length ? (
            <NshiftWidget
              nShiftData={nShiftData}
              setLoader={setLoader}
              shippingMethiod={shippingMethod}
              formik={formik}
            />
          ) : (
            <p className="no-delivery-address-msg">
              {_t(
                "there_is_no_delivery_address_delivery_address_depends_upon_the_country_and_postal_code",
                "There is no delivery address. Delivery address depends upon the country and postal code"
              )}
            </p>
          )}
        </div>
      </div>
    </StyledDiv>
  );
};

export default CheckoutDeliveryAddress;

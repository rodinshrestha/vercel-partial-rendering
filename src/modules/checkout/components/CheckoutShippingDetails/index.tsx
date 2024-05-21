import React from "react";

import { FormikProps } from "formik";

import toastAlert from "@/core/utils/toast";
import SelectField from "@/core/components/FormField/SelectField";
import useTranslations from "@/core/hooks/useTranslations";
import Loader from "@/core/components/Loader";
import InputField from "@/core/components/FormField/InputField";
import { formatWithDynamicKey } from "@/core/utils/format";
import useHeaders from "@/core/hooks/useHeaders";
import useCheckout from "@/checkout/hooks/useCheckout";
import { publicAxios } from "@/core/utils/axios";
import useResolver from "@/core/hooks/useResolver";
import { AddressType } from "@/auth/types/user.types";
import PhoneField from "@/core/components/FormField/PhoneField";
import { useAuth } from "@/auth/hooks/useAuth";
import Link from "@/core/components/Link";

import {
  CheckoutFormType,
  CountriesTypes,
  ShippingMethodType,
} from "../../types/checkout.types";
import { postSaveShippingData } from "../../services/checkout-service";
import { convertServerError } from "../../utils/convert-server-error";
import { shouldHitShippingApi } from "../../utils/should-hit-shipping-api";

import { StyledDiv } from "./style";

type Props = {
  formik: FormikProps<CheckoutFormType>;
  countryList: Array<CountriesTypes>;
  shippingMethod: Array<ShippingMethodType>;
  shippingAddress: AddressType | null;
};

const CheckoutShippingDetails = ({
  formik,
  countryList,
  shippingAddress,
  shippingMethod,
}: Props) => {
  const [loader, setLoader] = React.useState(false);

  const { _t } = useTranslations();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | number>(0);
  const { clientHeaders } = useHeaders();
  const { getPaymentIntent, fetchNshiftData } = useCheckout();
  const nShiftWidgetRef = React.useRef<ReturnType<typeof setTimeout> | number>(
    0
  );
  const { channel } = useResolver();
  const { user } = useAuth();

  React.useEffect(() => {
    clearTimeout(timeoutRef.current);

    const toastId = "ShippingData";

    timeoutRef.current = setTimeout(() => {
      const { shipping } = formik.values;
      if (!shouldHitShippingApi(shipping)) return;

      setLoader(true);
      postSaveShippingData({ address: { shipping } }, clientHeaders)
        .then(() => {
          if (shippingAddress) return;

          const customerAddress = {
            ...shipping,
            default_shipping_address: 1,
            default_billing_address: 1,
            channel_id: channel?.id || "",
          };
          publicAxios.post("/sf/customer/addresses", customerAddress, {
            headers: clientHeaders,
          });
        })
        .catch((err) => {
          toastAlert(err, "error", toastId);
          formik.setErrors({
            shipping: { ...convertServerError(err) },
          });
        })
        .finally(() => {
          setLoader(false);
          getPaymentIntent();
        });
    }, 2e3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.shipping, clientHeaders]);

  const handleOnChange = (name: string, value: string) => {
    const { postal_code, country_code } = formik.values.shipping;
    clearTimeout(nShiftWidgetRef.current);

    /**
     * Need to fetch the data when there is postal code and country code
     * Nshift requires country code and postal code
     */
    const countryOrPostalName =
      name === "country_code" ? "postal_code" : "country_code";

    const countryOrPostalValue =
      name === "country_code" ? postal_code : country_code;

    if (!countryOrPostalValue || !value) return;

    //  Input name : shipping.['name']
    const [_, sanitizeName] = name.split(".");
    const body = {
      [countryOrPostalName]: countryOrPostalValue,
      [sanitizeName]: value,
    };
    nShiftWidgetRef.current = setTimeout(() => {
      fetchNshiftData(shippingMethod, body);
    }, 2e3);
  };

  return (
    <StyledDiv id="shipping-details-form">
      {loader && (
        <div className="loader-container">
          <Loader color="primary" />
        </div>
      )}

      <div className="form-title">
        <div className="title text-uppercase">
          <h6>
            <strong>{_t("your_details", "Your Details")}</strong>
          </h6>
        </div>
      </div>
      <div className="shipping-form">
        <div className="field-row">
          <div className="field-col col-6">
            <SelectField
              name="shipping.country_code"
              label={_t("country", "Country")}
              options={
                countryList?.length
                  ? formatWithDynamicKey(countryList, {
                      label: "name",
                      value: "iso_2_code",
                    })
                  : []
              }
              className="select-shiping"
              value={formik.values.shipping.country_code}
              onChange={(e) => {
                formik.setFieldValue("shipping.country_code", e.value);
                handleOnChange("shipping.country_code", e.value);
              }}
              onBlur={formik.handleBlur}
              touched={formik.touched?.shipping?.country_code}
              placeholder={_t("select_country", "Select Country")}
              error={Boolean(formik.errors.shipping?.country_code)}
              errorMsg={formik.errors.shipping?.country_code}
              disabled={countryList?.length <= 1}
            />
          </div>
          <div className="field-col col-6">
            <InputField
              name="shipping.email"
              label={_t("email", "Email")}
              type="email"
              placeholder={_t("email", "Email")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.shipping?.email}
              touched={formik.touched.shipping?.email}
              error={Boolean(formik.errors.shipping?.email)}
              errorMsg={formik.errors.shipping?.email}
            />
            {!user?.email && (
              <div className="email-info-wrapper">
                <span>
                  {_t(
                    "if_you_are_already_a_customer",
                    "If you are already a customer"
                  )}
                  ,
                </span>
                {"  "}
                <Link href="/login">{_t("log_in", "Log In")} </Link>
              </div>
            )}
          </div>
          <div className="field-col col-6">
            <InputField
              name="shipping.first_name"
              label={_t("first_name", "First Name")}
              type="text"
              placeholder={_t("first_name", "First Name")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shipping?.first_name}
              touched={formik.touched?.shipping?.first_name}
              error={Boolean(formik.errors.shipping?.first_name)}
              errorMsg={formik.errors?.shipping?.first_name}
            />
          </div>
          <div className="field-col col-6">
            <InputField
              name="shipping.last_name"
              label={_t("last_name", "Last Name")}
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={_t("last_name", "Last Name")}
              value={formik.values.shipping?.last_name}
              touched={formik.touched?.shipping?.last_name}
              error={Boolean(formik.errors.shipping?.last_name)}
              errorMsg={formik.errors?.shipping?.last_name}
            />
          </div>
          <div className="field-col col-6">
            <InputField
              name="shipping.postal_code"
              label={_t("postal_code", "Postal Code")}
              placeholder={_t("postal_code", "Postal Code")}
              onBlur={formik.handleBlur}
              value={formik.values.shipping?.postal_code}
              // onChange={formik.handleChange}
              onChange={(e) => {
                const { name, value } = e.target;
                handleOnChange(name, value);
                formik.handleChange(e);
              }}
              touched={formik.touched?.shipping?.postal_code}
              error={Boolean(formik.errors.shipping?.postal_code)}
              errorMsg={formik.errors?.shipping?.postal_code}
            />
          </div>
          <div className="field-col col-6">
            <InputField
              name="shipping.address1"
              label={_t("address", "Address")}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={_t("address", "Address")}
              value={formik.values.shipping?.address1}
              touched={formik.touched?.shipping?.address1}
              error={Boolean(formik.errors?.shipping?.address1)}
              errorMsg={formik.errors?.shipping?.address1}
            />
          </div>
          <div className="field-col col-6">
            <InputField
              name="shipping.city_name"
              label={_t("city", "City")}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={_t("city", "City")}
              value={formik.values.shipping?.city_name}
              touched={formik.touched.shipping?.city_name}
              error={Boolean(formik.errors.shipping?.city_name)}
              errorMsg={formik.errors?.shipping?.city_name}
            />
          </div>

          <div className="field-col col-6">
            <PhoneField
              label={_t("phone_number", "Phone Number")}
              placeholder={_t("phone_number", "Phone Number")}
              errorMsg={formik.errors?.shipping?.phone}
              touched={formik.touched?.shipping?.phone}
              error={Boolean(formik.errors.shipping?.phone)}
              value={formik.values.shipping?.phone}
              onBlur={() => formik.setFieldTouched("shipping.phone", true)}
              onChange={(value) =>
                formik.setFieldValue("shipping.phone", value)
              }
            />
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default CheckoutShippingDetails;

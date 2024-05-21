import React from "react";

import { FormikProps } from "formik";

import Radio from "@/core/components/FormField/Radio";
import useCheckout from "@/checkout/hooks/useCheckout";
import useHeaders from "@/core/hooks/useHeaders";
import toastAlert from "@/core/utils/toast";

import {
  CheckoutFormType,
  ShippingMethodType,
} from "../../types/checkout.types";
import { postSaveShippingMethod } from "../../services/checkout-service";

type Props = {
  formik: FormikProps<CheckoutFormType>;
  shippingMethods: Array<ShippingMethodType>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeliveryOptions = ({ shippingMethods, formik, setLoader }: Props) => {
  const { getCheckoutSummary } = useCheckout();
  const { clientHeaders } = useHeaders();

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const data = {
      shipping_option: value,
      selected_agent: "",
      selected_option: "",
    };

    formik.setFieldValue("shipping_option", data.shipping_option);
    setLoader(true);
    postSaveShippingMethod(data, clientHeaders)
      .then(() => {
        getCheckoutSummary();
      })
      .catch((err) => {
        formik.setFieldValue("shipping_option", "");
        toastAlert(err, "error");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div>
      {shippingMethods.map((method) => (
        <Radio
          className="delivery-opt-item"
          key={method.identifier}
          option={{ value: method.identifier, label: method.name }}
          id={method.identifier}
          name="delivery"
          onChange={handleDeliveryChange}
          rounded="50%"
        >
          <div className="delivery-info">
            <p className="delivery-price">{method.price}</p>
            <p className="delivery-description">{method.description}</p>
          </div>
        </Radio>
      ))}
    </div>
  );
};
export default DeliveryOptions;

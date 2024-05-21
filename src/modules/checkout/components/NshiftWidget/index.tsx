import React from "react";

import { FormikProps } from "formik";

import {
  CheckoutFormType,
  ShippingMethodType,
} from "@/checkout/types/checkout.types";
import useCheckout from "@/checkout/hooks/useCheckout";
import useHeaders from "@/core/hooks/useHeaders";
import { NshiftType } from "@/checkout/components/NshiftWidget/types/nshift.types";
import { postSaveShippingMethod } from "@/checkout/services/checkout-service";
import toastAlert from "@/core/utils/toast";
import { shippingAddressConversion } from "@/checkout/utils/shipping-address-conversion";

import { StyledDiv } from "./style";

type Props = {
  nShiftData: null | unknown;
  formik: FormikProps<CheckoutFormType>;
  shippingMethiod: Array<ShippingMethodType>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};
const NshiftWidget = ({
  nShiftData,
  shippingMethiod,
  formik,
  setLoader,
}: Props) => {
  const nShiftWidgetRef = React.useRef(null);
  const { getCheckoutSummary } = useCheckout();
  const { clientHeaders } = useHeaders();
  const { UnifaunCheckout = null } = window;

  const handleNshiftChange = (item: NshiftType) => {
    if (!item.valid) {
      formik.setFieldValue("shipping_option", "");
      return;
    }

    const data = shippingAddressConversion(shippingMethiod, item);

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

  React.useEffect(() => {
    if (!UnifaunCheckout || !nShiftData) return;

    const config = {
      useIcons: true,
      iconsInFront: true,
      iconsBaseUrl:
        "https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/logos",
      installCSS: "nshift-v2",
      enableMap: true,
      narrowDisplay: false,
      resultCallback: handleNshiftChange,
      preSelect: false,
    };
    const widget = UnifaunCheckout.createAt(nShiftWidgetRef.current, config);

    widget.updateList(nShiftData);
    widget.enable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nShiftData, UnifaunCheckout]);

  return <StyledDiv ref={nShiftWidgetRef} className="nshit-widget-container" />;
};

export default NshiftWidget;

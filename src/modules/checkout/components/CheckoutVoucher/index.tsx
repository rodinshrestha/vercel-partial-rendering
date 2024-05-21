import React from "react";

import { useFormik } from "formik";
import clsx from "clsx";

import useHeaders from "@/core/hooks/useHeaders";
import toastAlert from "@/core/utils/toast";
import useTranslations from "@/core/hooks/useTranslations";
import useCheckout from "@/checkout/hooks/useCheckout";
import { useAuth } from "@/auth/hooks/useAuth";
import InputField from "@/core/components/FormField/InputField";
import Button from "@/core/components/Button";
import useToggle from "@/core/hooks/useToggle";
import useCart from "@/cart/hooks/useCart";

import { applyCouponCode } from "../../services/checkout-service";
import { PromotionsType } from "../../types/promotion.types";

import { StyledDiv } from "./style";
import CouponCodeSelection from "./CouponCodeSelection";

type Props = {
  promotions: Array<PromotionsType>;
  couponCode: Array<string>;
  className?: string;
  callBackAfterQtyChange: () => void;
};

const CheckoutVoucher = ({
  couponCode,
  promotions,
  className,
  callBackAfterQtyChange,
}: Props) => {
  const [isCouponCodeApplied, setIsCouponCodeApplied] = React.useState(
    !!couponCode[0]
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [couponResetLoader, setCouponResetLoader] = React.useState(false);
  const { isOpen, setIsOpen } = useToggle();

  const { _t } = useTranslations();
  const { clientHeaders } = useHeaders();
  const { getCheckoutSummary } = useCheckout();
  const { user } = useAuth();
  const { fetchCartItems } = useCart();

  const handleApplyCoupon = async (code: string) => {
    try {
      setIsLoading(true);
      const resp = await applyCouponCode(clientHeaders, {
        coupon_code: code,
      });

      getCheckoutSummary().then(() => {
        callBackAfterQtyChange();
      });
      setIsCouponCodeApplied(true);
      toastAlert(resp.data.message, "success");
      setIsOpen(false);
      fetchCartItems();
    } catch (error) {
      toastAlert(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = async (code: string) => {
    try {
      setCouponResetLoader(true);
      await applyCouponCode(clientHeaders, {
        coupon_code: code,
        delete_flag: 1,
      });

      await getCheckoutSummary().then(() => {
        callBackAfterQtyChange();
      });
      toastAlert(
        _t("clear_the_coupon_code", "Clear the coupon code"),
        "success"
      );
      setIsCouponCodeApplied(false);
      formik.resetForm();
      fetchCartItems();
    } catch (error) {
      toastAlert(error, "error");
    } finally {
      setCouponResetLoader(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      code: couponCode[0] || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const { code } = values;
      if (!code) {
        throw new Error("Coupon code is missing");
      }
      handleApplyCoupon(code);
    },
  });

  return (
    <StyledDiv className={clsx(className, "coupon-block")}>
      {!isCouponCodeApplied ? (
        <span
          className="btn-discount-code"
          onClick={() => setIsCouponCodeApplied(true)}
        >
          {_t("add_discount_code", "Add Discount Code")}
        </span>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="add-discount-code-form">
            <div className="text-field">
              <InputField
                name="code"
                placeholder={_t("voucher", "Voucher")}
                value={formik.values.code}
                touched={formik.touched?.code}
                error={"code" in formik.errors}
                errorMsg={formik.errors?.code}
                onChange={formik.handleChange}
                disabled={!!couponCode?.length}
              />
            </div>
            {couponCode[0] ? (
              <Button
                skin="primary"
                variant="contained"
                disabled={!couponCode || isLoading}
                isLoading={isLoading}
                size="md"
                type="button"
                onClick={() => handleRemoveCoupon(formik.values.code)}
              >
                {_t("clear", "Clear")}
              </Button>
            ) : (
              <Button
                skin="primary"
                variant="contained"
                isLoading={isLoading}
                disabled={!formik.values.code || isLoading}
                size="md"
              >
                {_t("add", "Add")}
              </Button>
            )}
          </div>
        </form>
      )}

      {!!promotions?.length && user?.email && (
        <CouponCodeSelection
          promotions={promotions}
          handleApplyCoupon={handleApplyCoupon}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
          formik={formik}
          couponCode={couponCode}
          handleRemoveCoupon={handleRemoveCoupon}
          couponResetLoader={couponResetLoader}
        />
      )}
    </StyledDiv>
  );
};

export default CheckoutVoucher;

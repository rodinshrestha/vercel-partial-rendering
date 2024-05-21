import React from "react";

import clsx from "clsx";

import { PriceInCart } from "@/cart/types/cart.types";
import useTranslations from "@/core/hooks/useTranslations";
import { LoaderContainerStyle } from "@/cart/components/CartItem/style";
import useCheckout from "@/checkout/hooks/useCheckout";

import { SummaryWrap } from "./style";

type Props = {
  summaryObj?: PriceInCart;
  className?: string;
};

const CheckoutSummary = ({ summaryObj, className }: Props) => {
  const { cartSummaryLoader } = useCheckout();
  const { _t } = useTranslations();

  return (
    <SummaryWrap className={clsx(className, "summary-wrap")}>
      {cartSummaryLoader && <LoaderContainerStyle className="loader" />}
      <h6 className="content-title text-uppercase">
        <strong>{_t("amount", "Amount")}</strong>
      </h6>
      <div className="summary-list">
        <div className="summary-item">
          <span className="item-title">{_t("amount", "Amount")}</span>
          <span className="item-price">
            {summaryObj?.sub_total_inc_tax_formatted}
          </span>
        </div>
        <div className="summary-item">
          <span className="item-title"> {_t("vat", "Vat")}</span>
          <span className="item-price">
            {summaryObj?.total_tax_amount_formatted}
          </span>
        </div>
        <div className="summary-item">
          <span className="item-title">{_t("shipping", "Shipping")}</span>
          <span className="item-price">
            {summaryObj?.shipping_inc_tax_formatted}
          </span>
        </div>
      </div>
      <div className="total-summary">
        {Number(summaryObj?.discount_amount) > 0 ? (
          <div className="summary-item discount-price">
            <span className="item-title">
              {_t("total_discount", "Total Discount")}
            </span>
            <span className="item-price">
              {summaryObj?.discount_amount_formatted}
            </span>
          </div>
        ) : null}
        <div className="summary-item total-price">
          <span className="item-title">{_t("total", "Total ")}</span>
          <span className="item-price">
            {summaryObj?.grand_total_formatted}
          </span>
        </div>
      </div>
    </SummaryWrap>
  );
};

export default CheckoutSummary;

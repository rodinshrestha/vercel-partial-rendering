import { rem, transparentize } from "polished";
import styled from "styled-components";
import { css } from "styled-components";

import useTranslations from "@/core/hooks/useTranslations";
import useCart from "@/cart/hooks/useCart";
import Button from "@/core/components/Button";

import { getCheckoutUrl } from "../utils/get-checkout-url";

export const Cartfooter = () => {
  const { _t } = useTranslations();
  const { cartList } = useCart();

  const shouldProceedToCheckout = cartList?.items.every(
    (item) => item.proceed_to_checkout
  );

  const couponCode = cartList?.coupon_code?.join(",");

  //TODO: Needs to rework in this.. its not working as expected
  const hasOutOfStock =
    cartList?.items?.some(
      (x) => !x.product.is_in_stock || x.qty > Number(x.product.quantity)
    ) || false;

  return (
    <StyledFooter>
      <div className="footer-cart-content">
        <div className="footer-title text-uppercase">
          <h6>
            <strong>{_t("amount", "Amount")}</strong>
          </h6>
        </div>
        <div className="footer-cart-info">
          <span className="prs-title">{_t("amount", "Amount")}</span>
          <span className="price">
            {cartList?.price_format.final_price.sub_total_inc_tax_formatted}
          </span>
        </div>
        <div className="footer-cart-info">
          <span className="prs-title">{_t("shipping", "Shipping")}</span>
          {/* <p>{_t('TOTAL_TO_PAY', 'To Pay')}</p> */}
          <span className="price">
            {cartList?.price_format.final_price.shipping_inc_tax_formatted}
          </span>
        </div>
        <div className="footer-cart-info color-red">
          <span className="prs-title">
            {_t("total_discount", "Total Discount")}
          </span>
          <span className="price">
            {cartList?.price_format.final_price.discount_amount_formatted}
          </span>
        </div>
        {Boolean(couponCode) && (
          <div className="footer-cart-info color-gray">
            <span>{_t("applied_coupon", "Applied Coupon")}</span>
            <span className="coupon">{couponCode}</span>
          </div>
        )}
        {/* <div className="footer-cart-info"> */}
        {/* <span className="prs-title">
            {_t('shopping_cart', 'Shopping Cart')}
          </span> */}
        {/* <p>{_t('TOTAL_TO_PAY', 'To Pay')}</p> */}
        {/* <span className="price">
            {cartList?.price_format.final_price.grand_total_formatted}
          </span> */}
        {/* </div> */}
      </div>
      <div className="total-prs">
        <h6 className="prs-title">
          <strong>{_t("total", "Total")}</strong>
        </h6>
        <h6 className="price">
          <strong>
            {cartList?.price_format.final_price.grand_total_formatted}
          </strong>
        </h6>
      </div>
      <div className="footer-btn">
        <Button
          fullWidth
          variant="contained"
          skin="primary"
          disabled={!shouldProceedToCheckout}
          href={`/${getCheckoutUrl(hasOutOfStock)}`}
        >
          {_t("proceed_to_checkout", "Proceed To Checkout")}
        </Button>
        <Button
          className="continue-btn"
          variant="transparent"
          skin="secondary"
          href="/"
        >
          {_t("continue_shopping", "Continue shopping")}
        </Button>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  ${({ theme }) => css`
    ${theme.fontFamily.light}
    padding: ${rem(15)} 0;
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    letter-spacing: ${rem(1.4)};

    .footer-cart-content {
      margin-bottom: ${rem(12)};
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      row-gap: ${rem(5)};

      .footer-title {
        margin-bottom: ${rem(10)};
      }

      .footer-cart-info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        span {
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
        }

        &.color-red {
          color: ${theme.coreColor.danger.default.background};
        }
      }
    }

    .total-prs {
      border-top: 1px solid ${transparentize(0.85, theme.color.grey[1000])};
      padding: ${rem(15)} 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-transform: uppercase;
    }

    .footer-btn {
      margin-top: ${rem(10)};

      .continue-btn {
        margin-top: ${rem(15)};
        text-align: center;

        a {
          font-size: ${rem(10)};
          line-height: ${rem(12)};
          letter-spacing: ${rem(1)};
          text-decoration: underline;
          ${theme.fontFamily.regular}
        }
      }
    }
  `}
`;

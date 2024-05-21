"use client";
import React from "react";

import styled, { css } from "styled-components";
import { rem, transparentize } from "polished";

import useTranslations from "@/core/hooks/useTranslations";
import { IDLE, PENDING, REJECTED, RESOLVED } from "@/core/constants/states";
import Loader from "@/core/components/Loader";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import Button from "@/core/components/Button";
import CheckoutSummary from "@/checkout/components/CheckoutSummary";

import { CartItem } from "./components/CartItem";
import { checkErrorInCart } from "./utils/check-error-in-cart";
import EmptyItems from "./components/EmptyItems";
import useCart from "./hooks/useCart";
import InvalidCartItem from "./components/InvalidCartItem";

const CartModule = () => {
  const { _t } = useTranslations();
  const { cartList, cartStatus } = useCart();

  const isError = checkErrorInCart(cartList);

  const shouldProceedToCheckout = cartList?.items.every(
    (item) => item.proceed_to_checkout
  );

  const cartLoader = cartStatus === IDLE || cartStatus === PENDING;

  const initialPageLoader = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (cartStatus === RESOLVED || cartStatus === REJECTED) {
      initialPageLoader.current = false;
    }
  }, [cartStatus]);

  const emptyCart = {
    title: "You don't have any items in your Cart",
    content: " to continue shopping.",
    button: {
      button_label: _t("continue_shopping", "Continue Shopping"),
      button_url: "/",
    },
  };

  if (initialPageLoader.current && cartLoader)
    return (
      <LoaderContainer>
        <Loader type="spinner" color="primary" size="20px" />
      </LoaderContainer>
    );

  return (
    <>
      <CartSection className="pt-35">
        <Container>
          <Row>
            <Col>
              <div className="cart-header">
                <h1 className="h2 page-title text-center text-uppercase">
                  <strong> {_t("cart", "Cart")}</strong>
                </h1>
              </div>
            </Col>
          </Row>
          {!shouldProceedToCheckout && cartList?.items ? (
            <Row>
              <Col lg={8} className="m-auto">
                <InvalidCartItem items={cartList?.items || []} />
              </Col>
            </Row>
          ) : null}

          {cartList?.items ? (
            <Row>
              <Col lg={8} className="m-auto">
                <Cartwrap>
                  <div className="cart-boby">
                    <div className="cart-item-wrap">
                      {cartList?.items.map((x, i) => {
                        return <CartItem item={x} key={i} />;
                      })}
                    </div>
                  </div>

                  <div className="cart-footer">
                    <CheckoutSummary
                      className="cart-summary"
                      summaryObj={cartList?.price_format?.final_price}
                    />

                    <div className="btn-wrap">
                      <Button
                        skin="primary"
                        variant="contained"
                        type="button"
                        href={`/checkout`}
                        disabled={isError || !shouldProceedToCheckout}
                        fullWidth
                      >
                        {_t("proceed_to_checkout", "Proceed To Checkout")}
                        <i className="icon-right_arrow" />
                      </Button>
                    </div>
                  </div>
                </Cartwrap>
              </Col>
            </Row>
          ) : (
            <Row className="no-gutters row-reverse">
              <Col md={8} className="m-auto">
                <EmptyItems data={emptyCart} classNames="pt-150 pb-150" />
              </Col>
            </Row>
          )}
          {/* </Col>
          </Row> */}
        </Container>
      </CartSection>
    </>
  );
};

export default CartModule;

const CartSection = styled.section`
  ${({ theme }) => css`
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.7973564425770308) 45%,
      rgba(255, 255, 255, 0) 81%
    );

    .page-title {
      text-align: center;
      margin-bottom: ${rem(20)};
      padding: ${rem(20)};
      border-bottom: 1px solid ${transparentize(0.7, theme.color.grey[900])};
      width: 100vw;
      margin-left: calc(50% - 50vw);
      margin-right: calc(50% - 50vw);
    }
  `}
`;

const Cartwrap = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: 720px;
    margin: 0 auto;
    height: calc(100vh - 110px - 130px);

    .cart-boby {
      overflow: hidden auto;
      scroll-behavior: smooth;
      max-height: 50vh;
      padding-top: ${rem(10)};

      .cart-item-wrap {
        padding: 0 ${rem(20)};
        margin-bottom: ${rem(35)};

        .cart-item {
          & + .cart-item {
            border-top: 1px solid ${transparentize(0, theme.color.grey[900])};
          }
        }
      }
    }

    .cart-footer {
      padding: ${rem(20)};

      .cart-summary {
        border-top: 1px solid ${theme.color.grey[900]};
        padding-top: ${rem(20)};

        .summary-list,
        .total-summary {
          margin-left: auto;
          max-width: 300px;

          .summary-item {
            padding: 0;
          }
        }
      }

      .btn-wrap {
        margin-top: ${rem(20)};
        justify-content: flex-end;
        display: flex;
        flex-wrap: wrap;

        .link-btn,
        button {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
    }
  `}
`;

const LoaderContainer = styled.div`
  height: 80vh;
  position: relative;
`;

"use client";
import React from "react";

import { format } from "date-fns";

import { OrderSummaryType } from "@/order/types/order-summary.types";
import { LoadingStates } from "@/core/types/loading.types";
import { LOADING, REJECTED, RESOLVED } from "@/core/constants/states";
import useTranslations from "@/core/hooks/useTranslations";
import useCart from "@/cart/hooks/useCart";
import { getCartToken, removeCartToken } from "@/cart/utils/cart-cookie";
import { getOrderConfirmation } from "@/order/services/order-service";
import toastAlert from "@/core/utils/toast";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import Button from "@/core/components/Button";
import Accordion from "@/core/components/Accordion";
import FullPageLoader from "@/core/components/Loader/FullPageLoader";
import useHeaders from "@/core/hooks/useHeaders";
import { useAuth } from "@/auth/hooks/useAuth";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";

import PriceSummary from "../PriceSummary";

import {
  SucessAccordionWrapper,
  OrderDetailsButton,
  StyleOrderItem,
  StyledSection,
} from "./style";

const OrderSummary = () => {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(true);
  const isMobile = useMediaQuery(breakPoints.mobile);
  const [orderSummary, setOrderSummary] =
    React.useState<OrderSummaryType | null>(null);
  const [status, setStatus] = React.useState<LoadingStates>(LOADING);
  const { user } = useAuth();

  const { _t } = useTranslations();
  const { setCartList } = useCart();
  const { clientHeaders } = useHeaders();

  React.useEffect(() => {
    const cartId = getCartToken();
    getOrderConfirmation(clientHeaders, cartId)
      .then((res) => {
        setOrderSummary(res.data.data);
        removeCartToken();
        setStatus(RESOLVED);
        setCartList(null);
      })
      .catch((err) => {
        setStatus(REJECTED);
        toastAlert(err, "error");
      });
  }, [clientHeaders, setCartList]);

  if (status === LOADING) {
    return <FullPageLoader />;
  }

  const title = [
    _t("products", "Products"),
    !isMobile && _t("article_number", "Article Number"),
    !isMobile && _t("quantity", "Quantity"),
    _t("sub_total", "Sub Total"),
  ];

  return (
    <>
      <StyledSection className="pt-75 pb-75">
        <Container fluid className="p-0">
          <Row className="no-gutters">
            <Col md={8} lg={6} xl={5} className="m-auto">
              <div className="sucess-header">
                <div className="title-block">
                  <h1 className="h3">
                    {_t("thanks_for_your_order", "Thanks For Your Order")}
                  </h1>
                  <p className="order-id">
                    <strong> {_t("order_number", "Order Number")}: </strong>
                    {orderSummary?.increment_id}
                  </p>
                </div>

                <div className="order-id detail-content">
                  <p>
                    {_t(
                      "a_confirmation_email_has_been_sent_to",
                      "A confirmation email has been sent to"
                    )}
                    : <strong>{orderSummary?.customer_email}</strong>
                  </p>

                  <p>
                    {_t("your_order", "Your order")} #
                    {orderSummary?.increment_id}
                    {_t(
                      "has_been_placed_and_will_be_sent_a_confirmation_email_has_been_sent_to_your_email_address",
                      "has been placed and will be sent, a confirmation email has been sent to your email address"
                    )}{" "}
                    {orderSummary?.order_metas?.contact?.email ||
                      orderSummary?.customer_email ||
                      orderSummary?.shipping_information?.email}
                  </p>

                  <OrderDetailsButton>
                    <Button
                      skin="primary"
                      variant="contained"
                      size="lg"
                      href="/"
                    >
                      {_t("continue_shopping", "Continue Shopping")}
                    </Button>
                    {Boolean(user) && (
                      <Button
                        skin="body"
                        variant="contained"
                        size="lg"
                        href={`/account/orders`}
                      >
                        {_t("to_my_orders", "To my orders")}
                        <i className="icon-right_arrow" />
                      </Button>
                    )}
                  </OrderDetailsButton>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </StyledSection>

      <SucessAccordionWrapper
        className="order-cart pt-35 pb-50"
        id="order-sucess-detail"
      >
        <Container>
          <Row>
            <Col className="mx-auto" md={11} xl={8}>
              <Accordion
                className="order-accordion"
                title={_t("my_orders", "My Orders")}
                tag="h5"
                expanded={isAccordionOpen}
                onChange={() => setIsAccordionOpen((prev) => !prev)}
              >
                <div className="accordion-contain-wrap">
                  <span className="date small">
                    {orderSummary?.created_at
                      ? format(new Date(orderSummary.created_at), "yyyy-MM-dd")
                      : null}
                  </span>
                  <div className="status-wrap">
                    <p>
                      <strong>{_t("status", "Status")}:</strong>
                      {orderSummary?.status}
                    </p>
                    {/* <Button skin="primary" variant="transparent" href="/">
                      Save
                    </Button> */}
                  </div>
                  <p>
                    <strong>{_t("order_number", "Order Number")}:</strong>
                    {orderSummary?.increment_id}
                  </p>

                  <StyleOrderItem className="item-table">
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            {title.map((el, i) => (
                              <th className="title" key={i}>
                                {el}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {orderSummary?.order_items.map((el, i) => (
                            <tr key={i} className="order-items">
                              <td className="product-item">
                                {el.product_data?.name}
                                {el?.product_data?.sku && isMobile && (
                                  <span>{el.product_data.sku}</span>
                                )}
                              </td>
                              <td className="article-number-items">
                                {!isMobile &&
                                  el?.product_data?.sku &&
                                  el.product_data.sku}
                              </td>
                              <td> {!isMobile && `${el.qty} st`}</td>
                              <td className="sub-total-item">{el.sub_total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="total-order-wrapper">
                      <PriceSummary orderSummary={orderSummary} />
                    </div>
                  </StyleOrderItem>
                </div>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </SucessAccordionWrapper>
    </>
  );
};

export default OrderSummary;

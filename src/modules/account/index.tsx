"use client";
import React from "react";

import { useSelectedLayoutSegment, useParams } from "next/navigation";

import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import SideBar from "@/core/components/SideBar";
import { BreadCrumb } from "@/core/components/BreadCrumb";
import useTranslations from "@/core/hooks/useTranslations";
import Button from "@/core/components/Button";
import { IconArrowRight } from "@/core/components/Icons";

import { ContentArea, StyledSection } from "./style";
import { accountRoute } from "./constants/route";

type Props = {
  children: React.ReactNode;
};

const Account = ({ children }: Props) => {
  const layout = useSelectedLayoutSegment();
  const { _t } = useTranslations();
  const params = useParams();

  const layoutHeadingResolver = {
    "my-profile": _t("my_profile", "My Profile"),
    address: _t("my_address", "My Address"),
    "my-favourite": _t("my_favourites", "My Favourites"),
    orders: _t("my_orders", "My Orders"),
  };
  const title =
    layoutHeadingResolver[layout as keyof typeof layoutHeadingResolver];

  const crumbs = [
    {
      link: "/",
      title: "Home",
    },
    {
      title: title,
    },
  ];
  const { orderId = "" } = params || {};

  return (
    <StyledSection className="pb-75">
      <Container fluid>
        <Row>
          <Col>
            <BreadCrumb crumbs={crumbs} />
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto">
            <div className="page-title text-center text-uppercase mb-30 mt-35">
              {orderId && (
                <div className="back-btn-wrapper">
                  <Button
                    skin="primary"
                    variant="transparent"
                    href="/account/orders"
                  >
                    {/* {_t('back', 'Back')} */}
                    <IconArrowRight size={22} />
                  </Button>
                </div>
              )}

              <h1 className="h3">
                <strong id="page-title-text">{orderId ? "" : title}</strong>
              </h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3} xl={2}>
            <SideBar route={accountRoute(_t)} />
          </Col>
          <Col lg={9} xl={10}>
            <ContentArea>{children}</ContentArea>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default Account;

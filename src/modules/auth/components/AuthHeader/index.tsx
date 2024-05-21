"use client";
import React from "react";

import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import Button from "@/core/components/Button";
// import BrandLogo from '@/core/components/Header/components/BrandLogo';

import { StyledDiv } from "./style";

const AuthHeader = () => {
  return (
    <StyledDiv>
      <Container fluid className="p-0">
        <Row noGutter>
          <Col>
            <div className="header-wrap">
              <Button skin="light" variant="contained" size={"sm"} href="/">
                <i className="icon-left_arrow" />
              </Button>
              <div className="logo">{/* <BrandLogo /> */}</div>
              <div />
            </div>
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  );
};

export default AuthHeader;

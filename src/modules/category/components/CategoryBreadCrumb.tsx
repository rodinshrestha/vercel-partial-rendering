"use client";
import React from "react";

import styled, { css } from "styled-components";

import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import { BreadCrumb } from "@/core/components/BreadCrumb";
import { getCategoryCrumbs } from "@/category/utils/get-category-crumbs";

import { CategoryDataTypes } from "../types/category.types";

const CategoryBreadCrumb = ({ data }: { data: CategoryDataTypes }) => {
  if (!data?.breadcrumbs?.length) return;
  const { breadcrumbs } = data;

  return (
    <StyledDiv>
      <Container fluid>
        <Row>
          <Col>
            <BreadCrumb crumbs={getCategoryCrumbs(breadcrumbs)} />
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  );
};

export default CategoryBreadCrumb;

const StyledDiv = styled.div`
  ${() => css``}
`;

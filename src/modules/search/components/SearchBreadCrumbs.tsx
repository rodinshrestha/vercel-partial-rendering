import React from "react";

import styled, { css } from "styled-components";

import { PageProps } from "@/core/types/page-props.types";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import { BreadCrumb } from "@/core/components/BreadCrumb";
import useTranslations from "@/core/hooks/useTranslations";

type Props = {
  searchParams: PageProps["searchParams"];
};

const SearchBreadCrumbs = ({ searchParams }: Props) => {
  const { q = "" } = searchParams || {};
  const { _t } = useTranslations();

  const crumb = [
    {
      title: _t("home", "Home"),
      link: "/",
    },
    {
      title: (q as string) || _t("search", "Search"),
    },
  ];
  return (
    <StyledDiv>
      <Container fluid>
        <Row>
          <Col>
            <BreadCrumb crumbs={crumb} />
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  );
};

export default SearchBreadCrumbs;

const StyledDiv = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.color.white[1000]};
  `}
`;

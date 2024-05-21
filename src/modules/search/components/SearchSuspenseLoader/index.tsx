"use client";
import React from "react";

import Loader from "@/core/components/Loader";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import useTranslations from "@/core/hooks/useTranslations";
import { PageProps } from "@/core/types/page-props.types";

import { SearchTitle } from "../SearchPage/style";
import SearchBreadCrumbs from "../SearchBreadCrumbs";

import { StyledDiv } from "./style";

const SearchSuspenseLoader = ({
  searchParams,
}: Pick<PageProps, "searchParams">) => {
  const { _t } = useTranslations();
  return (
    <>
      <SearchBreadCrumbs searchParams={searchParams} />
      <SearchTitle className="pt-50 pb-50">
        <Container fluid>
          <Row>
            <Col md={8} className="mx-auto">
              <div className="category-title text-center text-uppercase">
                <h1 className="h4">
                  {_t("search_results_for", "Search results for")}:{" "}
                  {searchParams?.q || ""}
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </SearchTitle>
      <StyledDiv>
        <Loader type="spinner" color="primary" size="20px" />
      </StyledDiv>
    </>
  );
};

export default SearchSuspenseLoader;

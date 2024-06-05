"use client";
import React from "react";

import clsx from "clsx";

import { PageProps } from "@/core/types/page-props.types";
import useTranslations from "@/core/hooks/useTranslations";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import { StyledProductItemWrap } from "@/product/components/Card/ProductLayout";
import {
  FilterAttributeType,
  SelectedFilterAttributeType,
} from "@/category/types/category.types";
import { initializeCategoryFilter } from "@/category/utils/category-filter";
import { SearchType } from "@/search/types/search.types";
import ProductItem from "@/product/components/Card/ProductItem";
import CategoryFilter from "@/category/components/CategoryFilter";
import Pagination from "@/core/components/Pagination";
import { SEARCH_PAGINATION_LIMIT } from "@/search/constants/search-page-pagination-limit";
import { ProfileUser } from "@/auth/types/user.types";

import SearchNotFound from "../SearchNotFound";

import { CustomColWrap, StyledSection } from "./style";

type Props = {
  searchParams: PageProps["searchParams"];
  filterdData: SearchType | null;
  filterAttributes: Array<FilterAttributeType>;
  user: ProfileUser | null;
};
const SearchPage = ({
  searchParams,
  filterdData,
  filterAttributes,
  user,
}: Props) => {
  const [data, setData] = React.useState<SearchType>(filterdData);

  // const [loader, setLoader] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { q, ...restSearchParams } = searchParams;

  const paginationLimit = React.useMemo(() => {
    return filterdData?.products.limit;
  }, [filterdData?.products.limit]);

  // const isTab = useMediaQuery(breakPoints.tab);
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  const [selectedFilterAttribute, setSelectedFilterAttributes] =
    React.useState<SelectedFilterAttributeType>(
      initializeCategoryFilter(searchParams)
    );

  React.useEffect(() => {
    setSelectedFilterAttributes(initializeCategoryFilter(searchParams));
  }, [searchParams]);

  React.useEffect(() => {
    setData(filterdData);
  }, [filterdData]);

  const { _t } = useTranslations();

  const hideFilter = Boolean(
    !data?.products?.data?.length && !Object.entries(restSearchParams).length
  );
  return (
    <StyledSection className="pt-50 pb-120" id="search-list-id">
      <Container fluid>
        <Row>
          {!!filterAttributes?.length && searchParams?.q && !hideFilter && (
            <Col>
              <CategoryFilter
                data={(data?.products as any) || []}
                filterAttributes={filterAttributes}
                setSelectedFilterAttributes={setSelectedFilterAttributes}
                selectedFilterAttribute={selectedFilterAttribute}
                productLength={data?.products?.total || 0}
                setIsFilterOpen={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
                searchParams={searchParams}
              />
            </Col>
          )}
          {searchParams?.q ? (
            <Col>
              <CustomColWrap
                className={clsx({ "custom-col-wrap ml-auto": isFilterOpen })}
              >
                <div className="tab-content">
                  <div className="product-list-wrapper">
                    {data?.products.data.length ? (
                      data.products.data.map((el, index) => (
                        <StyledProductItemWrap
                          className={clsx("b2b-item-wrap", {
                            "custom-col b2b-custom-col": isFilterOpen,
                          })}
                          key={index}
                        >
                          <ProductItem product={el} user={user} />
                        </StyledProductItemWrap>
                      ))
                    ) : (
                      <SearchNotFound />
                    )}
                  </div>
                  {!!data?.products.data.length && (
                    <Pagination
                      paginationName={_t("products", "Products")}
                      searchParams={searchParams}
                      length={data.products?.last_page}
                      showPerPageData={data.products?.data.length}
                      totalData={data.products?.total}
                      paginationLimit={
                        paginationLimit || SEARCH_PAGINATION_LIMIT
                      }
                      query="page"
                      scrollToSectionId="#search-list-id"
                    />
                  )}
                </div>
              </CustomColWrap>
            </Col>
          ) : (
            <SearchNotFound />
          )}
        </Row>
      </Container>
    </StyledSection>
  );
};

export default SearchPage;

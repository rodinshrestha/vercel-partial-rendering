"use client";
import React from "react";

import clsx from "clsx";

import {
  CategoryDataTypes,
  CategoryProductTypes,
  FilterAttributeType,
  SelectedFilterAttributeType,
} from "@/category/types/category.types";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import CategoryProductList from "@/category/components/CategorySingleLayout/CategorySingleProductList";
import { initializeCategoryFilter } from "@/category/utils/category-filter";
import { CustomColWrap } from "@/search/components/SearchPage/style";
import CategoryFilter from "@/category/components/CategoryFilter";
import Pagination from "@/core/components/Pagination";
import { CATEGORY_PAGINATION_LIMIT } from "@/category/constants/category-pagation-limit";
import useTranslations from "@/core/hooks/useTranslations";
import NoProductFound from "@/core/components/NoProductFound";
import { ProfileUser } from "@/auth/types/user.types";

import { StyledSection } from "./style";

type Props = {
  data: CategoryDataTypes;
  filterAttributes: Array<FilterAttributeType>;
  searchParams: { [key: string]: string };
  loader: boolean;
  categoryProducts: CategoryProductTypes | null;
  user: ProfileUser | null;
};

const CategorySingleLayout = ({
  data,
  filterAttributes,
  searchParams,
  loader,
  categoryProducts,
  user,
}: Props) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  const [selectedFilterAttribute, setSelectedFilterAttributes] =
    React.useState<SelectedFilterAttributeType>(
      initializeCategoryFilter(searchParams)
    );
  const { _t } = useTranslations();

  React.useEffect(() => {
    setSelectedFilterAttributes(initializeCategoryFilter(searchParams));
  }, [searchParams]);

  const hideFilter = Boolean(
    (!categoryProducts?.data?.length && !Object.entries(searchParams).length) ||
      !filterAttributes?.length
  );
  return (
    <StyledSection className="pt-50 pb-50" id="category_list_id">
      <Container fluid>
        <Row>
          {!hideFilter && (
            <Col>
              <CategoryFilter
                data={data}
                filterAttributes={filterAttributes}
                setSelectedFilterAttributes={setSelectedFilterAttributes}
                selectedFilterAttribute={selectedFilterAttribute}
                productLength={categoryProducts?.total || 0}
                setIsFilterOpen={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
                searchParams={searchParams}
              />
            </Col>
          )}
          <Col>
            <CustomColWrap
              className={clsx({ "custom-col-wrap ml-auto": isFilterOpen })}
            >
              <CategoryProductList
                className={clsx({ "custom-col": isFilterOpen })}
                categoryProducts={categoryProducts}
                user={user}
              />
              {categoryProducts?.data?.length ? (
                <Pagination
                  paginationName={_t("products", "Products")}
                  searchParams={searchParams}
                  length={categoryProducts?.last_page}
                  showPerPageData={categoryProducts.data.length}
                  totalData={categoryProducts?.total}
                  paginationLimit={CATEGORY_PAGINATION_LIMIT}
                  query="page"
                  loader={loader}
                  scrollToSectionId="#category_list_id"
                />
              ) : null}
            </CustomColWrap>
            {!categoryProducts?.data?.length && !loader && <NoProductFound />}
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default CategorySingleLayout;

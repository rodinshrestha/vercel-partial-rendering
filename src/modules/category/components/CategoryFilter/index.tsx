import React from "react";

import clsx from "clsx";

import {
  CategoryDataTypes,
  FilterAttributeType,
  SelectedFilterAttributeType,
} from "@/category/types/category.types";
import DropDownWrapper from "@/core/components/DropDownWrapper";
import useTranslations from "@/core/hooks/useTranslations";
import Drawer from "@/core/components/Drawer";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";
import { PageProps } from "@/core/types/page-props.types";
import { sortByData } from "@/category/constants/sort_by";
import { IconMinus, IconPlus } from "@/core/components/Icons";

import FilterAttributes from "../FilterAttributes";

import CategorySortBy from "./CategorySortBy";
import { StyledDiv, StyledHeaderDiv } from "./style";

type Props = {
  data: CategoryDataTypes;
  filterAttributes: Array<FilterAttributeType>;
  setSelectedFilterAttributes: React.Dispatch<
    React.SetStateAction<SelectedFilterAttributeType>
  >;
  selectedFilterAttribute: SelectedFilterAttributeType;
  productLength: number;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpen: boolean;
  searchParams: PageProps["searchParams"];
};

const CategoryFilter = ({
  data,
  filterAttributes,
  setSelectedFilterAttributes,
  selectedFilterAttribute,
  productLength,
  setIsFilterOpen,
  isFilterOpen,
  searchParams,
}: Props) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const filterHeaderRef = React.useRef<HTMLDivElement>(null);
  const isTab = useMediaQuery(breakPoints.tab);
  const { _t } = useTranslations();

  return (
    <>
      <StyledDiv className="filter-section">
        <div className="filter-opt-wrap wrap-col">
          {isTab && (
            <DropDownWrapper
              header={
                <DropDownHeader
                  isOpen={isFilterOpen}
                  setIsOpen={setIsFilterOpen}
                  reference={filterHeaderRef}
                  productLength={productLength}
                />
              }
              isOpen={isFilterOpen}
            >
              {!isTab && (
                <FilterAttributes
                  onClose={() => setIsFilterOpen(false)}
                  subCategories={data.sub_categories as any}
                  filterHeaderRef={filterHeaderRef}
                  filterAttributes={filterAttributes}
                  setSelectedFilterAttributes={setSelectedFilterAttributes}
                  selectedFilterAttribute={selectedFilterAttribute}
                  searchParams={searchParams}
                  productLength={productLength}
                />
              )}
            </DropDownWrapper>
          )}
          {!isTab && (
            <FilterAttributes
              onClose={() => setIsFilterOpen(false)}
              subCategories={data.sub_categories as any}
              filterHeaderRef={filterHeaderRef}
              filterAttributes={filterAttributes}
              setSelectedFilterAttributes={setSelectedFilterAttributes}
              selectedFilterAttribute={selectedFilterAttribute}
              searchParams={searchParams}
              productLength={productLength}
            />
          )}
        </div>

        <div className="filter-sort-by wrap-col">
          {sortByData(_t).map((item) => {
            return (
              <CategorySortBy
                options={item.options}
                setSelectedFilterAttributes={setSelectedFilterAttributes}
                selectedFilterAttribute={selectedFilterAttribute}
                searchParams={searchParams}
                key={item.slug}
              />
            );
          })}
        </div>
      </StyledDiv>

      {isTab && (
        <Drawer
          title="Filter"
          open={isFilterOpen}
          position="left"
          onClose={() => setIsFilterOpen(false)}
          width="100%"
          drawerZindex={6}
          overlayZindex={6}
          className="filter-drawer"
        >
          <FilterAttributes
            onClose={() => setIsFilterOpen(false)}
            subCategories={data.sub_categories as any}
            filterHeaderRef={filterHeaderRef}
            filterAttributes={filterAttributes}
            setSelectedFilterAttributes={setSelectedFilterAttributes}
            selectedFilterAttribute={selectedFilterAttribute}
            searchParams={searchParams}
            productLength={productLength}
          />
        </Drawer>
      )}
    </>
  );
};

export default CategoryFilter;

type DropdownProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  reference: React.RefObject<HTMLDivElement>;
  productLength: number;
};

const DropDownHeader = ({
  isOpen,
  setIsOpen,
  reference,
  productLength,
}: DropdownProps) => {
  const { _t } = useTranslations();
  return (
    <StyledHeaderDiv className="filter-header-dropdown">
      <h6
        className={clsx("filter-title", { active: isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={reference}
      >
        {_t("filter", "Filter")}
        {isOpen ? <IconMinus size={12} /> : <IconPlus size={12} />}
      </h6>

      <h6 className="product-count">
        {!!productLength && productLength > 1 && productLength}{" "}
        {_t("products", "Products")}
      </h6>
    </StyledHeaderDiv>
  );
};

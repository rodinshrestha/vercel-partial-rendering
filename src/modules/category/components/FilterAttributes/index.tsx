import React from "react";

import { useRouter } from "next/navigation";

import {
  // FilterAttributeOptionType,
  FilterAttributeType,
  SelectedFilterAttributeType,
  SubCategory,
} from "@/category/types/category.types";
import useOutsideClick from "@/core/hooks/useOutsideClick";
import Accordion from "@/core/components/Accordion";
import Button from "@/core/components/Button";
import { isObjectEmpty } from "@/core/utils/object";
import useTranslations from "@/core/hooks/useTranslations";
import { queryConversion } from "@/search/utils/generate-query-params";
import { PageProps } from "@/core/types/page-props.types";
// import { SelectedFilterDataType } from '@/search/types/SelectedFilterTypes.types';
import { FilterCategoryList } from "@/search/components/FilterFacets/FilterCategoryList/FilterCategoryList";

import DynamicFilterAttributes from "../DynamicFilterAttributes";

import { StyledDiv } from "./style";

type Props = {
  onClose: () => void;
  subCategories: Array<SubCategory>;
  filterHeaderRef: React.RefObject<HTMLDivElement>;
  filterAttributes: Array<FilterAttributeType>;
  setSelectedFilterAttributes: React.Dispatch<
    React.SetStateAction<SelectedFilterAttributeType>
  >;
  selectedFilterAttribute: SelectedFilterAttributeType;
  searchParams: PageProps["searchParams"];
  productLength: number | null;
};

const FilterAttributes = ({
  onClose,
  subCategories = [],
  filterHeaderRef,
  filterAttributes,
  setSelectedFilterAttributes,
  selectedFilterAttribute,
  searchParams,
  // productLength,
}: Props) => {
  const [activeFacet, setActivefacet] = React.useState("");
  const { _t } = useTranslations();
  const router = useRouter();

  const ref = React.useRef<HTMLDivElement>(null);

  const handleOnReset = () => {
    // const data = Object.entries(selectedFilterAttribute).reduce(
    //   (acc, [key, value]) => {
    //     if (key === 'sort_by') {
    //       acc[key] = value;
    //     }
    //     return acc;
    //   },
    //   {} as Record<
    //     string,
    //     Array<FilterAttributeOptionType> | SelectedFilterDataType[]
    //   >
    // );

    setSelectedFilterAttributes(
      {}
      // data as Record<string, Array<FilterAttributeOptionType>>
    );

    setActivefacet("");
    onClose();

    router.push(
      `${window.location.pathname}/${queryConversion(searchParams, {})}`,
      { scroll: false }
    );
  };

  useOutsideClick(
    ref,
    () => {
      setActivefacet("");
      onClose();
    },
    { filterHeaderRef }
  );
  return (
    <StyledDiv className="dynamic-filter-wrapper" ref={ref}>
      <div className="scroll-wrap">
        {Array.isArray(subCategories) && subCategories.length ? (
          <div className="filter-category-wrapper">
            <Accordion
              className="filter-accordion"
              title="Category"
              tag="h6"
              expanded={activeFacet === "category"}
              onChange={() => {
                setActivefacet((prev) =>
                  prev === "category" ? "" : "category"
                );
              }}
            >
              <div className="categore-filter-wrap">
                {subCategories.map((x) => {
                  return <FilterCategoryList key={x.id} item={x} />;
                })}
              </div>
            </Accordion>
          </div>
        ) : null}

        {filterAttributes?.map((x) => {
          const { options = [] } = x || {};
          const isValidFilterAttri = options.every((x) => !x.label);

          if (isValidFilterAttri) return null;
          return (
            <DynamicFilterAttributes
              key={x.slug}
              item={x}
              setSelectedFilterAttributes={setSelectedFilterAttributes}
              slug={x.slug}
              selectedFilterAttribute={selectedFilterAttribute}
              searchParams={searchParams}
              onSetActiveFacet={setActivefacet}
              activeFacet={activeFacet}
            />
          );
        })}
      </div>

      <div className="filter-bottom">
        <Button
          skin="body"
          variant="contained"
          className="reset-filter-btn"
          onClick={handleOnReset}
          disabled={isObjectEmpty(selectedFilterAttribute || {})}
        >
          {_t("reset_filter", "Reset Filter")}
        </Button>

        {/* <Button
          skin="primary"
          variant="contained"
          className="view-product-btn"
          onClick={onClose}
          fullWidth
        >
          {_t('view', 'View')} {productLength} {_t('product', 'Product')}
        </Button> */}
      </div>
    </StyledDiv>
  );
};

export default FilterAttributes;

import React from "react";

import RangeSlider from "react-range-slider-input";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { rem } from "polished";
import { css } from "styled-components";

import type { FacetsDataType } from "@/search/types/search-facets.types";
import type { SelectedFilterType } from "@/search/types/SelectedFilterTypes.types";
import type { PageProps } from "@/core/types/page-props.types";
import { queryConversion } from "@/search/utils/generate-query-params";
import { updateSelectedRangeFilter } from "@/search/utils/update-selected-range-filter";
import { getFilterPriceValue } from "@/search/utils/get-filter-price-value";

type Props = {
  data: FacetsDataType | null;
  setSelectedFilterAttr: React.Dispatch<
    React.SetStateAction<SelectedFilterType>
  >;
  selectedFilterAttr: SelectedFilterType;
  searchParams: PageProps["searchParams"];
};

const RangeFacets = ({
  data,
  setSelectedFilterAttr,
  selectedFilterAttr,
  searchParams,
}: Props) => {
  const router = useRouter();
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | 0>(0);

  const priceObj = React.useMemo(() => {
    const priceKey = selectedFilterAttr[data?.id || ""];

    if (!priceKey) return null;

    return priceKey[0];
    // return selectedFilterAttr?.find((x) => x.key === PRICE);
  }, [data?.id, selectedFilterAttr]);

  const handleOnChange = (value: Array<number>, item: FacetsDataType) => {
    clearTimeout(debounceRef.current);

    const updatedFilterAttributes: any = updateSelectedRangeFilter(
      value,
      selectedFilterAttr,
      item.id
    );
    setSelectedFilterAttr(updatedFilterAttributes);
    debounceRef.current = setTimeout(() => {
      router.push(
        `${window.location.pathname}${queryConversion(
          searchParams,
          updatedFilterAttributes
        )}`,
        { scroll: false }
      );
    }, 500);
  };

  const [selectedMin, selectedMax] = getFilterPriceValue(priceObj) || [];

  return (
    <StyledDiv>
      <RangeSlider
        min={data?.min || 0}
        max={data?.max || 0}
        step={5}
        value={priceObj ? [selectedMin, selectedMax] : [data?.min, data?.max]}
        onInput={(value: Array<number>) =>
          handleOnChange(value, data as FacetsDataType)
        }
      />

      <div className="range-slider-wrapper-wrapper">
        <div>{selectedMin || data?.min} kr</div>
        <div>{selectedMax || data?.max} kr</div>
      </div>
    </StyledDiv>
  );
};

export default RangeFacets;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    padding: ${rem(15)} 0;

    .range-slider {
      height: 6px;

      &__thumb,
      &__range {
        background: ${theme.color.green[200]};
      }
    }

    .range-slider-wrapper-wrapper {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
  `}
`;

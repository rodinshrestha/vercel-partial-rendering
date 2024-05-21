import React from "react";

import styled from "styled-components";
import { css } from "styled-components";
import { rem } from "polished";
import { useRouter } from "next/navigation";

import type {
  FacetsDataType,
  FacetsValuesType,
} from "@/search/types/search-facets.types";
import type { SelectedFilterType } from "@/search/types/SelectedFilterTypes.types";
import type { PageProps } from "@/core/types/page-props.types";
import { updateSelectedFilterAttributes } from "@/search/utils/update-selected-filter-attributes";
import { queryConversion } from "@/search/utils/generate-query-params";

type Props = {
  data: FacetsDataType | null;
  setSelectedFilterAttr: React.Dispatch<
    React.SetStateAction<SelectedFilterType>
  >;
  selectedFilterAttr: SelectedFilterType;
  searchParams: PageProps["searchParams"];
};

const CheckBoxFacets = ({
  data,
  setSelectedFilterAttr,
  selectedFilterAttr,
  searchParams,
}: Props) => {
  const router = useRouter();

  const handleOnChange = (value: FacetsValuesType, key: string) => {
    const updatedFilterAttributes = updateSelectedFilterAttributes(
      value,
      selectedFilterAttr,
      key
    );
    router.push(
      `${window.location.pathname}${queryConversion(
        searchParams,
        updatedFilterAttributes
      )}`,
      { scroll: false }
    );
    setSelectedFilterAttr(updatedFilterAttributes);
  };

  return (
    <StyledDiv className="checkbox-facets-wrapper">
      {data &&
        data?.values.map((item) => {
          return (
            <div className="checkbox-facets-inner-wrapper" key={item.id}>
              <div className="input-groups">
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  onChange={() => handleOnChange(item, data.id)}
                  checked={
                    selectedFilterAttr[data?.id]?.some(
                      (x) => x.id === item.id
                    ) || false
                  }
                />
                <label htmlFor={item.id}>{item.label}</label>
              </div>
              <div className="count">{item.count}</div>
            </div>
          );
        })}
    </StyledDiv>
  );
};

export default CheckBoxFacets;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.checkbox-facets-wrapper {
      .checkbox-facets-inner-wrapper {
        display: flex;
        justify-content: space-between;

        input {
          position: absolute;
          left: -9999px;

          + label {
            transition: 0.3s ease all;
            position: relative;
            padding-left: 30px;
            cursor: pointer;
            line-height: 20px;
            display: inline-block;
            margin-bottom: ${rem(15)};
            font-size: ${rem(14)};

            &::before,
            &::after {
              content: "";
              position: absolute;
              transition: 0.3s ease all;
            }

            &::before {
              left: 0;
              top: 0;
              width: 20px;
              height: 20px;
              /* border: 1px solid ${theme.color.black["200"]}; */
              background-color: ${theme.color.grey[300]};
              border-radius: 4px;
            }

            &::after {
              content: "\e910";
              font-family: "dogman" !important;
              top: 3px;
              left: 3px;
              opacity: 0;
              font-size: 14px;
              line-height: 14px;
            }
          }
          &:checked + label:after {
            opacity: 1;
            /* background-color: ${theme.color.black["200"]}; */
          }
        }
      }
    }
  `}
`;

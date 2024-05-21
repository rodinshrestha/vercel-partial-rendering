import React from "react";

import styled from "styled-components";
import { css } from "styled-components";
import { rem } from "polished";
import { useRouter } from "next/navigation";

import {
  FilterAttributeOptionType,
  FilterAttributeType,
  SelectedFilterAttributeType,
} from "@/category/types/category.types";
import { PageProps } from "@/core/types/page-props.types";
import {
  categoryqueryConversion,
  updateSelectedFilter,
} from "@/category/utils/generate-filter-query-params";
import CheckBox from "@/core/components/FormField/CheckBox";

type Props = {
  data: FilterAttributeType;
  setSelectedFilterAttributes: React.Dispatch<
    React.SetStateAction<SelectedFilterAttributeType>
  >;
  slug: string;
  selectedFilterAttribute: SelectedFilterAttributeType;
  searchParams: PageProps["searchParams"];
};

const DynamicFilterOptsList = ({
  data,
  setSelectedFilterAttributes,
  slug,
  selectedFilterAttribute,
  searchParams,
}: Props) => {
  const router = useRouter();

  const handleOnChange = (value: FilterAttributeOptionType, key: string) => {
    const updatedFilterAttributes = updateSelectedFilter(
      value,
      selectedFilterAttribute,
      key
    );

    router.push(
      `${window.location.pathname}${categoryqueryConversion(
        updatedFilterAttributes,
        searchParams
      )}`,
      { scroll: false }
    );
    setSelectedFilterAttributes(updatedFilterAttributes);
  };

  return (
    <StyledDiv className="b2b-dynamic-filter-opts-wrapper">
      {data &&
        data?.options.map((item, i) => {
          if (!item.label) return;
          return (
            <div
              className="filter-opt-list-item b2b-dynamic-filter-inner-wrapper"
              key={i}
            >
              <div className="input-groups">
                <CheckBox
                  id={item.value}
                  value={item.value}
                  name={item.label}
                  onChange={() => handleOnChange(item, slug)}
                  checked={
                    selectedFilterAttribute?.[slug]?.some(
                      (x) => x.value === item.value
                    ) || false
                  }
                />
              </div>
            </div>
          );
        })}
    </StyledDiv>
  );
};

export default DynamicFilterOptsList;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    .filter-opt-list-item {
      & + .filter-opt-list-item {
        margin-top: ${rem(20)};
      }
    }

    &.b2b-dynamic-filter-opts-wrapper {
      .b2b-dynamic-filter-inner-wrapper {
        display: flex;
        justify-content: space-between;

        label {
          font-size: ${rem(12)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1.2)};
          text-transform: uppercase;

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(10)};
            line-height: ${rem(14)};
            letter-spacing: ${rem(1)};
            width: 100%;
          }
        }

        input {
          + label {
            @media (max-width: ${theme.breakPoints.mobile}) {
              padding-left: ${rem(25)};
            }

            &::before {
              width: 10px;
              height: 10px;
            }

            &::after {
              width: 6px;
              height: 6px;
              top: 2px;
              left: 2px;
            }
          }
        }
      }
    }
  `}
`;

import React from "react";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import styled, { css } from "styled-components";
import { rem, transparentize } from "polished";

import DropDownWrapper from "@/core/components/DropDownWrapper";
import useTranslations from "@/core/hooks/useTranslations";
import useToggle from "@/core/hooks/useToggle";
import useOutsideClick from "@/core/hooks/useOutsideClick";
import {
  // FilterAttributeOptionType,
  SelectedFilterAttributeType,
} from "@/category/types/category.types";
import Radio from "@/core/components/FormField/Radio";
import { PageProps } from "@/core/types/page-props.types";
// import Button from '@/core/components/Button';
// import { isObjectEmpty } from '@/core/utils/object';
// import { queryConversion } from '@/search/utils/generate-query-params';
// import { SelectedFilterDataType } from '@/search/types/SelectedFilterTypes.types';
import {
  categoryqueryConversion,
  updateSelectedFilter,
} from "@/category/utils/generate-filter-query-params";
import { SORT_BY } from "@/category/constants/sort_by";
import { IconMinus, IconPlus } from "@/core/components/Icons";

type Props = {
  setSelectedFilterAttributes: React.Dispatch<
    React.SetStateAction<SelectedFilterAttributeType>
  >;
  selectedFilterAttribute: SelectedFilterAttributeType;
  options: Array<OptionType>;
  searchParams: PageProps["searchParams"];
};

type OptionType = {
  label: string;
  value: string;
  key: string;
  sort: number;
  translation_text: string;
};

const CategorySortBy = ({
  options,
  setSelectedFilterAttributes,
  selectedFilterAttribute,
  searchParams,
}: Props) => {
  // const [selectedSortByLabel, setSelectedSortByLabel] = React.useState('');

  const { isOpen, setIsOpen } = useToggle();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  useOutsideClick(ref, () => setIsOpen(false));

  const onFilterClick = (value: any, slug: any) => {
    const updatedFilterAttributes = updateSelectedFilter(
      value,
      selectedFilterAttribute,
      slug
    );

    router.push(
      `${window.location.pathname}${categoryqueryConversion(
        updatedFilterAttributes,
        searchParams
      )}`,
      { scroll: false }
    );
    setIsOpen(false);
    setSelectedFilterAttributes(updatedFilterAttributes);
  };

  // const handleOnReset = () => {
  //   const data = Object.entries(selectedFilterAttribute).reduce(
  //     (acc, [key, value]) => {
  //       if (key !== 'sort_by') {
  //         acc[key] = value;
  //       }
  //       return acc;
  //     },
  //     {} as Record<
  //       string,
  //       Array<FilterAttributeOptionType> | SelectedFilterDataType[]
  //     >
  //   );
  //   setSelectedFilterAttributes(
  //     data as Record<string, Array<FilterAttributeOptionType>>
  //   );

  //   router.push(
  //     `${window.location.pathname}/${queryConversion(searchParams, data as Record<string, SelectedFilterDataType[]>)}`,
  //     { scroll: false }
  //   );
  // };

  const selectedSortByLabel = React.useMemo(() => {
    if ("sort_by" in selectedFilterAttribute) {
      /** Sort by is radio so we only care about a single sort */
      const [selectedSort] = selectedFilterAttribute.sort_by;
      const found = options.find((x) => x.value === selectedSort.value);
      return found ? found.label : "";
    }
    return "";
  }, [selectedFilterAttribute, options]);

  return (
    <StyledFilterDiv ref={ref}>
      <DropDownWrapper
        header={
          <DropDownHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            reference={ref}
            selectedSortByLabel={selectedSortByLabel}
          />
        }
        isOpen={isOpen}
        className="facets-drop-down"
      >
        <div className="scroll-wrap">
          {options.map((item, i) => {
            return (
              <div className="short-list-item" key={i}>
                <Radio
                  rounded={0}
                  option={{ label: item.label, value: item.value }}
                  name="sort"
                  id={item.value}
                  onChange={() => {
                    // setSelectedSortByLabel(item.label);
                    onFilterClick(item, SORT_BY);
                  }}
                  checked={Boolean(
                    selectedFilterAttribute &&
                      !!selectedFilterAttribute[SORT_BY]?.find(
                        (x) => x.value === item.value
                      )
                  )}
                />
              </div>
            );
          })}
        </div>

        {/* <div className="filter-bottom">
          <Button
            skin="light"
            variant="transparent"
            className="reset-filter-btn"
            onClick={handleOnReset}
            disabled={isObjectEmpty(selectedFilterAttribute ?? {})}
          >
            Reset Filter
          </Button>
        </div> */}
      </DropDownWrapper>
    </StyledFilterDiv>
  );
};
export default CategorySortBy;

type DropdownProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  reference: React.RefObject<HTMLDivElement>;
  selectedSortByLabel: string;
};

const DropDownHeader = ({
  isOpen,
  setIsOpen,
  reference,
  selectedSortByLabel,
}: DropdownProps) => {
  const { _t } = useTranslations();
  return (
    <StyledFilterHeader
      className={
        isOpen ? "filter-header-wrapper active" : "filter-header-wrapper"
      }
    >
      <h6
        className={clsx(isOpen ? "filter-title active" : "filter-title")}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={reference}
      >
        <span style={{ marginRight: selectedSortByLabel ? "5px" : "" }}>
          {_t("sort_by", "Sort By")}
          {selectedSortByLabel && ":"}
        </span>
        <span>
          {selectedSortByLabel}
          {/* <i className={clsx(isOpen ? 'icon-up_arrow' : 'icon-down_arrow')} /> */}
          {isOpen ? <IconMinus size={12} /> : <IconPlus size={12} />}
        </span>
      </h6>
    </StyledFilterHeader>
  );
};

const StyledFilterDiv = styled.div`
  ${({ theme }) => css`
    .facets-drop-down {
      z-index: 5;
      right: 0;
      right: 0;
      min-width: 200px;
      position: absolute;
      top: calc(100% + 23px);
      padding: ${rem(20)};
      background-color: ${theme.color.white[1000]};
      box-shadow: 0 1px 2px
        ${transparentize(0.84, theme.coreColor.body.default.color)};

      .short-list-item {
        .radio-field {
          [type="radio"] {
            &:checked,
            &:not(:checked) {
              & + label {
                &::before {
                  width: 12px;
                  height: 12px;
                }

                &::after {
                  width: 8px;
                  height: 8px;
                  top: 2px;
                  left: 2px;
                }
              }
            }
          }
        }

        label {
          font-size: ${rem(12)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1.2)};
          text-transform: uppercase;
          margin-bottom: 0;
        }

        & + .short-list-item {
          margin-top: ${rem(20)};
        }
      }

      .filter-bottom {
        margin-top: ${rem(15)};

        button {
          font-size: ${rem(12)};
          letter-spacing: ${rem(1.2)};
        }
      }
    }
  `}
`;

const StyledFilterHeader = styled.div`
  ${({ theme }) => css`
    &.filter-header-wrapper {
      display: flex;
      justify-content: flex-end;

      h6 {
        position: relative;
        display: flex;
        align-items: center;
        font-size: ${rem(12)};
        line-height: ${rem(16)};
        letter-spacing: ${rem(1.2)};
        text-transform: uppercase;
        transition: 0.3s ease all;

        &.active {
        }

        svg {
          margin-left: ${rem(10)};

          @media (max-width: ${theme.breakPoints.mobile}) {
            width: 8px;
            height: 8px;
            margin-bottom: 2px;
          }
        }
      }

      i {
        font-size: ${rem(12)};
        line-height: ${rem(16)};
        margin-left: 5px;
      }

      .selected-item {
        display: inline-block;
        margin-left: auto;
        margin-right: 5px;
      }
    }
  `}
`;

import React from "react";

import Accordion from "@/core/components/Accordion";
import {
  FilterAttributeType,
  SelectedFilterAttributeType,
} from "@/category/types/category.types";
import { PageProps } from "@/core/types/page-props.types";

import DynamicFilterOptsList from "./DynamicFilterOptsList";
import { StyledDiv } from "./style";

type Props = {
  item: FilterAttributeType;
  setSelectedFilterAttributes: React.Dispatch<
    React.SetStateAction<SelectedFilterAttributeType>
  >;
  slug: string;
  selectedFilterAttribute: SelectedFilterAttributeType;
  searchParams: PageProps["searchParams"];
  activeFacet: string;
  onSetActiveFacet: React.Dispatch<React.SetStateAction<string>>;
};

const DynamicFilterAttributes = ({
  item,
  setSelectedFilterAttributes,
  selectedFilterAttribute,
  slug,
  searchParams,
  activeFacet,
  onSetActiveFacet,
}: Props) => {
  return (
    <StyledDiv className="filter-item">
      <Accordion
        className="filter-accordion"
        title={item.slug}
        tag="h6"
        expanded={activeFacet === item.slug}
        onChange={() => {
          onSetActiveFacet(activeFacet === item.slug ? "" : item.slug);
        }}
      >
        <DynamicFilterOptsList
          data={item}
          setSelectedFilterAttributes={setSelectedFilterAttributes}
          slug={slug}
          selectedFilterAttribute={selectedFilterAttribute}
          searchParams={searchParams}
        />
      </Accordion>
    </StyledDiv>
  );
};

export default DynamicFilterAttributes;

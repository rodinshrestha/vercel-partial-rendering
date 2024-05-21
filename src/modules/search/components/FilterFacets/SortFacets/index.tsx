import React from "react";

import { useRouter } from "next/navigation";

import type { SelectedFilterType } from "@/search/types/SelectedFilterTypes.types";
import type { PageProps } from "@/core/types/page-props.types";
import { queryConversion } from "@/search/utils/generate-query-params";
import Radio from "@/core/components/FormField/Radio";
import { PrimaryListSortOptionsDataTypes } from "@/search/types/search-primary-list.types";
import { updateSelectedSortFilter } from "@/search/utils/update-selected-sort-filter";
import { SORT_BY } from "@/search/constants/facets.sort.constant";

type Props = {
  data: PrimaryListSortOptionsDataTypes;
  setSelectedFilterAttr: React.Dispatch<
    React.SetStateAction<SelectedFilterType>
  >;
  selectedFilterAttr: SelectedFilterType;
  searchParams: PageProps["searchParams"];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortFacets = ({
  data,
  setSelectedFilterAttr,
  selectedFilterAttr,
  searchParams,
  setIsOpen,
}: Props) => {
  const router = useRouter();

  const handleChange = (
    value: PrimaryListSortOptionsDataTypes,
    key: string
  ) => {
    const updatedFilterAttributes: any = updateSelectedSortFilter(
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
    setIsOpen(false);
  };

  return (
    <div className="short-list-item">
      <Radio
        option={{ label: data.label, value: data.id }}
        name="sort"
        id={data.id}
        onChange={() => handleChange(data, SORT_BY)}
        checked={!!selectedFilterAttr[SORT_BY]?.find((x) => x.id === data.id)}
      />
    </div>
  );
};

export default SortFacets;

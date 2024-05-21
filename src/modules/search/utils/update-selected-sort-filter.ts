import { SORT_BY, facetsSort } from '../constants/facets.sort.constant';
import { SelectedFilterType } from '../types/SelectedFilterTypes.types';
import { PrimaryListSortOptionsDataTypes } from '../types/search-primary-list.types';

export const updateSelectedSortFilter = (
  value: PrimaryListSortOptionsDataTypes,
  selectedFilterAttri: SelectedFilterType,
  key: string
) => {
  if (!(key in selectedFilterAttri)) {
    return {
      ...selectedFilterAttri,
      [key]: [
        {
          key,
          id: value.id,
          label: value.label,
          sort: facetsSort[key] || 100,
          selectedValue: value.id,
        },
      ],
    };
  }

  const currentKeyValue = selectedFilterAttri[key];

  return {
    ...selectedFilterAttri,
    [key]: currentKeyValue.map((x) =>
      x.key === SORT_BY
        ? { ...x, id: value.id, label: value.label, selectedValue: value.id }
        : x
    ),
  };
};

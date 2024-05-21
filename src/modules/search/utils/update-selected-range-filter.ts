import { facetsSort } from '../constants/facets.sort.constant';
import { SelectedFilterType } from '../types/SelectedFilterTypes.types';

export const updateSelectedRangeFilter = (
  value: Array<number>,
  selectedFilterAttri: SelectedFilterType,
  key: string
) => {
  const [min, max] = value || [];
  if (!(key in selectedFilterAttri)) {
    return {
      ...selectedFilterAttri,
      [key]: [
        {
          key,
          sort: facetsSort[key] || 100,
          selectedValue: `${min},${max}`,
        },
      ],
    };
  }

  const currentKeyValue = selectedFilterAttri[key];

  return {
    ...selectedFilterAttri,
    [key]: currentKeyValue.map((x) =>
      x.key === key ? { ...x, selectedValue: `${min},${max}` } : x
    ),
  };
};

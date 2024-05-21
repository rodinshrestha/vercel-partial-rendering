import { facetsSort } from '../constants/facets.sort.constant';
import {
  SelectedFilterDataType,
  SelectedFilterType,
} from '../types/SelectedFilterTypes.types';
import { FacetSizeFormatValueTypes } from '../types/search-facets-size.types';

export const updateSelectedFilterAttributes = (
  value: FacetSizeFormatValueTypes,
  selectedFilterAttri: SelectedFilterType,
  key: string
) => {
  //For key selection: when new attribute is selected
  if (!(key in selectedFilterAttri)) {
    return {
      ...selectedFilterAttri,
      [key]: [
        {
          ...value,
          key,
          sort: facetsSort?.[key] || 100,
          selectedValue: value.id,
        },
      ],
    };
  }

  const currentKeyValue = selectedFilterAttri[key];

  let updatedValue: Array<any> = [];

  const isKeyExist = currentKeyValue.some((x) => x.id === value.id);

  if (isKeyExist) {
    updatedValue = currentKeyValue.filter(
      (x: SelectedFilterDataType) => x.id !== value.id
    );
  } else {
    updatedValue = [
      ...currentKeyValue,
      {
        ...value,
        key,
        sort: facetsSort?.[key] || 100,
        selectedValue: value.id,
      },
    ];
  }

  return { ...selectedFilterAttri, [key]: updatedValue };
};

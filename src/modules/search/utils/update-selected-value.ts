import { SelectedFilterAttributeType } from '@/category/types/category.types';

export const updateSelectedValue = (
  value: {
    id: string;
    label: string;
    value: string;
  },
  selectedFilterAttri: SelectedFilterAttributeType | null,
  key: string
) => {
  if (!(selectedFilterAttri && key in selectedFilterAttri)) {
    return {
      ...selectedFilterAttri,
      [key]: [
        {
          key,
          label: value.label,
          value: value.value,
        },
      ],
    };
  }

  const currentKeyValue = selectedFilterAttri[key];

  return {
    ...selectedFilterAttri,
    [key]: currentKeyValue.map((x) =>
      x.value !== value.value
        ? { ...x, id: value.id, value: value.value, label: value.label }
        : x
    ),
  };
};

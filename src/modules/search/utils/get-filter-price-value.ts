import { SelectedFilterDataType } from '../types/SelectedFilterTypes.types';

export const getFilterPriceValue = (data: SelectedFilterDataType | null) => {
  if (!data) return [];
  return data.selectedValue.split(',');
};

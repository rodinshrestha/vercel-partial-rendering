import { format } from 'date-fns';

import ReactHtmlParser from '@/core/components/ReactHtmlParser';

import {
  DATE,
  MULT_SELECT,
  SELECT,
  STRING,
  TEXT,
  TEXT_EDITOR,
} from '../constants/product-specification-type';
import { ProductSpecification } from '../types/product.types';

export const getProductSpecification = (item: ProductSpecification) => {
  if (!item?.data || item.slug === 'technical_details') return;

  const dataType = item.type;

  switch (dataType) {
    case TEXT_EDITOR:
    case TEXT:
    case STRING:
      if (typeof item.data === 'string' || typeof item.data === 'number')
        return ReactHtmlParser(item.data.toString());
      break;

    case DATE:
      if (typeof item.data === 'string') return format(item.data, 'YYY-MM-dd');
      break;

    case SELECT:
      if (!Array.isArray(item.data) && typeof item.data === 'object')
        return item.data?.name;
      else if (typeof item.data === 'string') return item.data;
      break;

    case MULT_SELECT:
      if (Array.isArray(item.data) && item.data.length) {
        const data = item.data.map((el) => el.name).join(',');
        return data;
      }
      break;

    default:
      return null;
  }
};

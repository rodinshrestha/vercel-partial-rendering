import { Link } from '@/builder/components/CategoryImageBlock/category-image-block.type';

export const linkGenerator = (data: Link | null) => {
  if (!data) return '#';
  const {
    linkType,
    categoryId,
    customLink,
    pageId,
    productSku,
    isDynamicLink,
  } = data;

  switch (linkType) {
    case 'category':
      return `/category/${categoryId}`;
    case 'custom_link':
      return isDynamicLink ? `/${customLink}` : customLink || '#';
    case 'page':
      return `/page/${pageId}`;
    case 'product':
      return `/product/${productSku}`;
    default:
      return '#';
  }
};

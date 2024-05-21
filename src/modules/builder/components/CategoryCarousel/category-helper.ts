import { CategoriesProps, CategoryType } from './category-type';

export const categoryCarousel = (data: CategoriesProps) => {
  const { categories, content_layout } = data;
  return {
    categories,
    content_layout,
  };
};

export const categoryData = (data: CategoryType) => {
  const { content_module_title, image, use_custom_title_image } = data;
  return {
    title: content_module_title,
    src: image,
    customImageTitle: use_custom_title_image || 0,
    href: data.category.url_key,
  };
};

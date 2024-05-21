import { ProductWithWithoutSliderType } from '@/builder/types/builder.types';

export const CATEGORY = 'category';
export const PRODUCT = 'product';
export const CUSTOM_LINK = 'custom_link';
export const WORN_BY = 'worn_by';
export const PAGE = 'page';

/** TODO: Fix types */
export const getLinkResolver = (data: any) => {
  switch (data?.dynamic_link_type) {
    case CATEGORY:
      return data?.category_link ? `/category/${data.category_link}` : '#';
    case PAGE:
      return data?.page_link ? `/page/${data.page_link}` : '#';
    case WORN_BY:
      return data?.worn_by_link ? `/worn-by/${data.worn_by_link}` : '#';
    case PRODUCT:
      return data?.product_link ? `/product/${data?.product_link}` : '#';
    case CUSTOM_LINK:
      return data.custom_link;
    default:
      return '#';
  }
};

export const productHelpers = (module: ProductWithWithoutSliderType) => {
  const { sub_content_module } = module.content_module;
  const { products } = module.products_module.sub_products_module;
  return {
    sectionTitleData: {
      title: sub_content_module.content_module_title,
      content: sub_content_module.content_module_content,
      // hasBorder: sub_content_module.show_separator === 1,
      titleTag: sub_content_module.title_heading_tag,
      show_button: sub_content_module.show_button,
      buttonData: {
        button_label: sub_content_module.button_label,
        button_url: getLinkResolver(sub_content_module),
        button_link: sub_content_module.button_link,
        open_in_new_tab: 0 | 1,
        button_variant: sub_content_module.button_type,
      },
    },
    layoutType: sub_content_module.content_module_layout_type,
    borderTop: sub_content_module.show_separator === 1,
    borderBottom: sub_content_module.show_separator === 1,
    data: products,
    backgroundType: sub_content_module.content_module_background_type,
  };
};

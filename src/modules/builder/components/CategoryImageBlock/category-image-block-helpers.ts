import { CategoryImageRepeater, LinkGroup } from './category-image-block.type';

export const categoryImageRepeaterHelper = (data: CategoryImageRepeater) => {
  const { content_module_title, image, link_group } = data || {};
  return {
    title: content_module_title || null,
    src: image || null,
    link: getLinkGroup(link_group),
  };
};

const getLinkGroup = (data: LinkGroup | null) => {
  const {
    category_id,
    custom_link,
    image_link,
    is_dynamic_link,
    link_type,
    open_in_new_tab,
    page_id,
    product_sku,
  } = data || {};

  return {
    categoryId: category_id || null,
    customLink: custom_link || null,
    imageLink: image_link || null,
    isDynamicLink: is_dynamic_link || null,
    linkType: link_type || null,
    newTab: open_in_new_tab || null,
    pageId: page_id || null,
    productSku: product_sku || null,
  };
};

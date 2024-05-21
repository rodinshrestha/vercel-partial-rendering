import { TextImageType } from './text-image-type';

const textImageHelper = (data: TextImageType) => {
  const {
    sub_content_module_image,
    content_module_image_position,
    content_module_title,
    title_heading_tag,
    hero_banner_sub_title,
    content_module_content,
    button_link,
    link,
    link_label,
  } = data;
  return {
    src: sub_content_module_image,
    content: content_module_content,
    position: content_module_image_position,
    title: content_module_title,
    buttonLabel: link_label,
    btnLink: link,
    tag: title_heading_tag,
    subTitle: hero_banner_sub_title,
    showBtn: button_link,
    // bannerHeight: '',
  };
};

export default textImageHelper;

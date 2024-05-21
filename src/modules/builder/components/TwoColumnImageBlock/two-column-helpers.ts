import { RepeaterType, TwoColumnType } from './two-column-type';

const TextImageHelper = (data: TwoColumnType) => {
  const {
    sub_content_module_image,
    content_module_title,
    title_heading_tag,
    content_module_content,
    hero_banner_sub_title,
    button_link,
    link,
    link_label,
  } = data;
  return {
    src: sub_content_module_image,
    content: content_module_content,
    title: content_module_title,
    buttonLabel: link_label,
    btnLink: link,
    tag: title_heading_tag,
    subTitle: hero_banner_sub_title,
    showBtn: button_link,
    // bannerHeight: '',
  };
};

export const RepeaterHelper = (data: RepeaterType) => {
  const {
    sub_content_module_image,
    sub_content_module_title,
    sub_content_module_title_heading_tag,
    sub_content_module_sub_title,
    sub_content_module_content,
    sub_content_module_button_link,
    sub_content_module_link,
    sub_content_module_link_label,
  } = data;

  return {
    src: sub_content_module_image,
    content: sub_content_module_content,
    title: sub_content_module_title,
    buttonLabel: sub_content_module_link_label,
    btnLink: sub_content_module_link,
    // btnLink: sub_content_module_button_link,
    tag: sub_content_module_title_heading_tag,
    subTitle: sub_content_module_sub_title,
    showBtn: sub_content_module_button_link,
  };
};

export default TextImageHelper;

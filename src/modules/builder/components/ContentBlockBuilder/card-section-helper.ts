import { ICard } from './card-section-type';

export const contentHelper = (data: ICard) => {
  const {
    content_module_title,
    content_type,
    image,
    content_position,
    button_position,
    content,
    show_button_dropdown,
    use_in_banner,
    button_label,
    custom_link,
    open_in_new_tab,
    content_column,
    descripiton,
    title_heading_tag,
    image_background_size,
    title_color_picker,
    show_stamp,
    stamp_description,
    stamp_icon,
  } = data;

  return {
    content: content || '',
    src: image,
    title: content_module_title || '',
    btnLabel: button_label,
    layoutType: content_column,
    href: custom_link || '#',
    description: descripiton || '',
    newTab: open_in_new_tab,
    contentPosition: content_position,
    buttonPosition: button_position,
    contentType: content_type,
    backgroundSize: image_background_size,
    color: title_color_picker,
    showButton: show_button_dropdown,
    useInBanner: use_in_banner,
    tag: title_heading_tag,
    show_stamp: show_stamp,
    stamp_description: stamp_description || '',
    stamp_icon: stamp_icon,
  };
};

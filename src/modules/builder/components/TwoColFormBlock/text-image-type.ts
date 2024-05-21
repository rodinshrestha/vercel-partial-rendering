import { AlignmentType } from '../BannerBuilder/banner-type';

export type TextImageType = {
  sub_content_module_image: string;
  content_module_image_position: AlignmentType;
  content_module_title: string;
  title_heading_tag: string;
  hero_banner_sub_title: string | null;
  content_module_content: string;
  button_link: number | 1;
  link: string | null;
  link_label: string;
};

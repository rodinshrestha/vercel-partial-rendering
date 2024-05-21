import { AlignmentType } from '../BannerBuilder/banner-type';

export type ContentType = 'image' | 'editor';
export type BackgroundSizeType = 'contain' | 'cover';

export type ICard = {
  content_module_title: string | null;
  content_type: ContentType;
  image: string;
  descripiton: string | null;
  content_position: AlignmentType;
  content: string | null;
  show_button_dropdown: number;
  use_in_banner: string | null;
  button_label: string;
  custom_link: null;
  open_in_new_tab: number;
  content_column: number;
  button_position: AlignmentType;
  image_background_size: BackgroundSizeType;
  title_color_picker: string;
  title_heading_tag: string;
  show_stamp?: 0 | 1;
  stamp_icon: string;
  stamp_description: string | null;
};

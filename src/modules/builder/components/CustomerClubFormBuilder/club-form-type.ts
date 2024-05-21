import { AlignmentType } from '../BannerBuilder/banner-type';

export type ClubFormType = {
  content_module_title: string;
  form_position: AlignmentType;
  show_contact_form: number | 1;
  content_type: 'image' | 'editor';
  image: string;
  content: string;
  stamp_icon: string;
  stamp_content: string;
};

type CustomTypes = {
  src: 'image';
  content: 'content';
  title: 'content_module_title';
  showContactForm: 'show_contact_form';
  contentType: 'content_type';
  stampIcon: 'stamp_icon';
  stampContent: 'stamp_content';
};

export type ClubFormBlockTypes = {
  [K in keyof CustomTypes]: any;
} & {
  tag?: string;
  position?: AlignmentType;
};

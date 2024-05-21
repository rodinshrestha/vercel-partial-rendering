import type { ContainerType } from '@/core/components/Grid/Container';

export type SectionGeneral = {
  container_type: ContainerType;
  /** Admin title  */
  admin_title: string;

  /** Status, default to false | 0 */
  status: boolean;
};

export type Layout = {
  /** Padding Bottom, default to null */
  padding_bottom: null | number | string;

  /** Padding left, default to null */
  padding_left: null | number | string;

  /** Padding right, default to null */
  padding_right: null | number | string;

  /** Padding top, default to null */
  padding_top: null | number | string;
};

export type SectionAdvanced = {
  /** Section custom classes, default to null */
  section_custom_classes: string | null | number;

  /** Section custom id, default to null */
  section_custom_id: string | null | number;
};

export type SectionBackground = {
  /** Gradiant color, deafult to null */
  gradient_color: null | string;

  /** Section background color, default to null */
  section_background_color: string | null;

  /** Section background height, default to null */
  // section_background_height: string | number | null;
  section_background_height: 'small' | 'medium' | 'large';

  /** Secftion background image */
  section_background_image: string | null;

  /** Section background position, default to null */
  section_background_position: string | null;

  /** Section background image repeat */
  section_background_repeat: null | string;

  /** Section background size, default to null */
  section_background_size: 'cover' | 'contain' | 'fill';

  /** Section background type : image, video default to null */
  section_background_type: 'image' | 'video' | 'none' | null;

  /** Section tracker id, default to null */
  section_tracker_id: null | string | number;

  /** Section video link, default to null */
  section_video_link: string | null;

  /** Section video type */
  section_video_type: string | null;
};

export type SectionAttribute = {
  paddingTop: Pick<Layout, 'padding_top'>;
  paddingBottom: Pick<Layout, 'padding_bottom'>;
  paddingLeft: Pick<Layout, 'padding_left'>;
  paddingRight: Pick<Layout, 'padding_right'>;
  backgroundPosition: Pick<SectionBackground, 'section_background_position'>;
  backgroundRepeat: Pick<SectionBackground, 'section_background_repeat'>;
  backgroundSize: Pick<SectionBackground, 'section_background_size'>;
  id: string;
  className: string;
  backgroundColor: Pick<
    SectionBackground,
    'section_background_color' | 'gradient_color'
  >;
  backgroundHeight: Pick<SectionBackground, 'section_background_height'>;
  backgroundImage: Pick<SectionBackground, 'section_background_image'>;
  containerType: ContainerType;
};

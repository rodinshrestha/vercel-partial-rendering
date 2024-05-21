import { CardHeightTypes } from '@/core/components/ContentCard';

export type AlignmentType =
  | 'center'
  | 'left'
  | 'right'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'center-center'
  | 'center-left'
  | 'center-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right';

export type BannerProps = {
  // image: string;
  // content_module_title: string;
  // content_position: AlignmentType;
  // content: string;
  // show_button_dropdown: number;
  // use_in_banner?: boolean | null;
  // button_label: string | null;
  // custom_link: string | null;
  // open_in_new_tab?: boolean | null;
  // content_layout_type: CardHeightTypes;
  // use_multiple_banner_images: 1 | 0;
  // banner_images?: BannerImages;
  content_module_banner_type: 'hero_banner' | 'section_banner' | 'page_banner';
  link_title: string | null;
  link_href: string | null;
  content_module_title: string | null;
  logo: string | null;
  background_image: string;
  has_features: number;
  feature_repeater: Array<{
    feature_title: string;
    feature_icon: string | null;
  }>;
  banner_background_type: string;
  banner_video_type?: string | null;
  banner_video_link?: string;
  banner_background_size?: 'contain' | 'cover' | 'fill';
};
type Image = {
  image: string;
};

export type BannerImages = {
  banner_image_ipad: Image;
  banner_image_mobile: Image;
  banner_image_large_screen: Image;
  banner_image_small_screen: Image;
};

type CustomBanner = {
  src: 'image';
  buttonLabel: 'button_label';
  content: 'content';
  // bannerHeight: 'content_layout_type';
  // position: 'content_position';
  title: 'content_module_title';
  showBtn: 'show_button_dropdown';
  btnLink: 'custom_link';
};

//todo check Record of ts:
export type ImageBlockTypes = {
  [K in keyof CustomBanner]: any;
} & {
  bannerHeight?: CardHeightTypes;
  tag?: string;
  position?: AlignmentType;
};

export interface IBanner extends ImageBlockTypes {
  useMultipleBannerImage: 0 | 1;
  imageIpad: Image | null;
  imageMobile: Image | null;
  imageLargeScreen: Image | null;
  imageSmallScreen: Image | null;
}

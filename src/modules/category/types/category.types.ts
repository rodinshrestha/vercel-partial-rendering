import { AlignmentType } from '@/builder/components/BannerBuilder/banner-type';
import { BuilderComponentTypes } from '@/builder/types/builder.types';
import { ProductTypes } from '@/product/types/product.types';

export type CategoryLayoutType = 'category_group' | 'default';

export type HorizontalPositionType = 'left' | 'center' | 'right';
export type VerticalPositionType = 'top' | 'center' | 'bottom';

export type PositionArrayType = [VerticalPositionType, HorizontalPositionType];

export type BannerType = 'full-screen' | 'section-banner' | 'box-banner';

export type BannerSizeType = 'large' | 'medium' | 'small';

export type CategorySeoType = {
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  seo_title: string;
  seo_description: string;
  position: AlignmentType;
  title_position: AlignmentType;
};

export type BreadCrumbType = Array<{
  id: string;
  name: string;
  url_key: string;
}>;

export interface CategoryDataTypes {
  components: BuilderComponentTypes[];

  /** B2b status  deafault to 1 */
  b2b_status: 0 | 1;

  /** Current page */
  current_page: number;

  /** Category description */
  description: string;

  /** Cateogry banner data */
  hero_banner: CategoryBanner;

  /** Category id */
  id: string;

  /** Category layout type */
  // layout: CategoryLayoutType;

  /** Subcatogry */
  sub_categories: Array<SubCategoriesList>;

  /** Meta description for SEO */
  meta_description: string | null;

  /** Meta title keyword for SEO */
  meta_title: string | null;

  /** Meta keyword for SEO */
  meta_keyword: string | null;

  /** Seo Title for SEO */
  seo_title: string | null;

  /** Seo Description for SEO */
  seo_description: string | null;

  /** Seo  */
  search_engine_optimization: CategorySeoType;

  /** category name */
  name: string;

  /** hard fix */
  category_groups: Array<CategoryGroup>;

  /** category breadcrumb */
  breadcrumbs: BreadCrumbType;

  layout: 'category_group' | 'default';

  products: {
    products: CategoryProductTypes;
  };
}

export interface CategoryWithGroup extends CategoryDataTypes {
  layout: 'category_group';
  category_groups: Array<CategoryGroup>;
}

export interface CategoryDefault extends CategoryDataTypes {
  layout: 'default';
  products: {
    products: CategoryProductTypes;
  };
}

export type CategoryProductTypes = {
  data: Array<ProductTypes>;

  /** Product current page */
  current_page: number;

  /** Product last page */
  last_page: number;

  /** product limit */
  limit: number;

  /** Total product data */
  total: number;
};

export type CategoryGroup = {
  /** Category description */
  description: string;

  /** Category id */
  id: string;

  /** Category sub title */
  sub_title: string;

  /** Category title */
  // title: string;

  /** Category name */
  name: string;

  /** Category Product List */
  products: {
    data: Array<ProductTypes>;
  };

  /** Feature icon list  */

  features: Array<FeatureData>;
};

export type FeatureData = {
  /** Feature icon id */
  id: string;

  /** Feature image url */
  image: string | null;

  /** Feature descritpion */
  description: string;
};

export type CategoryBanner = {
  /** Category background image */
  background_image: string;

  /** Category background type */
  background_type: string;

  /** Category overlay type */
  hero_banner_overlay: 0 | 1;

  /** Category Background gradient color */
  gradient_color: string;

  /** Category background content */
  hero_banner_content: string;

  /** Category banner sub title */
  hero_banner_sub_title: string;

  /** Category banner title  */
  hero_banner_title: string;

  /** Category  banner button label */
  read_more_label: string;

  /** Category banner button link */
  read_more_link: string;

  /** Cateogry video link */
  video_id: string;

  /** Cateogry video type */
  video_type: string;
};

export type SubCategoriesList = {
  /** Status */
  b2b_status: 0 | 1;

  /** Sub categories description */
  description: string;

  /** Sub categories id */
  id: string;

  /** Sub categories image */
  image: string | null;

  /** Sub categories background color */
  image_background_color: string | null;

  /** Sub categories name */
  name: string;

  /** Sub categories status */
  status: 0 | 1;

  /** Sub categories url key */
  url_key: string;
};

export type FilterAttributeType = {
  /** Filter attribute name */
  name: string;

  /** Filter attributes option list */
  options: Array<FilterAttributeOptionType>;

  sort: number;

  /** Filter attribute slug */
  slug: string;
};

export type FilterAttributeOptionType = {
  /** Option label */
  label: string;

  /** Option value */
  value: string;

  sort?: number;

  /** Manuall added key */
  key?: string;

  /** Translation_text */
  translation_text?: string;
};

export type SelectedFilterAttributeType = {
  [key: string]: Array<FilterAttributeOptionType>;
};

export type SubCategory = {
  id: string;
  name: string;
  url_key: string;
  status: 0 | 1;
  image: string | null;
};

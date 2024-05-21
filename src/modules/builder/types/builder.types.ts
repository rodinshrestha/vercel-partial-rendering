import { CardHeightTypes } from "@/core/components/ContentCard";

import { BannerProps } from "../components/BannerBuilder/banner-type";
import { CategoriesProps } from "../components/CategoryCarousel/category-type";
import { ICard } from "../components/ContentBlockBuilder/card-section-type";
import { TextImageType } from "../components/TextImageBlock/text-image-type";
import {
  ProductModule,
  ProductSubModuleBlock,
} from "../components/ProductWithSectionTitle/product-block.modules.types";
import { CategoryImageBlockType } from "../components/CategoryImageBlock/category-image-block.type";
import { ClubFormType } from "../components/CustomerClubFormBuilder/club-form-type";

import type { RowAdvanced, RowBackground } from "./row.types";
import type {
  Layout,
  SectionAdvanced,
  SectionBackground,
  SectionGeneral,
} from "./section.types";

/**
 * Possible builder component types
 */
export enum ComponentIdentifiers {
  "BANNER" = "banner",
  "CATEGORY_CAROUSEL" = "category_carousel",
  "CONTENT_BLOCK" = "content_block",
  "TEXT_IMAGE_BLOCK" = "text_image_block",
  "PRODUCT_WITH_WITHOUT_SLIDER" = "with_and_without_slider_products",
  "CUSTOMER_CLUB_FORM" = "customer_club_form",
  "CATEGORY_IMAGE_BLOCK" = "category_image_block",
}

export type BuilderComponentTypes = {
  identifier: ComponentIdentifiers;
  position: number;
  value: ComponentDetails<BuilderComponentTypes["identifier"]>;
};

export type SectionSettings = {
  general: SectionGeneral;
  layout: Layout;
  section_advanced: SectionAdvanced;
  section_background: SectionBackground;
};

export type RowSettings = {
  row_advanced: RowAdvanced;
  row_background: RowBackground;
};

export type ModuleTypes = {
  [ComponentIdentifiers.BANNER]: BannerBuilderType;
  [ComponentIdentifiers.CATEGORY_CAROUSEL]: CategoryCarouselType;
  [ComponentIdentifiers.CONTENT_BLOCK]: ContentBlockType;
  [ComponentIdentifiers.TEXT_IMAGE_BLOCK]: TextImageBlockType;
  [ComponentIdentifiers.PRODUCT_WITH_WITHOUT_SLIDER]: ProductWithWithoutSliderType;
  [ComponentIdentifiers.CATEGORY_IMAGE_BLOCK]: CategoryImageBlockContentType;
  [ComponentIdentifiers.CUSTOMER_CLUB_FORM]: ClubFormBlockType;
};

export type ComponentDetails<T extends ComponentIdentifiers> = {
  /** Page row settings */
  row_settings: RowSettings;

  /** Page section settings */
  section_settings: SectionSettings;

  /** Page module details */
  module: ModuleTypes[T];
};

export type DynamicPageType = {
  pageData: {
    data: {
      components: Array<BuilderComponentTypes>;
    };
  };
};

export type BannerBuilderType = Record<
  "content_module",
  Record<"sub_content_module", BannerProps>
>;

export type TextImageBlockType = Record<
  "content_module",
  Record<"sub_content_module", TextImageType>
>;

export type ClubFormBlockType = Record<
  "content_module",
  Record<"sub_content_module", ClubFormType>
>;

export type CategoryCarouselType = Record<
  "categories_module",
  Record<"sub_categories_module", CategoriesProps>
>;

export type CategoryImageBlockContentType = Record<
  "content_module",
  Record<"sub_content_module", CategoryImageBlockType>
>;

export type ContentBlockType = Record<
  "content_module",
  Record<
    "sub_content_module",
    {
      content_layout_type: CardHeightTypes;
      content_repeater: Array<ICard>;
    }
  >
>;

export type ProductWithWithoutSliderType = {
  content_module: {
    sub_content_module: ProductSubModuleBlock;
  };
  products_module: {
    sub_products_module: {
      products: Array<ProductModule>;
    };
  };
};

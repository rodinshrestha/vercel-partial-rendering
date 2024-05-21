import dynamic from 'next/dynamic';

import {
  ComponentIdentifiers,
  ContentBlockType,
  TextImageBlockType,
  type BannerBuilderType,
  type BuilderComponentTypes,
  type CategoryCarouselType,
  ProductWithWithoutSliderType,
  CategoryImageBlockContentType,
  ClubFormBlockType,
} from './types/builder.types';
import { rowAttributes } from './utils/row-settings-utils';
import {
  pluckSectionBackgroundImage,
  sectionAttributes,
} from './utils/section-settings-utils';
import { categoryCarousel } from './components/CategoryCarousel/category-helper';
import textImageHelper from './components/TextImageBlock/text-image-helper';
import { productHelpers } from './components/ProductWithSectionTitle/product.helpers';
import { BannerBackgroundMedia } from './components/BannerBuilder/components/BannerBackgroundMedia';
import clubFormHelper from './components/CustomerClubFormBuilder/club-form-helper';

const BackgroundContentPage = dynamic(
  () => import('./components/BackgroundContent')
);
const BannerBuilder = dynamic(() => import('./components/BannerBuilder'));
const CategoryCarousel = dynamic(() => import('./components/CategoryCarousel'));
const TextImageBlock = dynamic(() => import('./components/TextImageBlock'));
const ContentBlockBuilder = dynamic(
  () => import('./components/ContentBlockBuilder')
);
const ProductWithSectionTitle = dynamic(
  () => import('./components/ProductWithSectionTitle')
);
const CustomerClubForm = dynamic(
  () => import('./components/CustomerClubFormBuilder')
);
const CategoryImageBlock = dynamic(
  () => import('./components/CategoryImageBlock')
);

type Props = {
  component: BuilderComponentTypes;
};

const Builder = ({ component }: Props) => {
  const {
    identifier,
    value: { module, row_settings, section_settings },
  } = component;

  switch (identifier) {
    case ComponentIdentifiers.BANNER: {
      const data = (module as BannerBuilderType).content_module
        .sub_content_module;
      return (
        <BannerBuilder
          data={data}
          sectionAttributes={sectionAttributes(section_settings)}
          rowAttributes={rowAttributes(row_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
          bannerBackgroundMedia={
            <BannerBackgroundMedia module={module as BannerBuilderType} />
          }
          image={pluckSectionBackgroundImage(section_settings)}
        />
      );
    }
    case ComponentIdentifiers.CONTENT_BLOCK: {
      const { content_layout_type, content_repeater } = (
        module as ContentBlockType
      ).content_module.sub_content_module;
      return (
        <ContentBlockBuilder
          data={content_repeater}
          layoutType={content_layout_type}
          sectionAttributes={sectionAttributes(section_settings)}
          rowAttributes={rowAttributes(row_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
    }
    case ComponentIdentifiers.CATEGORY_CAROUSEL: {
      const { sub_categories_module } = (module as CategoryCarouselType)
        .categories_module;
      return (
        <CategoryCarousel
          data={categoryCarousel(sub_categories_module)}
          sectionAttributes={sectionAttributes(section_settings)}
          rowAttributes={rowAttributes(row_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
    }
    case ComponentIdentifiers.TEXT_IMAGE_BLOCK: {
      const { sub_content_module } = (module as TextImageBlockType)
        .content_module;
      return (
        <TextImageBlock
          data={textImageHelper(sub_content_module)}
          rowAttributes={rowAttributes(row_settings)}
          sectionAttributes={sectionAttributes(section_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
    }

    case ComponentIdentifiers.CUSTOMER_CLUB_FORM: {
      const { sub_content_module } = (module as ClubFormBlockType)
        .content_module;
      return (
        <CustomerClubForm
          data={clubFormHelper(sub_content_module)}
          rowAttributes={rowAttributes(row_settings)}
          sectionAttributes={sectionAttributes(section_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
    }

    case ComponentIdentifiers.PRODUCT_WITH_WITHOUT_SLIDER: {
      return (
        <ProductWithSectionTitle
          sectionAttributes={sectionAttributes(section_settings)}
          rowAttributes={rowAttributes(row_settings)}
          {...productHelpers(module as ProductWithWithoutSliderType)}
        />
      );
    }

    case ComponentIdentifiers.CATEGORY_IMAGE_BLOCK: {
      const { sub_content_module } = (module as CategoryImageBlockContentType)
        .content_module;
      return (
        <CategoryImageBlock
          data={sub_content_module}
          rowAttributes={rowAttributes(row_settings)}
          sectionAttributes={sectionAttributes(section_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
    }
    /*

    case TWO_COLUMN_IMAGE_BLOCK: {
      const { sub_content_module } = module.content_module;
      return (
        <TwoColumImage
          data={TextImageHelper(sub_content_module)}
          repeaterContent={
            module.repeater_content.repeater_group.content_with_image
          }
          rowAttributes={rowAttributes(row_settings)}
          sectionAttributes={sectionAttributes(section_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
    }
    case BLOG: {
      const { sub_content_module } = module.content_module;

      return (
        <Blog
          fetchDataBy={blogHelper(sub_content_module)}
          queryParams={{ params, searchParams }}
          rowAttributes={rowAttributes(row_settings)}
          sectionAttributes={sectionAttributes(section_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
    }
    case BRAND: {
      const { brand } = module.brands;
      return <BrandListing params={params} brand={brand} />;
    }
    case PRODUCT_WITH_WITHOUT_SLIDER:
      return <ProductWithSectionTitle {...productHelpers(module)} />;
    */
    default:
      if (process.env.NODE_ENV === 'development') {
        return (
          <h5>
            {identifier} <i>(Builder not available)</i>
          </h5>
        );
      } else return null;
  }
};
export default Builder;

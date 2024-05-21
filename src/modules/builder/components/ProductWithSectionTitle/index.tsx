'use client';
import React from 'react';

import clsx from 'clsx';

import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import SectionTitle from '@/core/components/SectionTitle';
import type { ISectionTitle } from '@/core/components/SectionTitle/section-title.types';
import ProductItem from '@/product/components/Card/ProductItem';
import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { breakPoints } from '@/theme/breakPoints';
import Button from '@/core/components/Button';
import { IconArrowRight } from '@/core/components/Icons';
import useTranslations from '@/core/hooks/useTranslations';

import WithSlideColumnBlock from './components/WithSlideColumnBlock';
import { LayoutType } from './product-block.modules.types';
import { StyledSection } from './style';
import WithoutSlideColumnBlock from './components/WithoutSlideColumnBlock';

type IProps = {
  className?: string;
  data: any;
  sectionTitleData: ISectionTitle;
  layoutType: LayoutType;
  borderTop: boolean;
  borderBottom: boolean;
  backgroundType: string;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
};

const ProductWithSectionTitle: React.FC<IProps> = ({
  sectionTitleData = {},
  data,
  layoutType = 'slider',
  borderTop = false,
  borderBottom = false,
  className,
  backgroundType,
  sectionAttributes,
  rowAttributes,
}) => {
  const [sliderType, setSliderType] = React.useState<LayoutType | null>(null);
  const { containerType, ...restSectionAttribute } = sectionAttributes;
  const isTab = useMediaQuery(breakPoints.tab);
  const { _t } = useTranslations();
  const normal = containerType === 'normal';
  const {
    gutterSpace,
    id: rowId,
    className: rowClassName,
    ...restRowAttribute
  } = rowAttributes;
  const handleResize = (type: LayoutType) => {
    const width = window.innerWidth;

    if (width < 991) {
      setSliderType(type);
    } else {
      setSliderType(type);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => handleResize(layoutType));
    handleResize(layoutType);
    return () => {
      window.removeEventListener('resize', () => handleResize(layoutType));
    };
  }, [layoutType]);

  return (
    <StyledSection
      className={clsx(className, 'pt-75', 'pb-75', {
        [backgroundType]: !!backgroundType,
      })}
      style={{
        ...removeNullFromObject(restSectionAttribute),
      }}
    >
      <Container
        fluid={!normal}
        className={clsx({
          'has-border-top': borderTop,
          'has-border-bottom': borderBottom,
        })}
      >
        <Row
          noGutter={gutterSpace}
          className={clsx('mb-100', rowClassName || '')}
          id={rowId || ''}
          style={{ ...removeNullFromObject(restRowAttribute) }}
        >
          <Col md={12}>
            <SectionTitle
              className="section-title"
              hasBorder={false}
              {...sectionTitleData}
            />
          </Col>
        </Row>

        {sliderType === 'slider' ||
          (isTab && (
            <Row
              noGutter={gutterSpace}
              className={rowClassName || ''}
              id={rowId || ''}
              style={{ ...removeNullFromObject(restRowAttribute) }}
            >
              <WithSlideColumnBlock
                sliderProps={{
                  navigation: false,
                  breakpoints: {
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                    1200: {
                      slidesPerView: 5,
                    },
                  },
                }}
                data={data}
              >
                {(item: any) => <ProductItem product={item} />}
              </WithSlideColumnBlock>
            </Row>
          ))}

        {sliderType === 'normal' && !isTab && (
          <Row style={{ rowGap: '30px' }}>
            <WithoutSlideColumnBlock data={data}>
              {(item: any) => <ProductItem product={item} />}
            </WithoutSlideColumnBlock>
          </Row>
        )}
        {Boolean(sectionTitleData.show_button) &&
          Boolean(sectionTitleData.buttonData) && (
            <Row>
              <Col>
                <div className="btn-wrapper text-center mt-35">
                  <Button
                    className="see-more"
                    skin="body"
                    variant="transparent"
                    href={sectionTitleData.buttonData?.button_link}
                    asSelfLink={sectionTitleData.buttonData?.button_link.startsWith(
                      'http'
                    )}
                    newTab={sectionTitleData.buttonData?.button_link.startsWith(
                      'http'
                    )}
                  >
                    {sectionTitleData.buttonData?.button_label}
                    <IconArrowRight size={20} />
                  </Button>
                </div>
              </Col>
            </Row>
          )}
      </Container>
    </StyledSection>
  );
};

export default ProductWithSectionTitle;

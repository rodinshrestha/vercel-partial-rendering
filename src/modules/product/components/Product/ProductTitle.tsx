import React from 'react';

import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import {
  ChangeAbleValueType,
  ProductTypes,
} from '@/product/types/product.types';
import useTranslations from '@/core/hooks/useTranslations';

const AuthCheckModal = dynamic(() => import('@/auth/components/AuthModal'));

export type tagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  productData: ProductTypes;
  tag?: tagType;
  className?: string;
  changeAbleValue: ChangeAbleValueType;
};

const ProductTitle = ({
  productData,
  tag = 'h4',
  className,
  changeAbleValue,
}: Props) => {
  const { _t } = useTranslations();
  const [isOpen, setIsOpen] = React.useState(false);

  const { name: brandName } = productData?.brand || {};

  return (
    <>
      <StyledDiv className={clsx(className, 'title')}>
        {brandName && <SkuWrap className="sku">{brandName}</SkuWrap>}
        <div className="pro-title">
          <h1 className={`${tag}`}>
            {changeAbleValue?.productName || productData.name}
          </h1>
        </div>
        {(productData?.sku || changeAbleValue?.sku) && (
          <SkuWrap className="sku">
            {changeAbleValue.sku || productData.sku}
          </SkuWrap>
        )}
      </StyledDiv>
      <AuthCheckModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ProductTitle;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${rem(35)};

    @media (max-width: ${theme.breakPoints.tab}) {
      margin-bottom: ${rem(20)};
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      margin-bottom: ${rem(11)};
    }

    span {
      &.sku {
        display: block;
      }
    }

    .pro-title {
      position: relative;
      display: inline-block;

      h1 {
        ${theme.fontFamily.light}
        position: relative;
        text-transform: uppercase;

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(14)};
          line-height: ${rem(18)};
          letter-spacing: $[rem(1.4)];
        }
      }

      span {
        position: absolute;
        top: 12px;
        right: 0;
        font-size: 24px;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        height: 24px;
        min-width: 24px;

        @media (max-width: ${theme.breakPoints.tablet}) {
          top: 9px;
          font-size: 20px;
          line-height: 20px;
          height: 20px;
          min-width: 20px;
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: ${theme.coreColor.danger.default.background};

            i {
              color: ${theme.coreColor.danger.default.background};

              &::before {
                content: '\e90c';
                opacity: 0.7;
              }
            }
          }
        }

        .icon-heart {
          color: ${theme.coreColor.danger.default.background};
        }
      }

      & + span {
        margin-top: ${rem(5)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-top: 0;
        }
      }
    }

    &.b2b-title {
      h1 {
        font-size: ${rem(28)};
        line-height: ${rem(34)};

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(24)};
          line-height: ${rem(28)};
        }

        span {
          top: 6px;

          @media (max-width: ${theme.breakPoints.tablet}) {
            top: 4px;
          }
        }
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        max-width: 100%;
      }
    }
  `}
`;

const SkuWrap = styled.span`
  ${({ theme }) => css`
    ${theme.fontFamily.light}
    font-size: ${rem(12)};
    line-height: ${rem(18)};
    letter-spacing: ${rem(1.2)};
  `}
`;

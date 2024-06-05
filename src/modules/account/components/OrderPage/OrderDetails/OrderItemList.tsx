'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import { rem, transparentize } from 'polished';

import ImageWithFallback from '@/core/components/ImageWithFallback';
import { OrderDetailsType } from '@/account/types/order.types';
import useTranslations from '@/core/hooks/useTranslations';

type Props = { data: OrderDetailsType };

const OrderItemList = ({ data }: Props) => {
  const { _t } = useTranslations();
  return (
    <StyledDiv className="mt-35">
      <div className="total-order-item">
        <h6>
          <strong>
            {data.items_count} {_t('items', 'Items')}
          </strong>
        </h6>
      </div>
      {data.order_items.map((item) => (
        <div key={item.product_id} className="order-item-wrapper">
          <div className="order-item-image">
            <ImageWithFallback
              src={item.product_data.base_image.url}
              alt={item.product_data.name}
              width={80}
              height={118}
              className="object-contain"
            />
          </div>
          <div className="order-item-content">
            <div className="item-title">
              <h6>{item.product_data.name}</h6>
            </div>
            <div className="item-price">
              <span className="price">{item.grand_total}</span>
            </div>

            <div className="attributes-opt">
              {Object.entries(item.product_data.configurable_attributes).map(
                ([key, value]) => (
                  <span className="att-opt" key={key}>
                    {_t(key as any, key)}-<strong>{value}</strong>
                  </span>
                )
              )}
            </div>

            <div className="item-qty">
              <span>{item.qty}st</span>
            </div>
          </div>
        </div>
      ))}
    </StyledDiv>
  );
};

export default OrderItemList;

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    font-size: ${rem(14)};
    line-height: ${rem(16)};
    letter-spacing: ${rem(1.4)};

    h6 {
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      text-transform: uppercase;
    }

    span {
      ${theme.fontFamily.light}

      strong {
        ${theme.fontFamily.regular}
      }
    }

    .total-order-item {
      padding-bottom: ${rem(5)};
    }

    .total-order-item,
    .order-item-wrapper {
      border-bottom: 1px solid
        ${transparentize(0.5, theme.coreColor.body.default.color)};
    }

    .order-item-wrapper {
      display: flex;
      flex-wrap: wrap;
      padding: ${rem(15)} 0;

      .order-item-image {
        img {
          max-width: 80px;
          height: 118px;
          object-fit: contain;
          object-position: top;
        }
      }

      .order-item-content {
        flex-grow: 1;
        padding-left: ${rem(15)};

        .item-title {
          margin-bottom: ${rem(10)};

          h6 {
            ${theme.fontFamily.light}
          }
        }

        .item-price {
          margin-bottom: ${rem(28)};

          span {
            ${theme.fontFamily.regular}
          }
        }

        .attributes-opt {
          text-transform: capitalize;
          margin-bottom: ${rem(15)};
          display: flex;
          align-items: center;
          gap: ${rem(20)};
        }

        .item-qty {
          span {
            ${theme.fontFamily.regular}
          }
        }
      }
    }
  `}
`;

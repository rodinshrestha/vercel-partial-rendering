'use client';
import React from 'react';

import { format } from 'date-fns';

import ImageWithFallback from '@/core/components/ImageWithFallback';
import { IconArrowRight } from '@/core/components/Icons';
import Link from '@/core/components/Link';
import useTranslations from '@/core/hooks/useTranslations';
import { OrderDetailsType } from '@/account/types/order.types';

import { OrderTableWrap } from './style';

type Props = {
  order: OrderDetailsType;
  address: {
    address1: string;
    postal: string;
    country: string;
    city: string;
  };
  hasActionBtn?: boolean;
  hasImage?: boolean;
};

const OrderTable = ({
  order,
  address,
  hasActionBtn = true,
  hasImage = false,
}: Props) => {
  const { _t } = useTranslations();

  const {
    id,
    increment_id,
    status,
    grand_total: total,
    created_at: date,
    items_count,
    order_items,
  } = order;

  const [firstItem] = order_items;
  const {
    product_data: { base_image },
  } = firstItem;

  return (
    <OrderTableWrap className="order-table">
      <div className="order-table-wrapper">
        {hasImage && (
          <div className="order-img">
            <ImageWithFallback
              src={base_image.url}
              width={70}
              height={101}
              alt="img"
            />
          </div>
        )}

        <div className="order-content">
          <div className="order-col">
            <div className="order-id">
              <h6>
                <strong>
                  {_t('order', 'Order')} {''} #{increment_id}
                </strong>
              </h6>
            </div>

            <div className="status-wrap">
              <div className="status">
                <span>{status}</span>
              </div>
              {/* {status === 'processing' && (
                <div className="track">
                  <span>
                    <Link href="#">{_t('track', 'Track')}</Link>
                  </span>
                </div>
              )} */}
            </div>

            <div className="address">
              <span> {address.address1} </span>
              <br />
              <span>
                {address.postal}, {address.city} {address.country}
              </span>
            </div>
          </div>

          <div className="order-col">
            <div className="order-date">
              <span className="date">
                {format(new Date(date), 'yyyy-MM-dd')}
              </span>
            </div>
            <div className="total-order-items">
              <span>
                {items_count}{' '}
                {items_count === 1
                  ? _t('product', 'Product')
                  : _t('products', 'Products')}
              </span>
            </div>
            <div className="total-price">
              <span>{total}</span>
            </div>
          </div>
          {hasActionBtn && (
            <div className="order-col action-btn">
              <Link href={`/account/orders/${id}`}>
                <IconArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </OrderTableWrap>
  );
};
export default OrderTable;

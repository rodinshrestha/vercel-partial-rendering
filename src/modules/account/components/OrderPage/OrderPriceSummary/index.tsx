import React from 'react';

import useTranslations from '@/core/hooks/useTranslations';
import { CustomerOrderItems } from '@/account/types/order.types';

import { StyledDiv } from './style';

type PropsType = {
  orderSummary: CustomerOrderItems | null;
};

const OrderPriceSummary = ({ orderSummary }: PropsType) => {
  const { _t } = useTranslations();

  const { lineItems = [] } = orderSummary || {};

  const shipping = lineItems.find((el) => el.sku === 'shipping_item');
  const totalItem = lineItems.filter((el) => el.sku !== 'shipping_item');

  const subTotal = orderSummary
    ? shipping
      ? orderSummary.netPriceSum - shipping?.netPrice
      : orderSummary.netPriceSum - 0
    : 0;

  return (
    <StyledDiv className="order-summary-block">
      <div className="order-wrap">
        <div className="item-list">
          <p className="item-title">{_t('total_items', 'Total Items')}</p>
          <p className="item-price">{totalItem?.length}</p>
        </div>

        <div className="item-list vat">
          <p className="item-title">{_t('shipping', 'Shipping')}</p>
          <p className="item-price">{shipping ? shipping.netPrice : 0} RKS</p>
        </div>

        <div className="item-list">
          <p className="item-title">{_t('sub_total', 'Sub Total')}</p>
          <p className="item-price">{subTotal} RKS</p>
        </div>

        <div className="order-wrap total-order">
          <div className="item-list">
            <p className="item-title">{_t('grand_total', 'Grand Total')}</p>
            <p className="item-price">
              {orderSummary && orderSummary.netPriceSum + ' RKS'}
            </p>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default OrderPriceSummary;

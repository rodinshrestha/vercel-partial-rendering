import React from 'react';

import useTranslations from '@/core/hooks/useTranslations';
import { OrderSummaryType } from '@/order/types/order-summary.types';
import {
  getOrderSummaryDiscountPrice,
  getOrderSummaryGrandTotalPrice,
  getOrderSummaryShippingPrice,
  getOrderSummarySubTotalPrice,
  getOrderSummaryTaxPrice,
} from '@/order/utils/order-summary-utils';

import { StyledDiv } from './style';

type PropsType = {
  orderSummary: OrderSummaryType | null;
};

const PriceSummary = ({ orderSummary }: PropsType) => {
  const priceFormat = {
    formatted_final_price: orderSummary?.formatted_final_price,
    formatted_recommended_price: orderSummary?.formatted_recommended_price,
  };
  const { _t } = useTranslations();

  const taxAmount = orderSummary?.total_tax_amount;

  const discountAmount = orderSummary?.discount_amount;

  //Update later , in b2b integration
  // TODO: what should we update it to? assigned to @amisha
  const user = null;

  const subTotalPrice = getOrderSummarySubTotalPrice(user, priceFormat);
  const shippingPrice = getOrderSummaryShippingPrice(user, priceFormat);
  const grandTotalPrice = getOrderSummaryGrandTotalPrice(user, priceFormat);
  const taxPrice = getOrderSummaryTaxPrice(user, priceFormat);
  const discountPrice = getOrderSummaryDiscountPrice(user, priceFormat);

  return (
    <StyledDiv className="order-summary-block">
      <div className="order-wrap">
        {/* <div className="item-list">
          <p className="item-title">{_t('total_items', 'Total Items')}</p>
          <p className="item-price">{orderSummary?.items_count}</p>
        </div> */}

        <div className="item-list">
          <p className="item-title">{_t('sub_total', 'Sub Total')}</p>
          <p className="item-price">{subTotalPrice}</p>
        </div>

        {Number(discountAmount) > 0 ? (
          <div className="item-list">
            <p className="item-title">
              {_t('discount_amount', 'Discount Amount')}
            </p>
            <p className="item-price">{discountPrice}</p>
          </div>
        ) : null}
        {Number(orderSummary?.shipping_inc_tax) > 0 ? (
          <div className="item-list">
            <p className="item-title">{_t('shipping', 'Shipping')}</p>
            <p className="item-price">{shippingPrice}</p>
          </div>
        ) : null}
        {Number(taxAmount) > 0 ? (
          <div className="item-list">
            <p className="item-title">{_t('included_tax', 'Included Tax')}</p>
            <p className="item-price">{taxPrice}</p>
          </div>
        ) : null}
      </div>
      <div className="order-wrap total-order">
        <div className="item-list">
          <p className="item-title">{_t('total', 'Total')}</p>
          <p className="item-price">{grandTotalPrice}</p>
        </div>
      </div>
    </StyledDiv>
  );
};

export default PriceSummary;

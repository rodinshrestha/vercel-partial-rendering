'use client';

import React from 'react';

import { OrderDetailsType } from '@/account/types/order.types';
import Button from '@/core/components/Button';
import useTranslations from '@/core/hooks/useTranslations';

import OrderTable from '../OrderTable';

import { OrderDetailsWrap } from './style';
import OrderItemList from './OrderItemList';

export type Props = {
  data: OrderDetailsType;
  loading?: boolean;
};

const OrderDetails = ({ data }: Props) => {
  const { _t } = useTranslations();

  React.useEffect(() => {
    const titleNode = document.querySelector('#page-title-text');

    if (titleNode && data.increment_id) {
      titleNode.innerHTML = `${_t('order', 'order')} #${data.increment_id}`;
    }
  }, [data.increment_id, _t]);

  const handlePrint = () => window.print();

  return (
    <OrderDetailsWrap>
      {data ? (
        <OrderTable
          hasActionBtn={false}
          order={data}
          address={{
            address1: data.shipping_address.address1,
            postal: data.shipping_address.postal_code,
            country: data.shipping_address.country_code,
            city: data.shipping_address.city_name,
          }}
        />
      ) : null}

      <OrderItemList data={data} />
      <div className="btn-wrapper">
        <Button skin="dark" variant="link" onClick={handlePrint}>
          {_t('print', 'Print')}
        </Button>
      </div>
    </OrderDetailsWrap>
  );
};

export default OrderDetails;

import React from 'react';

import { OrderType } from '../../types/order.types';

import OrderTable from './OrderTable';
import { OrderSection } from './style';
import OrderPagination from './OrderPagination';

export type Props = {
  data: OrderType | null;
  searchParams: { [key: string]: string };
  loading?: boolean;
};

const OrderPage = async ({ data, searchParams }: Props) => {
  return (
    <OrderSection>
      {data?.data?.length ? (
        <>
          {data.data.map((order) => (
            <OrderTable
              key={order.id}
              order={order}
              address={{
                address1: order.shipping_address.address1,
                postal: order.shipping_address.postal_code,
                country: order.shipping_address.country_code,
                city: order.shipping_address.city_name,
              }}
              hasImage
            />
          ))}
          <OrderPagination data={data} searchParams={searchParams} />
        </>
      ) : null}
    </OrderSection>
  );
};

export default OrderPage;

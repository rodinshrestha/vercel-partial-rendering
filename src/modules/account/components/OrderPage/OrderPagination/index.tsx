'use client';
import React from 'react';

import useTranslations from '@/core/hooks/useTranslations';
import Pagination from '@/core/components/Pagination';
import { PageProps } from '@/core/types/page.types';
import { ORDER_PAGINATION_LIMIT } from '@/order/constants/order.constants';
import { OrderType } from '@/account/types/order.types';

type OrderPaginationProps = {
  data: OrderType;
  searchParams: PageProps['searchParams'];
};
const OrderPagination = ({ data, searchParams }: OrderPaginationProps) => {
  const { _t } = useTranslations();
  return (
    <Pagination
      paginationName={_t('orders', 'Orders')}
      query="page"
      showPerPageData={data?.data.length}
      searchParams={searchParams}
      paginationLimit={ORDER_PAGINATION_LIMIT}
      totalData={data?.meta.total}
      length={data?.meta.last_page || 1}
    />
  );
};

export default OrderPagination;

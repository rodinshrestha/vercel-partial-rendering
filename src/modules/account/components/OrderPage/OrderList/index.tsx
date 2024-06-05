import React from "react";

import { PageProps } from "@/core/types/page-props.types";
import { OrderDetailsType, OrderType } from "@/account/types/order.types";
import { makeHeaders } from "@/core/utils/header";
import { getUserOrders } from "@/order/services/order-service";

import OrderPage from "..";

export type Props = {
  data: OrderType;
  orderDetails: OrderDetailsType;
  searchParams: { [key: string]: string };
  loading?: boolean;
};

const OrderList = async ({ searchParams }: PageProps) => {
  const { page } = searchParams;

  const headers = makeHeaders();

  const orderData = await getUserOrders(headers, page);

  return <OrderPage data={orderData} searchParams={searchParams} />;
};

export default OrderList;

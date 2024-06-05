import React from "react";

import { PageProps } from "@/core/types/page-props.types";
import { findOrder } from "@/order/services/order-service";
import { makeHeaders } from "@/core/utils/header";
import OrderDetails from "@/account/components/OrderPage/OrderDetails";

const Page = async ({ params }: PageProps<"orderId">) => {
  const { orderId } = params;
  const headers = makeHeaders();

  const { data: order } = await findOrder(headers, orderId as string);

  return <OrderDetails data={order} />;
};

export default Page;

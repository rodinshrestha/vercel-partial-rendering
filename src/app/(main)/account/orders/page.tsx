import { Suspense } from "react";

import { PageProps } from "@/core/types/page-props.types";
import OrderList from "@/account/components/OrderPage/OrderList";
import OrderLoading from "@/account/components/OrderPage/OrderLoading";

export async function generateMetadata() {
  return {
    title: "Order",
    description: "Order Page",
  };
}

const OrderPage = async ({ params, searchParams }: PageProps<"id">) => {
  return (
    <Suspense
      key={JSON.stringify({ ...searchParams })}
      fallback={<OrderLoading />}
    >
      <OrderList searchParams={searchParams} params={params} />
    </Suspense>
  );
};

export default OrderPage;

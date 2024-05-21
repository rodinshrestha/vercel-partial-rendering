import { notFound } from "next/navigation";

import { HeaderType } from "@/core/types/api-headers.types";
import { publicAxios } from "@/core/utils/axios";
import { executeFetch } from "@/lib/execute-fetch";
//TODO: add account type
// import { OrderDetailsType } from '@/account/types/order.types';

import { ORDER_PAGINATION_LIMIT } from "../constants/order.constants";

export const createOrderConfirmation = (headers: HeaderType, cart_id: string) =>
  publicAxios.post(
    `/sf/checkout/${cart_id}/order`,
    {},
    {
      headers,
    }
  );

export const getOrderConfirmation = async (
  headers: HeaderType,
  cart_id: string
) => {
  return publicAxios.get(`/sf/checkout/${cart_id}/order`, { headers });
};

export const getUserOrders = async (headers: HeadersInit, page = "1") => {
  const response = await executeFetch(
    `/sf/user/orders?page=${page}&per_page=${ORDER_PAGINATION_LIMIT}`,
    {
      headers,
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    return { data: [], link: "", meta: "", error: true };
  }
  return await response.json();
};

export const findOrder = async (headers: HeadersInit, id: string) => {
  const response = await executeFetch(`/sf/user/orders/${id}`, {
    headers,
    cache: "no-cache",
  });
  if (!response.ok) {
    return notFound();
  }
  return (await response.json()) as { data: any };
};

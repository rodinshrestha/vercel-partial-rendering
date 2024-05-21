import { HeaderType } from "@/core/types/api-headers.types";
import { publicAxios } from "@/core/utils/axios";
import { executeFetch } from "@/lib/execute-fetch";

type PostBodyType = {
  items: Array<{
    [key: string]: string | number;
  }>;
};

type AdditionalCartHeaderProps = {
  action: "create" | "delete" | "update";
};

export const getCartItems = (headers: HeaderType & AdditionalCartHeaderProps) =>
  publicAxios.get("/sf/checkout/cart", { headers });

export const postCart = (body: PostBodyType, headers: HeaderType) =>
  publicAxios.post(`/sf/checkout/cart`, body, { headers });

export const removeAllCartItem = (headers: HeaderType) =>
  publicAxios.delete(`/sf/checkout/cart`, { headers });

export const getCart = async (headers: HeadersInit) => {
  const response = await executeFetch(`/sf/checkout/cart`, {
    headers,
    cache: "no-cache",
  });

  return await response.json();
};

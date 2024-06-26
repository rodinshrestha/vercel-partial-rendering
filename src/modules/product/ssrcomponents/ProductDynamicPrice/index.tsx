import "server-only";

import React from "react";

import { makeHeaders } from "@/core/utils/header";
import { getProduct } from "@/product/services/product-service";
import ProductPrice from "@/product/components/Product/ProductPrice/ProductPrice";
import { ProductTypes } from "@/product/types/product.types";
import ProductWishlist from "@/product/components/ProductWishlist";
import { fetchProfile } from "@/auth/services/auth-service";

type Props = {
  productSlug: string;
  productData: ProductTypes;
};

const ProductDynamicPrice = async ({ productSlug, productData }: Props) => {
  const headers = makeHeaders();

  let data = productData;

  const user = await fetchProfile();

  if (headers?.Authorization) {
    data = (await getProduct({ slug: productSlug, headers, cache: false }))
      ?.data;
  }

  return (
    <>
      <ProductPrice productData={data} />
      <ProductWishlist productData={data} user={user?.data || null} />
    </>
  );
};

export default ProductDynamicPrice;

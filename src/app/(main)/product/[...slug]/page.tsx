// import { Suspense } from "react";

import { Suspense } from "react";

import { redirect } from "next/navigation";

import { PageProps } from "@/core/types/page-props.types";
import { getMetaData } from "@/core/utils/format";
import { makeStaticHeaders } from "@/core/utils/static-header";
import Product from "@/product/page";
import { getProduct } from "@/product/services/product-service";
import { VariationProductDetails } from "@/product/types/product.types";
import {
  getGroupByZeroProductNature,
  pluckProductVaraint,
} from "@/product/utils/get-product-group-by-nature";
import { GROUP_BY_ZERO_PARENT_NOT_VISIBLE } from "@/product/constants/product.constant";
import ProductDynamicPrice from "@/product/ssrcomponents/ProductDynamicPrice";

export async function generateMetadata({ params }: PageProps<"slug">) {
  const { slug }: any = params;

  const [urlKey = ""] = slug || [];
  const headers = makeStaticHeaders();

  const { data } = await getProduct(urlKey, headers);

  const { title, description, keywords } = getMetaData(data);

  return {
    title,
    description,
    keywords,
  };
}

const Page = async ({ params }: PageProps<"slug">) => {
  const { slug }: any = params;

  const [urlKey = "", sku = ""] = slug || [];

  const headers = makeStaticHeaders();
  const { data } = await getProduct(urlKey, headers);

  let pluckVariantDetailsFromSKU: VariationProductDetails | null = null;

  const productGroupByZeroNature = getGroupByZeroProductNature(data);

  if (sku || productGroupByZeroNature === GROUP_BY_ZERO_PARENT_NOT_VISIBLE) {
    pluckVariantDetailsFromSKU = pluckProductVaraint(data, sku, urlKey);

    // the sku is valid removes the sku from the url.
    if (!pluckVariantDetailsFromSKU) {
      redirect(`/product/${urlKey}`);
    }
  }

  return (
    <Product
      productData={data}
      slug={urlKey}
      pluckVariantDetailsFromSKU={pluckVariantDetailsFromSKU}
      //Product and variant slug
      productWithSlug={slug as any}
    >
      <Suspense fallback={<p>Loading.....</p>}>
        <ProductDynamicPrice productSlug={urlKey} productData={data} />
      </Suspense>
    </Product>
  );
};

export default Page;

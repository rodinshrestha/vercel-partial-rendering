import React from "react";

import {
  getCategoryFilters,
  getCategoryProducts,
} from "@/category/services/category-service";
import { makeStaticHeaders } from "@/core/utils/static-header";
import CategorySingleLayout from "@/category/components/CategorySingleLayout/CategorySingleLayout";
import { CategoryDataTypes } from "@/category/types/category.types";

type Props = {
  slug: string;
  searchParams: { [key: string]: string };
  categoryData: CategoryDataTypes;
};
const CategoryProduct = async ({ slug, searchParams, categoryData }: Props) => {
  const headers = makeStaticHeaders();

  const [categoryFilter, categoryProduct] = await Promise.all([
    getCategoryFilters(slug, headers),
    getCategoryProducts(slug, headers, searchParams),
  ]).then((res) => res);

  return (
    <CategorySingleLayout
      data={categoryData}
      filterAttributes={categoryFilter.data}
      searchParams={searchParams}
      loader={false}
      categoryProducts={categoryProduct?.data?.products || null}
    />
  );
};

export default CategoryProduct;

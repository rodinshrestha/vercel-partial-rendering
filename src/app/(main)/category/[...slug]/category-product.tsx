import React from "react";

import {
  getCategoryFilters,
  getCategoryProducts,
} from "@/category/services/category-service";
import CategorySingleLayout from "@/category/components/CategorySingleLayout/CategorySingleLayout";
import { CategoryDataTypes } from "@/category/types/category.types";
import { makeHeaders } from "@/core/utils/header";
import { fetchProfile } from "@/auth/services/auth-service";

type Props = {
  slug: string;
  searchParams: { [key: string]: string };
  categoryData: CategoryDataTypes;
};
const CategoryProduct = async ({ slug, searchParams, categoryData }: Props) => {
  const headers = makeHeaders();

  const [categoryFilter, categoryProduct, user] = await Promise.all([
    getCategoryFilters(slug, headers),
    getCategoryProducts(slug, headers, searchParams),
    fetchProfile(),
  ]).then((res) => res);

  return (
    <CategorySingleLayout
      data={categoryData}
      filterAttributes={categoryFilter.data}
      searchParams={searchParams}
      loader={false}
      categoryProducts={categoryProduct?.data?.products || null}
      user={user?.data || null}
    />
  );
};

export default CategoryProduct;

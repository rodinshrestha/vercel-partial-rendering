import { Suspense } from "react";

import Category from "@/category/page";
import { PageProps } from "@/core/types/page-props.types";
import { makeStaticHeaders } from "@/core/utils/static-header";
import { getCategory } from "@/category/services/category-service";

import CategoryProduct from "./category-product";

const Page = async ({ params, searchParams }: PageProps<"slug">) => {
  const { slug } = params;

  const headers = makeStaticHeaders();
  const { data: categoryData } = await getCategory(slug as string, headers);

  return (
    <Category
      categoryData={categoryData}
      searchParams={searchParams}
      categorySlug={slug as string}
    >
      <Suspense
        fallback={<p>Product loading....</p>}
        key={JSON.stringify({ ...searchParams })}
      >
        <CategoryProduct
          categoryData={categoryData}
          searchParams={searchParams}
          slug={slug as string}
        />
      </Suspense>
    </Category>
  );
};

export default Page;

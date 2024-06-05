// import { notFound } from "next/navigation";

import { Suspense } from "react";

import { notFound } from "next/navigation";

import { categoryRevalidate } from "@/category/constants/revalidate";
import Category from "@/category/page";
import { CategoryDataTypes } from "@/category/types/category.types";
// import { getCategory } from "@/category/services/category-service";
import { PageProps } from "@/core/types/page-props.types";
import { makeStaticHeaders } from "@/core/utils/static-header";
import { executeFetch } from "@/lib/execute-fetch";

import CategoryProduct from "./category-product";

export async function generateStaticParams() {
  return [];
}

const getCategory = async (slug: string, headers: HeadersInit) => {
  const _slug = Array.isArray(slug) ? slug.join("/") : slug;
  const actualSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const response = await executeFetch(`/sf/categories/${_slug}`, {
    headers,
    next: {
      tags: ["category", `category-${actualSlug}`, "all"],
      revalidate: categoryRevalidate,
    },
  });
  if (!response.ok) {
    notFound();
  }
  return (await response.json()) as { data: CategoryDataTypes };
};

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
      <Suspense fallback={<p>Product loading....</p>}>
        <CategoryProduct
          categoryData={categoryData}
          searchParams={searchParams}
          slug={slug as any}
        />
      </Suspense>
    </Category>
  );
};

export default Page;

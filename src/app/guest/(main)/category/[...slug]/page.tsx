import { notFound } from "next/navigation";

import { categoryRevalidate } from "@/category/constants/revalidate";
import Category from "@/category/page";
import { CategoryDataTypes } from "@/category/types/category.types";
// import { getCategory } from "@/category/services/category-service";
import { PageProps } from "@/core/types/page-props.types";
import { getMetaData } from "@/core/utils/format";
import { makeStaticHeaders } from "@/core/utils/static-header";
import { executeFetch } from "@/lib/execute-fetch";

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

export async function generateMetadata({ params }: PageProps<"slug">) {
  const { slug } = params;

  const headers = makeStaticHeaders();
  const { data } = await getCategory(slug as string, headers);

  const defaultData = {
    title: "Category",
    description: "Category Page",
    keywords: "category",
  };
  const { title, description, keywords } = getMetaData(data, defaultData);

  return {
    title,
    description,
    keywords,
  };
}

const Page = async ({ params, searchParams }: PageProps<"slug">) => {
  const { slug } = params;

  const headers = makeStaticHeaders();
  const { data: categoryData } = await getCategory(slug as string, headers);

  // const key = JSON.stringify({ ...searchParams, dialog: undefined });

  return (
    <>
      <Category
        categoryData={categoryData}
        searchParams={searchParams}
        categorySlug={slug as string}
      >
        {/* <Suspense key={key} fallback={<CategoryProductLoader />}>
          <CategoryProduct
            searchParams={searchParams}
            slug={slug as string}
            categoryData={categoryData}
          />
        </Suspense> */}
        <p>Product</p>
      </Category>
    </>
  );
};

export default Page;

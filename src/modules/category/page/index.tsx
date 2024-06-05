import React from "react";

import dynamic from "next/dynamic";

import CategoryBreadCrumb from "@/category/components/CategoryBreadCrumb";
import CategoryTitle from "@/category/components/CategoryTitle";
import { CategoryDataTypes } from "@/category/types/category.types";
import CategoryListing from "@/category/components/CategoryListing";
import { PageProps } from "@/core/types/page-props.types";
import Builder from "@/builder/index";

const CategoryHeroBanner = dynamic(
  () => import("@/category/components/CategoryHeroBanner")
);

type Props = {
  categoryData: CategoryDataTypes;
  searchParams: PageProps["searchParams"];
  categorySlug: string;
  children: React.ReactNode;
};

const Category = ({ categoryData, children }: Props) => {
  const { hero_banner, sub_categories, name } = categoryData;

  const showHeroBanner = Boolean(hero_banner && hero_banner.background_type);

  return (
    <>
      <CategoryBreadCrumb data={categoryData} />

      {showHeroBanner && <CategoryHeroBanner heroBanner={hero_banner} />}

      <CategoryTitle title={name} />

      {!!sub_categories.length && (
        <CategoryListing subCategories={sub_categories as any} />
      )}
      {children}

      {!!categoryData.components.length &&
        categoryData.components.map((component, index) => (
          <Builder component={component} key={index} />
        ))}
    </>
  );
};

export default Category;

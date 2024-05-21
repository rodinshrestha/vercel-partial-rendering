"use client";
import React from "react";

import { PageProps } from "@/core/types/page-props.types";
import toastAlert from "@/core/utils/toast";
import { filterQueryResponse } from "@/core/utils/url";
import useHeaders from "@/core/hooks/useHeaders";

import {
  CategoryDataTypes,
  CategoryProductTypes,
} from "../types/category.types";
import { loadMoreCategories } from "../services/category-service";

type ContextTypes = {
  categoryProducts: CategoryProductTypes | null;
  setCategoryProducts: React.Dispatch<
    React.SetStateAction<CategoryProductTypes | null>
  >;
  categoryProductLoader: boolean;
  setCategoryProductLoader: React.Dispatch<React.SetStateAction<boolean>>;
  handleLoadMore: () => void;
  setCategoryCurrentSlug: React.Dispatch<React.SetStateAction<string>>;
  categoryCurrentSlug: string;
};

const initialValues: ContextTypes = {
  categoryProducts: null,
  categoryCurrentSlug: "",
  setCategoryCurrentSlug: () => {
    //
  },
  setCategoryProducts: () => {
    //
  },
  categoryProductLoader: false,
  setCategoryProductLoader: () => {
    //
  },
  handleLoadMore: () => {
    //
  },
};

export const CategoryProductContext = React.createContext(initialValues);

type Props = {
  children: React.ReactNode;
  cagtegorySlug: string;
  filterQueries: PageProps["searchParams"];
  categoryData: CategoryDataTypes;
};

const CategoryProvider = ({
  children,
  cagtegorySlug,
  filterQueries,
  categoryData,
}: Props) => {
  const [categoryProducts, setCategoryProducts] =
    React.useState<CategoryProductTypes | null>(
      categoryData?.products.products || []
    );
  const [categoryProductLoader, setCategoryProductLoader] =
    React.useState(false);
  const [categoryCurrentSlug, setCategoryCurrentSlug] =
    React.useState(cagtegorySlug);

  const { clientHeaders } = useHeaders();

  const handleLoadMore = React.useCallback(() => {
    setCategoryProductLoader(true);
    const params = filterQueryResponse(filterQueries);
    loadMoreCategories(
      clientHeaders,
      cagtegorySlug,
      params,
      categoryProducts?.current_page || 1
    )
      .then((res) => {
        setCategoryProducts((prev) => {
          if (!prev) return prev;

          return {
            ...res.data.data.products,
            data: [...prev.data, ...res.data.data.products.data],
          };
        });
        setCategoryProductLoader(false);
      })
      .catch((err) => {
        toastAlert(err, "error");
        setCategoryProductLoader(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cagtegorySlug, categoryProducts?.current_page, clientHeaders]);

  return (
    <CategoryProductContext.Provider
      value={{
        categoryProductLoader,
        categoryProducts,
        setCategoryProductLoader,
        setCategoryProducts,
        handleLoadMore,
        categoryCurrentSlug,
        setCategoryCurrentSlug,
      }}
    >
      {children}
    </CategoryProductContext.Provider>
  );
};

export default CategoryProvider;

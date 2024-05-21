import { BuilderComponentTypes } from "@/builder/types/builder.types";

export type PageProps<T extends string = "channel" | "store"> = {
  params: {
    channel: string;
    store: string;
  } & { [key in T]: string | string[] };

  searchParams: { [key: string]: string };
};

/** SEO type for page */
export type SeoType = {
  name?: string;
  search_engine_optimization: Record<
    | "meta_title"
    | "meta_keywords"
    | "meta_description"
    | "seo_title"
    | "seo_description",
    string | null
  >;
};
export type MetaType = Record<"title" | "description" | "keywords", string>;

/** Page API Type */
export type PageResponse = {
  id: string;
  title: string;
  components: BuilderComponentTypes[];
  search_engine_optimization: Record<
    | "meta_title"
    | "meta_keywords"
    | "meta_description"
    | "seo_title"
    | "seo_description",
    string | null
  >;
};

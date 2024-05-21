export type CategoryType = {
  category: {
    id?: string;
    parent_id?: string | null;
    name: string;
    custom_name: string;
    url_key: string;
    image: string | null;
    description: string;
  };
  use_custom_title_image: number;
  content_module_title: string;
  image: string;
};

export type CategoriesProps = {
  categories: Array<CategoryType>;
  content_layout: string;
};

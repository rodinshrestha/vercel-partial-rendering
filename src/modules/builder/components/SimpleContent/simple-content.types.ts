export type SimpleContentModuleTypes = {
  content_module: {
    sub_content_module: SimpleContentModuleData;
  };
};

export type SimpleContentModuleData = {
  /** Simple content description data */
  content: string;

  /** Simple content image URL */
  image: string;

  /** Simple conten title */
  title: string;
};

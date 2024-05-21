import { SimpleContentModuleTypes } from "./simple-content.types";

export const simpleContentHelpers = (module: SimpleContentModuleTypes) => {
  const { sub_content_module } = module.content_module;
  return {
    title: sub_content_module.title ?? "",
    content: sub_content_module.content ?? "",
  };
};

import { AccordionModule } from "./accordion.types";

export const accordionModuleHelper = (module: AccordionModule) => {
  const { sub_content_module } = module.content_module;
  return {
    title: sub_content_module.title,
    content: sub_content_module.content,
    accordionRepeater: sub_content_module.accordion_content,
  };
};

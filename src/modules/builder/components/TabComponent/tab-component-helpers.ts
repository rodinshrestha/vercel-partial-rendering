import { TabComponentModules } from "./tab-component.modules.types";

export const tabComponentHelpers = (module: TabComponentModules) => {
  const { sub_content_module } = module.content_module;

  return {
    title: sub_content_module.title || "",
    subTitle: sub_content_module.sub_title || "",
    content: sub_content_module.content || "",
    layoutType: sub_content_module.layout_type,
    tabLayoutList: sub_content_module.tab_layout || [],
    button_layout: sub_content_module.button_layout || [],
  };
};

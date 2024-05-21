import React from "react";

import TabLayout from "../TabLayout";
import ButtonLayout from "../ButtonLayout";
import {
  ButtonLayoutData,
  TabLayoutData,
  TabLayoutType,
} from "../../tab-component.modules.types";

type Props = {
  layoutType: TabLayoutType;
  tabLayoutList: Array<TabLayoutData>;
  button_layout: Array<ButtonLayoutData>;
};

const TabController = ({ layoutType, tabLayoutList, button_layout }: Props) => {
  switch (layoutType) {
    case "tab_layout":
      return <TabLayout tabLayoutList={tabLayoutList} />;

    case "button_layout":
      return <ButtonLayout button_layout={button_layout} />;

    default:
      return null;
  }
};

export default TabController;

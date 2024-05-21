import {
  ButtonLayoutData,
  ButtonLayoutRepeaterTypes,
} from "../../tab-component.modules.types";

export type InitializeButtonLayoutReturnType = {
  buttonTitle: string;
  buttonChildren: Array<ButtonLayoutRepeaterTypes>;
  selectedSubButton: string | null;
  content_type: string | null;
  renderContent: string | null;
};

export const initializeButtonLayout = (
  button_layout: Array<ButtonLayoutData>
): InitializeButtonLayoutReturnType => {
  return {
    buttonTitle:
      Array.isArray(button_layout) && button_layout.length
        ? button_layout[0].button_label
        : "",
    buttonChildren:
      Array.isArray(button_layout) && button_layout.length
        ? button_layout[0].button_layout_repeater
        : [],
    selectedSubButton:
      Array.isArray(button_layout) &&
      button_layout.length &&
      Array.isArray(button_layout[0].button_layout_repeater)
        ? button_layout[0].button_layout_repeater[0].repeater_button_label
        : "",
    content_type:
      Array.isArray(button_layout) &&
      button_layout.length &&
      Array.isArray(button_layout[0].button_layout_repeater)
        ? button_layout[0].button_layout_repeater[0].content_type
        : "",
    renderContent:
      Array.isArray(button_layout) &&
      button_layout.length &&
      Array.isArray(button_layout[0].button_layout_repeater)
        ? button_layout[0].button_layout_repeater[0]?.texteditor ||
          button_layout[0].button_layout_repeater[0]?.image ||
          //Expecting there is no sub children
          button_layout[0].texteditor ||
          button_layout[0].image
        : "",
  };
};

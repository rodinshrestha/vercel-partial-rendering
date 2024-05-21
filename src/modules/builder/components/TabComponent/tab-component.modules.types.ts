export type TabComponentModules = {
  content_module: {
    sub_content_module: TabComponentModuleData;
  };
};

export type TabLayoutType = 'tab_layout' | 'button_layout';

export type TabComponentModuleData = {
  /** Tab compoenent title */
  title: string;

  /** Tab component sub title */
  sub_title: string;

  /** Tab component content */
  content: string;

  /** Tab compoennt layout types */
  layout_type: TabLayoutType;

  /** Tab layout types */
  tab_layout: Array<TabLayoutData>;

  /** Tab button types */
  button_layout: Array<ButtonLayoutData>;
};

export type ButtonLayoutData = {
  /** Button label */
  button_label: string;

  /** Button content type  */
  content_type: string | null;

  /** Check button laout has children */
  has_button_layout_children_repeater: boolean;

  /** Button layout image */
  image: string | null;

  /** Button layout  content editor */
  texteditor: string | null;

  /** Button layout title */
  title: string | null;

  /** Button layout repeater */
  button_layout_repeater: Array<ButtonLayoutRepeaterTypes>;
};

export type ButtonLayoutRepeaterTypes = {
  /** Button layout type content repeater */
  content_type: string;

  /** Button layout image */
  image: string | null;

  /** Button reeapter button label */
  repeater_button_label: string | null;

  /** Button layout text editor */
  texteditor: string | null;

  /** Button repeater layout title */
  title: string | null;
};

export type TabLayoutData = {
  /** Tab layout title */
  title: string;

  /** Tab layout content type */
  content_type: string;

  /** Tab layout image  */
  image: string | null;

  /** Tab layout texteditor */
  texteditor: string | null;
};

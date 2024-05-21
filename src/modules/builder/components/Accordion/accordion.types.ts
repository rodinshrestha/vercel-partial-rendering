export type AccordionModule = {
  content_module: {
    sub_content_module: AccordionSubModuleTypes;
  };
};

export type AccordionSubModuleTypes = {
  /** title of the accordion */
  title: string;

  /** Title content */
  content: string;

  /** Accordion content */
  accordion_content: Array<AccordionContentTypes>;
};

export type AccordionContentTypes = {
  /** Accordion title  */
  title: string;

  /** Accordion content type */
  content_type: string;

  /** Accordion image */
  image: string | null;

  /** Accroding text editor */
  texteditor: string;
};

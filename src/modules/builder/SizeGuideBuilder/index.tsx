import StyledAccordion from '../components/Accordion';
import { accordionModuleHelper } from '../components/Accordion/accordion-helpers';
import BackgroundContentPage from '../components/BackgroundContent';
import SimpleContent from '../components/SimpleContent';
import { simpleContentHelpers } from '../components/SimpleContent/simple-content.helpers';
import TabComponent from '../components/TabComponent';
import { tabComponentHelpers } from '../components/TabComponent/tab-component-helpers';
import {
  ACCORDION,
  SIMPLE_CONTENT,
  TAB_COMPONENT,
} from '../constants/builder.constants';
import { BuilderComponentTypes } from '../types/builder.types';
import { rowAttributes } from '../utils/row-settings-utils';
import { sectionAttributes } from '../utils/section-settings-utils';

type Props = {
  component: BuilderComponentTypes;
};
const SizeGuideBuilder = ({ component }: Props) => {
  const {
    identifier,
    value: { module, row_settings, section_settings },
  } = component;
  // TODO: REMOVE IF NOT used in jackson
  // if yes then solve the any type
  switch (identifier as any) {
    case ACCORDION:
      return (
        <StyledAccordion
          // TODO: REMOVE IF NOT used in jackson
          // if yes then solve the any type
          {...accordionModuleHelper(module as any)}
          sectionAttributes={sectionAttributes(section_settings)}
          rowAttributes={rowAttributes(row_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );

    case SIMPLE_CONTENT:
      return (
        // TODO: REMOVE IF NOT used in jackson
        // if yes then solve the any type
        <SimpleContent
          {...simpleContentHelpers(module as any)}
          sectionAttributes={sectionAttributes(section_settings)}
          rowAttributes={rowAttributes(row_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );

    case TAB_COMPONENT:
      return (
        <TabComponent
          // TODO: REMOVE IF NOT used in jackson
          // if yes then solve the any type
          {...tabComponentHelpers(module as any)}
          sectionAttributes={sectionAttributes(section_settings)}
          rowAttributes={rowAttributes(row_settings)}
          backgroundContent={
            <BackgroundContentPage sectionSetting={section_settings} />
          }
        />
      );
  }
};
export default SizeGuideBuilder;

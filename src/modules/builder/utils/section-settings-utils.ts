import { SectionSettings } from '../types/builder.types';
import { SectionAttribute } from '../types/section.types';

export const pluckSectionPadding = (section_settings: SectionSettings) => {
  return {
    paddingTop: section_settings.layout.padding_top,
    paddingBottom: section_settings.layout.padding_bottom,
    paddingLeft: section_settings.layout.padding_left,
    paddingRight: section_settings.layout.padding_right,
  };
};

export const pluckSectionBackgroundImageAttributes = (
  section_settings: SectionSettings
) => {
  return {
    backgroundPosition:
      section_settings.section_background.section_background_position,
    backgroundRepeat:
      section_settings.section_background.section_background_repeat,
    backgroundSize: section_settings.section_background.section_background_size,
  };
};

export const pluckSectionSettingGeneral = (
  section_settings: SectionSettings
) => {
  return {
    // adminTitle: section_settings.general.admin_title,
    containerType: section_settings.general.container_type,
  };
};

export const pluckSectionSettingIdAndClasses = (
  section_settings: SectionSettings
) => {
  return {
    id: section_settings.section_advanced.section_custom_id ?? '',
    className: section_settings.section_advanced.section_custom_classes ?? '',
  };
};

// TODO FIX any from down below created by rakesh assgined to rodin
export const pluckSectionBackgroundColor = (
  section_settings: SectionSettings
): any => {
  return {
    background: section_settings.section_background.gradient_color,
    backgroundColor:
      section_settings.section_background.section_background_color,
  };
};

export const pluckSectionBackgroundImage = (
  section_settings: SectionSettings
): any => {
  return {
    backgroundImage:
      section_settings.section_background.section_background_image || '',
  };
};

export const sectionAttributes = (
  section_settings: SectionSettings
): SectionAttribute => {
  return {
    ...pluckSectionPadding(section_settings),
    ...pluckSectionBackgroundImageAttributes(section_settings),
    ...pluckSectionSettingIdAndClasses(section_settings),
    ...pluckSectionBackgroundColor(section_settings),
    ...pluckSectionSettingGeneral(section_settings),
  };
};

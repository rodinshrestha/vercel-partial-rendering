import { RowSettings } from '../types/builder.types';

export const pluckRowSettingsIdAndClasses = (row_settings: RowSettings) => {
  return {
    id: row_settings.row_advanced.row_custom_id,
    className: row_settings.row_advanced.row_custom_classes,
  };
};

export const pluckRowSettingsBackgroundAttribute = (
  row_settings: RowSettings
) => {
  return {
    gutterSpace: row_settings.row_background.no_gutter,
    backgroundColor: row_settings.row_background.row_background_color,
    backgroundImage: row_settings.row_background.row_background_image,
    backgroundPosition: row_settings.row_background.row_background_position,
    backgroundSize: row_settings.row_background.row_background_size,
  };
};

export const rowAttributes = (row_settings: RowSettings) => {
  return {
    ...pluckRowSettingsIdAndClasses(row_settings),
    ...pluckRowSettingsBackgroundAttribute(row_settings),
  };
};

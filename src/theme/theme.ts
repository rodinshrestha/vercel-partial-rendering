import { fontFamily } from './font';
import { color } from './color';
import { typography } from './typography';
import { coreColor } from './coreColor';
import { breakPoints } from './breakPoints';

//👇 Configure our local font object
export const getTheme = () => ({
  typography,
  coreColor,
  color,
  radius: `29px`,
  fontFamily,
  breakPoints,
});

// export default getTheme;

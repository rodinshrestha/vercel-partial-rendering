import { rem } from 'polished';

export const fontMediaQuery = (
  screenSize: number,
  value: number,
  lineHeight: number,
  letterSpacing: number
) => {
  return `@media(max-width: ${screenSize}px){
    font-size: ${rem(value)};
    line-height: ${rem(lineHeight)};
    letter-spacing: ${rem(letterSpacing)};
  }`;
};

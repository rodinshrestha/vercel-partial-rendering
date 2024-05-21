import { productHelpers } from './../../../builder/components/ProductWithSectionTitle/product.helpers';
export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ISectionTitle = {
  className?: string;
  subtitle?: string;
  title?: string;
  content?: string;
  position?: string;
  hasBorder?: boolean;
  titleTag?: HeadingType;
  children?: React.ReactNode;
  borderColor?: 'light' | 'dark';
  iconList?: Array<any>;
  translate?: { [key: string]: number };
  opacity?: number;
  buttonData?: ReturnType<
    typeof productHelpers
  >['sectionTitleData']['buttonData'];
  show_button?: 0 | 1;
};

import React from 'react';

import clsx from 'clsx';

// import Button from '../Button';
import ReactHtmlParser from '../ReactHtmlParser';
import ImageWithFallback from '../ImageWithFallback';

import { StyledDiv } from './style';

// interface IButtonType {
//   button_label: string;
//   button_url?: string;
//   open_in_new_tab: 0 | 1;
//   button_variant: any;
//   button_link_type?: string;
//   custom_link?: boolean;
// }

export interface ISectionTitle {
  className?: string;
  subtitle?: string;
  title?: string;
  content?: string;
  position?: string;
  hasBorder?: boolean;
  titleTag?: string;
  children?: React.ReactNode;
  borderColor?: 'light' | 'dark';
  iconList?: Array<any>;
  translate?: { [key: string]: number };
  opacity?: number;
  // buttonData?: IButtonType | Array<IButtonType>;
}

const SectionTitle = ({
  className,
  title,
  subtitle,
  content,
  position = 'left',
  hasBorder = false,
  titleTag = 'h2',
  children,
  borderColor = 'dark',
  // buttonData,
  iconList,
  // translate,
  // opacity,
}: ISectionTitle) => {
  return (
    <StyledDiv
      className={clsx(
        className,
        'section-heading',
        [`border-color-${borderColor}`],
        {
          'has-border': hasBorder,
        }
      )}
    >
      {(title || subtitle || content) && (
        <div className={position}>
          {subtitle && <span>{subtitle}</span>}
          <h2 className={titleTag}>{title}</h2>

          {content && ReactHtmlParser(content.replaceAll('&nbsp;', ' '))}
        </div>
      )}

      {children}

      {/* {Array.isArray(buttonData) ? (
        <div className={`btn-wrapper ${position}`}>
          {buttonData.map((item, i) => {
            if (!item.button_label && !item.button_url) return null;
            return (
              <Button
                skin="primary"
                key={i}
                variant={item.button_variant}
                href={item.button_url || '#'}
              >
                {item.button_label}
              </Button>
            );
          })}
        </div>
      ) : (
        buttonData?.button_label &&
        buttonData?.button_url && (
          <div className={`btn-wrapper ${position}`}>
            <Button
              skin="primary"
              type="button"
              href={buttonData.button_url || '#'}
              size="md"
              variant={buttonData.button_variant}
            >
              {buttonData.button_label}
            </Button>
          </div>
        )
      )} */}

      {iconList?.length ? (
        <div className="icon-container">
          {iconList?.map((x, i) => {
            return (
              <div className="icon" key={i}>
                <ImageWithFallback
                  src={x?.image || x || ''}
                  alt="Dogman category icon list"
                  fill
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </StyledDiv>
  );
};

export default SectionTitle;

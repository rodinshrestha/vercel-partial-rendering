import React, { FC } from 'react';

import clsx from 'clsx';

import useTranslations from '@/core/hooks/useTranslations';

import { DrawerPosition } from '..';
import EmptyDrawer from '../EmptyDrawer';
import { IconClose } from '../../Icons';

import { DrawerHeader, StyledDiv } from './style';

type Func = () => void;

interface DrawerProps {
  children: React.ReactNode;
  maxWidth?: string;
  minWidth?: string;
  isEmpty?: boolean;
  title: string;
  subTitle?: string;
  onClose: Func;
  empty?: {
    title?: string;
    description?: string;
  };
  width?: number | string;
  footer: React.ReactNode;
  size: 'fullscreen' | 'auto';
  position: DrawerPosition;
  onClearClick?: Func;
  showClearAction?: boolean;
  hasHeader?: boolean;
  hasHeaderBorder?: boolean;
}

interface headerProps {
  title: string;
  subTitle?: string;
  onClose: Func;
  onClearClick?: Func;
  showClearAction?: boolean;
  hasHeaderBorder?: boolean;
}
const Header = ({
  title,
  subTitle = '',
  onClose,
  onClearClick,
  showClearAction = false,
  hasHeaderBorder = false,
}: headerProps) => {
  const { _t } = useTranslations();

  return (
    <>
      <DrawerHeader
        className="drawer-header"
        $hasHeaderBorder={hasHeaderBorder}
      >
        <div className="drawer-header-wrapper">
          {title && (
            <div className={clsx('drawer-header-title')}>
              <h3 className="drawer-title">{title}</h3>

              {subTitle ? <span className="sub-title">{subTitle}</span> : null}
            </div>
          )}
          <i className="icon-close" onClick={onClose}>
            <IconClose size={13} />
          </i>
        </div>
        {showClearAction && (
          <h6 className="action-clear" onClick={onClearClick}>
            {_t('clear_cart', 'Clear Cart')}
          </h6>
        )}
      </DrawerHeader>
    </>
  );
};

const DrawerContent: FC<DrawerProps> = ({
  children,
  isEmpty,
  title,
  subTitle,
  footer,
  onClose,
  size,
  empty,
  position = 'right',
  width = '25%',
  maxWidth,
  minWidth,
  onClearClick,
  showClearAction,
  hasHeader = true,
  hasHeaderBorder = true,
}) => {
  return (
    <StyledDiv
      className={clsx({ 'empty-drawer': isEmpty }, 'drawer-wrap', position)}
      size={size}
      style={{
        maxWidth: maxWidth,
        minWidth: minWidth,
      }}
      width={width}
    >
      {hasHeader && (
        <Header
          title={title}
          subTitle={subTitle}
          onClose={onClose}
          onClearClick={onClearClick}
          showClearAction={showClearAction}
          hasHeaderBorder={hasHeaderBorder}
        />
      )}
      {isEmpty ? (
        <EmptyDrawer title={empty?.title} description={empty?.description} />
      ) : (
        <>
          <div className="drawer-body"> {children}</div>

          {footer && <div className="drawer-footer">{footer}</div>}
        </>
      )}
    </StyledDiv>
  );
};

export default DrawerContent;

import React from 'react';

import clsx from 'clsx';

import { SkinType } from '../Button';

import { StyledLoader } from './style';

type LoaderProps = {
  color: SkinType;
  className?: string;
  type?: 'spinner' | 'growing-loader';
  size?: string;
};

/**
 *
 *  Need to set position relative to its parent div to function properly
 */
const Loader = ({
  className,
  type = 'spinner',
  size = '18px',
  color = 'body',
}: LoaderProps) => {
  return (
    <StyledLoader $size={size} className="loader-wrap" $color={color}>
      <div className={clsx(className, type)} />
    </StyledLoader>
  );
};

export default Loader;

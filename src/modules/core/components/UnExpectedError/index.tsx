'use client';
import React from 'react';

import clsx from 'clsx';

import useTranslations from '@/core/hooks/useTranslations';
// import useVendor from '@/hooks/useVendor';
import Button from '@/core/components/Button';

import { StyledDiv } from './style';

//NEED to re work on translation
type props = {
  title: string;
  content: string;
  onResetError: () => void;
  className?: string;
  height?: number | string;
};

const UnexpectedError = ({
  title,
  content,
  className,
  onResetError,
  height = 'calc(100vh - 131px)',
}: props) => {
  const { _t } = useTranslations();

  return (
    <StyledDiv
      height={height}
      className={clsx(className, 'message-content server-error')}
    >
      <div className="content-wrapper">
        <h1>
          <strong>{title}</strong>
        </h1>

        <p>{content}</p>

        <div className="btn-wrapper">
          <Button
            skin="primary"
            variant="contained"
            onClick={onResetError}
            asSelfLink
          >
            {_t('retry', 'Retry') || 'Retry'}
          </Button>

          <Button skin="primary" variant="contained" href="/" asSelfLink>
            {_t('back_to_home', 'Take me back home') || 'Take me back home'}
          </Button>
        </div>
      </div>
    </StyledDiv>
  );
};

export default UnexpectedError;

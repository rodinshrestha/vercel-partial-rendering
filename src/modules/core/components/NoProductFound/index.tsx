import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

import useTranslations from '@/core/hooks/useTranslations';

const NoProductFound = () => {
  const { _t } = useTranslations();
  return (
    <StyleDiv className="text-center">
      <p> {_t('no_product_found', 'No Product Found')} !</p>
    </StyleDiv>
  );
};

export default NoProductFound;

const StyleDiv = styled.div`
  ${({ theme }) => css`
    min-height: calc(100vh - 50px - 100px - 48px - 91px);
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: ${rem(16)};
      line-height: ${rem(24)};

      @media (max-width: calc(${theme.breakPoints.xlDesktop} + 1px) {
        font-size: ${rem(18)};
        line-height: ${rem(24)};
      }
    }
  `}
`;

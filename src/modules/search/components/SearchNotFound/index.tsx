import React from 'react';

import { rem } from 'polished';
import styled from 'styled-components';

import useTranslations from '@/core/hooks/useTranslations';

const SearchNotFound = () => {
  const { _t } = useTranslations();

  return (
    <StyledDiv className="search-not-found-wrapper">
      <div className="content-wrapper">
        <h3>
          <strong> {_t('sorry', 'Sorry')}! </strong>
        </h3>
        <h6>
          {_t(
            'search_not_found_heading',
            'OOps! Unfortunately, could not find any products that match your search!'
          )}
        </h6>
      </div>
    </StyledDiv>
  );
};

export default SearchNotFound;

const StyledDiv = styled.div`
  &.search-not-found-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100%;

    .content-wrapper {
      text-align: center;
    }

    h3,
    h4,
    h5,
    h6 {
      margin-bottom: ${rem(12)};
    }
  }
`;

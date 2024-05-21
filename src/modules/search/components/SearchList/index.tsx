'use client';
import React from 'react';

import Loader from '@/core/components/Loader';
import { SearchType } from '@/search/types/search.types';
import useTranslations from '@/core/hooks/useTranslations';

import Searchedproduct from '../SearchedProduct';
// import SearchedCategory from '../SearchedCategory';

import { StyledDiv, StyledLoaderDiv } from './style';

type Props = {
  searchData: SearchType | null;
  loader: boolean;
  setIsSearchListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleClose?: () => void;
};

const SearchList = ({
  searchData,
  loader,
  setIsSearchListOpen,
  onHandleClose,
}: Props) => {
  const { _t } = useTranslations();

  const isSearchNotFound =
    !searchData?.products.data.length && !searchData?.categories.data.length;

  if (loader) {
    return (
      <StyledLoaderDiv className="search-loader">
        <Loader color="primary" size="16px" />
      </StyledLoaderDiv>
    );
  }
  return (
    <StyledDiv>
      <div
        className="search-list-outer"
        onClick={() => setIsSearchListOpen(false)}
      />
      <div className="search-list-wrapper">
        {searchData?.products.data.length ? (
          <Searchedproduct
            productData={searchData.products}
            onClose={() => {
              onHandleClose?.();
              setIsSearchListOpen(false);
            }}
          />
        ) : null}

        {isSearchNotFound && (
          <p className="text-center search-not-found ">
            {_t('search_not_found', 'Search not found')}
          </p>
        )}
      </div>
    </StyledDiv>
  );
};

export default SearchList;

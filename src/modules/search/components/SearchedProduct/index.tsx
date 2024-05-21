import React from 'react';

import useTranslations from '@/core/hooks/useTranslations';
import { ProductSearchDetails } from '@/search/types/search.types';

import SearchedTitle from '../SearchedTitle';

import { StyledDiv } from './style';
import SearchedProductList from './SearchedProductList';

type Props = {
  productData: ProductSearchDetails;
  onClose: () => void;
};

const Searchedproduct = ({ productData, onClose }: Props) => {
  const { _t } = useTranslations();

  return (
    <StyledDiv className="search-item">
      <SearchedTitle title={_t('suggested_products', 'SUGGESTED PRODUCTS')} />
      <div className="suggested-product-list">
        {productData?.data.map((x, i) => {
          return (
            <SearchedProductList key={i} productData={x} onClose={onClose} />
          );
        })}
      </div>
    </StyledDiv>
  );
};

export default Searchedproduct;

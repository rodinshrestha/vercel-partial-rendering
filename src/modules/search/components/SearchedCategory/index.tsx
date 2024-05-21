import React from 'react';

import useTranslations from '@/core/hooks/useTranslations';
import { CategorySearchDetails } from '@/search/types/search.types';

import SearchedTitle from '../SearchedTitle';

import SearchedCategoryList from './SearchedCategoryList';

type Props = {
  categoryData: CategorySearchDetails;
  onClose: () => void;
};

const SearchedCategory = ({ categoryData, onClose }: Props) => {
  const { _t } = useTranslations();

  return (
    <div>
      <SearchedTitle title={_t('suggested_category', 'SUGGESTED CATEGORY')} />
      <div className="suggested-product-list">
        {categoryData?.data.map((x, i) => {
          return (
            <SearchedCategoryList categoryData={x} key={i} onClose={onClose} />
          );
        })}
      </div>
    </div>
  );
};

export default SearchedCategory;

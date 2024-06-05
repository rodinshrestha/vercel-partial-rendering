'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

// import dynamic from 'next/dynamic';
import useTranslations from '@/core/hooks/useTranslations';
import useWishlist from '@/wishlist/hooks/useWishlist';
import Button from '@/core/components/Button';
import ProductLoader from '@/product/components/ProductLoader';
import TitleLoader from '@/core/components/Loader/TitleLoader';
import ProductItem from '@/product/components/Card/ProductItem';
import { ProductTypes } from '@/product/types/product.types';

// import PageTitle from '../PageTitle';

const MyFavorite = ({ isOverview = false }: { isOverview?: boolean }) => {
  const { _t } = useTranslations();
  const { wishlist, wishlistLoader } = useWishlist();

  const wishlistItems = React.useMemo(
    () =>
      isOverview
        ? wishlist?.wishlist_items?.slice(0, 4)
        : wishlist?.wishlist_items,
    [isOverview, wishlist?.wishlist_items]
  );
  if (!wishlistItems?.length && isOverview) {
    return null;
  }

  if (wishlistLoader) {
    return (
      <>
        <TitleLoader />

        {wishlistItems?.length && (
          <LoaderStyledWrapper>
            {[1, 2, 3].map((v) => (
              <div key={v}>
                <ProductLoader />
              </div>
            ))}
          </LoaderStyledWrapper>
        )}
      </>
    );
  }

  if (!wishlistLoader && !wishlistItems?.length) {
    return (
      <>
        {/* <PageTitle title={_t('my_favourite', 'My Favourite')} /> */}
        <div className="no-data" style={{ opacity: '0.2' }}>
          <h6>
            {_t(
              'no_any_favourite_product_selected',
              'No any favourite product selected'
            )}
            .
          </h6>
        </div>
      </>
    );
  }

  return (
    <FavouriteSection>
      <FavouriteWraper>
        {wishlistItems?.map((item) => {
          return (
            <ProductItem
              className="favourite-item"
              key={item.id}
              product={item.product as ProductTypes}
            />
          );
        })}
      </FavouriteWraper>
      {isOverview && (
        <StyledWrapper>
          {wishlistItems?.length === 4 && (
            <Button variant="contained" skin="primary" href="/favourite">
              {_t('see_more_favorites', 'See more favorites')}
            </Button>
          )}
        </StyledWrapper>
      )}
    </FavouriteSection>
  );
};
export default MyFavorite;

const FavouriteSection = styled.div`
  ${({ theme }) => css`
    /* border-top: 1px solid ${theme.coreColor.body.default.color};
    padding-top: ${rem(20)}; */
  `};
`;

const FavouriteWraper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    margin: 0 ${rem(-10)};
    row-gap: ${rem(25)};

    .favourite-item {
      flex: 0 0 25%;
      padding: 0 ${rem(10)};

      @media (min-width: calc(${theme.breakPoints.largeDesktop} + 1px)) {
        flex: 0 0 20%;
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        flex: 0 0 33.33%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        flex: 0 0 50%;
      }
    }
  `}
`;
const StyledWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-end;
    margin-top: ${rem(15)};
  `}
`;

const LoaderStyledWrapper = styled.div`
  ${() => css`
    display: flex;
    margin: 0 -8px;
    flex-wrap: wrap;
    gap: 10px;
    row-gap: ${rem(70)};
    padding: ${0} ${rem(15)};

    &.loader-block {
      height: 50vh;
    }
  `}
`;

import React from 'react';

import useWishlist from '@/wishlist/hooks/useWishlist';
import useTranslations from '@/core/hooks/useTranslations';
import Drawer from '@/core/components/Drawer';
import Loader from '@/core/components/Loader';

import WishlistItems from '../WishlistItems';
import { WishlistFooter } from '../WishlistFooter';

import { DrawerContainer, StyledWrapper } from './style';

const WishlistDrawer = () => {
  const {
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    wishlist,
    wishlistLoader,
  } = useWishlist();
  const { _t } = useTranslations();

  return (
    <DrawerContainer>
      <Drawer
        className="cart-drawer"
        open={isWishlistDrawerOpen}
        title={_t('favourite', 'Favourites')}
        width="30%"
        position="right"
        onClose={() => setIsWishlistDrawerOpen(false)}
        footer={<WishlistFooter />}
        isEmpty={Boolean(!wishlist?.wishlist_items?.length && !wishlistLoader)}
        empty={{
          title: _t(
            'you_dont_have_any_items_in_your_favourite',
            "You don't have any items in your Favourite"
          ),
          description: '',
        }}
        overlay
        drawerZindex={10}
        overlayZindex={10}
        // maxWidth="600px"
      >
        <StyledWrapper className="body-wrapper">
          {wishlistLoader ? (
            <Loader type="spinner" color="primary" />
          ) : (
            wishlist?.wishlist_items?.map((item) => {
              return (
                <WishlistItems key={item.id} productDetails={item.product} />
              );
            })
          )}
        </StyledWrapper>
      </Drawer>
    </DrawerContainer>
  );
};

export default WishlistDrawer;

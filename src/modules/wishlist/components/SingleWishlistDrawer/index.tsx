import React from 'react';

import Drawer from '@/core/components/Drawer';
import useWishlist from '@/wishlist/hooks/useWishlist';
import useTranslations from '@/core/hooks/useTranslations';
import Button from '@/core/components/Button';
import { ProductTypes } from '@/product/types/product.types';

import WishlistItems from '../WishlistItems';

import { DrawerFooter, StyledWrapper } from './style';

const SingleWishlistDrawer = () => {
  const {
    setIsMiniWishlistDrawerOpen,
    isMiniWishlistDrawerOpen,
    recentlySelectedProduct,
    setRecentlySelectedProduct,
  } = useWishlist();

  const { _t } = useTranslations();

  React.useEffect(() => {
    if (!isMiniWishlistDrawerOpen) {
      return;
    } else {
      setTimeout(() => {
        setIsMiniWishlistDrawerOpen(false);
        setRecentlySelectedProduct([]);
      }, 8000);
    }
  }, [
    isMiniWishlistDrawerOpen,
    setIsMiniWishlistDrawerOpen,
    setRecentlySelectedProduct,
  ]);

  return (
    <>
      <Drawer
        className="cart-drawer single-cart-added"
        open={isMiniWishlistDrawerOpen}
        title={_t('added_to_favourite', 'Added to favourite')}
        width="30%"
        position="right"
        onClose={() => setIsMiniWishlistDrawerOpen(false)}
        drawerZindex={10}
        overlayZindex={10}
        footer={<SingleWishlistFooter />}
        overlay
      >
        <StyledWrapper className="fav-item">
          {!!recentlySelectedProduct?.length &&
            recentlySelectedProduct.map((item, i) => {
              return (
                <WishlistItems
                  key={i}
                  productDetails={item?.product as Partial<ProductTypes>}
                />
              );
            })}
        </StyledWrapper>
      </Drawer>
    </>
  );
};

export default SingleWishlistDrawer;

const SingleWishlistFooter = () => {
  const { setIsMiniWishlistDrawerOpen, setIsWishlistDrawerOpen } =
    useWishlist();
  const { _t } = useTranslations();
  return (
    <DrawerFooter className="fav-footer">
      <Button
        skin="primary"
        variant="contained"
        onClick={() => {
          setIsWishlistDrawerOpen(true);
          setIsMiniWishlistDrawerOpen(false);
        }}
        fullWidth
      >
        {_t('show_my_favourites', 'Show my favourites')}
      </Button>
    </DrawerFooter>
  );
};

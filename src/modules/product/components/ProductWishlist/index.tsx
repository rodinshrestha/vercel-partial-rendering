import React from 'react';

import Button from '@/core/components/Button';
import { useAuth } from '@/auth/hooks/useAuth';
import { ProductTypes } from '@/product/types/product.types';
import useWishlist from '@/wishlist/hooks/useWishlist';
import AuthCheckModal from '@/auth/components/AuthModal';
import Loader from '@/core/components/Loader';
import { IconHeartOutline, IconHeartSolid } from '@/core/components/Icons';

type Props = {
  productData: ProductTypes;
};

const ProductWishlist = ({ productData }: Props) => {
  const [wishListLoader, setWishListLoader] = React.useState(false);
  const [isAuthModelOpen, setIsAuthModelOpen] = React.useState(false);

  const { user } = useAuth();
  const { wishlistHandler, wishlist } = useWishlist();

  const isWishList = React.useMemo(() => {
    if (!wishlist?.wishlist_items?.length) {
      return false;
    }
    return wishlist?.wishlist_items.some(
      (x) => x.product.id === productData.id
    );
  }, [productData.id, wishlist]);

  const handleOnWishlistClick = () => {
    if (user?.email) {
      setWishListLoader(true);
      wishlistHandler(productData, isWishList).finally(() => {
        setWishListLoader(false);
      });
    } else {
      setIsAuthModelOpen(true);
    }
  };
  return (
    <>
      <Button
        skin="light"
        variant="transparent"
        aria-label="Favourite button"
        className="fab-btn"
        onClick={handleOnWishlistClick}
      >
        {wishListLoader ? (
          <Loader type="spinner" color="primary" />
        ) : isWishList ? (
          <IconHeartSolid size={23} />
        ) : (
          <IconHeartOutline size={23} />
        )}
      </Button>
      <AuthCheckModal isOpen={isAuthModelOpen} setIsOpen={setIsAuthModelOpen} />
    </>
  );
};

export default ProductWishlist;

import React from 'react';

import clsx from 'clsx';

import { ProductTypes } from '@/product/types/product.types';
import useWishlist from '@/wishlist/hooks/useWishlist';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import Loader from '@/core/components/Loader';
import Link from '@/core/components/Link';
// import Button from '@/core/components/Button';
import { IconHeartSolid } from '@/core/components/Icons';

import { FavouriteItemWrap } from './style';

type Props = {
  productDetails: Partial<ProductTypes>;
  showActionBtn?: boolean;
  className?: string;
};

const FavouriteItem = ({ className, productDetails }: Props) => {
  const { id, base_image, name, url_key } = productDetails;
  const [wishListLoader, setWishListLoader] = React.useState(false);
  const { wishlist, wishlistHandler } = useWishlist();
  // const [loader, setLoader] = React.useState(false);

  const isFavourite = wishlist?.wishlist_items.some(
    (item) => item.product.id === id
  );
  const handleWishlistClick = () => {
    setWishListLoader(true);
    // setLoader(true);
    const data = {
      id: id as string,
      image: base_image?.url || '',
      name: name as string,
      sku: '' as string,
      url_key: url_key || '#',
    };

    wishlistHandler(data as any, isFavourite).finally(() => {
      setWishListLoader(false);
      // setLoader(false);
    });
  };
  return (
    <FavouriteItemWrap className={clsx('favourite-item', className)}>
      <div className="favourite-wrapper">
        <div className="item-head">
          <div className="fav-btn-wrap">
            {wishListLoader ? (
              <Loader color="primary" type="spinner" />
            ) : (
              <span className="fav-btn" onClick={handleWishlistClick}>
                <i className="icon-heart" />
                <IconHeartSolid size={16} />
              </span>
            )}
          </div>

          <Link href={`/product/${productDetails.url_key}`}>
            <div className="favourite-img">
              <ImageWithFallback
                src={productDetails?.base_image?.url || ''}
                alt={productDetails?.name || 'product image'}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="item-body">
          <div className="favourite-item-info">
            {!Array.isArray(productDetails.brand) &&
            productDetails?.brand?.name ? (
              <span className="favourite-item-sku">
                {productDetails?.brand?.name}
              </span>
            ) : (
              ''
            )}
            {productDetails?.name && (
              <h2 className="h6">
                <Link href={`/product/${productDetails.url_key}`}>
                  {productDetails.name}
                </Link>
              </h2>
            )}
            <div className="favourite-item-price-wrap price-wrap">
              <div className="regular-price">
                <span className="price">
                  {
                    productDetails?.price_format?.final_price
                      ?.amount_incl_tax_formatted
                  }
                </span>
              </div>
            </div>

            <div className="favourite-product-attribute-list">
              {Object.entries(
                productDetails?.configurable_attributes || {}
              ).map(([key, value], i) => {
                if (key !== 'color') return;
                return (
                  <p className="small" key={i}>
                    {value}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="btn-wrap">
            {/* <Link href={`/product/${productDetails.url_key}`}>
              <Button
                className="fav-link-btn"
                skin="primary"
                variant="contained"
                fullWidth
                isLoading={loader}
                asSelfLink
              >
                Buy
                <i className="icon-right_arrow" />
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </FavouriteItemWrap>
  );
};

export default FavouriteItem;

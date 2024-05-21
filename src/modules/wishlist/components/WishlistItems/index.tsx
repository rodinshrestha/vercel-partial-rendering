import React from 'react';

import clsx from 'clsx';

import Loader from '@/core/components/Loader';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import { ProductTypes } from '@/product/types/product.types';
import Link from '@/core/components/Link';
import useWishlist from '@/wishlist/hooks/useWishlist';
import {
  getFinalPriceFormat,
  getRegularPriceFormat,
} from '@/core/utils/get-price-format';
import { IconClose } from '@/core/components/Icons';

import { LoaderContainerStyle, StyledDiv } from './style';

type Props = {
  productDetails: Partial<ProductTypes>;
  onHandleClose?: () => void;
  showActionBtn?: boolean;
  className?: string;
};

const WishlistItems = ({
  className,
  productDetails,
  onHandleClose,
  showActionBtn = true,
}: Props) => {
  const [loader, setLoader] = React.useState(false);

  const { wishlistHandler } = useWishlist();

  const handleRemoveFavourite = () => {
    setLoader(true);
    wishlistHandler(productDetails as ProductTypes, true).finally(() => {
      setLoader(false);
      if (onHandleClose) onHandleClose();
    });
  };

  const { finalPriceFormatedWithTax, finalPriceWithTax } = getFinalPriceFormat(
    productDetails?.price_format
  );
  const { regularPriceFormatedWithTax, regularPriceWithTax } =
    getRegularPriceFormat(productDetails?.price_format);

  const brandName = productDetails?.brand?.name || '';

  return (
    <StyledDiv className={clsx('favourite-item', className)}>
      <div className="favourite-wrapper">
        {loader && (
          <>
            <LoaderContainerStyle className="loader">
              <Loader type="growing-loader" size="16px" color="primary" />
            </LoaderContainerStyle>
          </>
        )}
        <div className="favourite-img">
          <Link href={`/product/${productDetails.url_key}`}>
            <ImageWithFallback
              //Empty string renders fallback image
              src={productDetails?.base_image?.url || ''}
              alt={productDetails?.name || 'product image'}
              width={90}
              height={90}
              className="object-cover"
            />
          </Link>
        </div>
        <div className="favourite-content-wrapper">
          <div className="favourite-content">
            {brandName && (
              <span className="favourite-item-sku">{brandName}</span>
            )}
            {productDetails?.name && (
              <div className="favourite-item-title">
                <h2>
                  <Link href={`/product/${productDetails.url_key}`}>
                    {productDetails.name}
                  </Link>
                </h2>
              </div>
            )}
            <div className="favourite-product-info">
              <span className="price">
                <span>{finalPriceFormatedWithTax}</span>

                {finalPriceWithTax < regularPriceWithTax && (
                  <span>{regularPriceFormatedWithTax}</span>
                )}
              </span>
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
          </div>
          {showActionBtn && (
            <div className="btnGroup">
              <div className="remove-btn">
                <i className={`icon-close`} onClick={handleRemoveFavourite}>
                  <IconClose size={12} />
                </i>
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledDiv>
  );
};

export default WishlistItems;

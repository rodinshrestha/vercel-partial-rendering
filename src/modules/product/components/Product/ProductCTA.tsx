import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { SelectedProductVariants } from '@/product/types/selected-product-varaints-state.types';
import useCart from '@/cart/hooks/useCart';
import {
  ChangeAbleValueType,
  ProductTypes,
} from '@/product/types/product.types';
import Button from '@/core/components/Button';
import toastAlert from '@/core/utils/toast';
import { initializeProductId } from '@/product/utils/initialize-product-id';
import { getDisableStatus } from '@/product/utils/get-btn-disable-status';
import { setCartToken } from '@/cart/utils/cart-cookie';
import { addToCartResponseConversion } from '@/product/utils/add-to-cart-response-conversion';
import { postCart } from '@/cart/services/cart-service';
import useHeaders from '@/core/hooks/useHeaders';
import { useAuth } from '@/auth/hooks/useAuth';
import useTranslations from '@/core/hooks/useTranslations';
import { getAddToCartBtnLabel } from '@/product/utils/get-add-to-cart-btn-label';

import ProductQuantityHandler from './ProductQuantityHandler';

type Props = {
  isConfigurableProduct: boolean;
  productData: ProductTypes;
  productId: string;
  changeAbleValue: ChangeAbleValueType;
  setSelectedProductVariants: React.Dispatch<
    React.SetStateAction<SelectedProductVariants>
  >;
  appliedQty: number;
  setAppliedQty: React.Dispatch<React.SetStateAction<number>>;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
  selectedGroupBy: string | null;
  slug: Array<string> | string;
  minimumQty: number;
};
const ProductCTA = ({
  isConfigurableProduct,
  productData,
  productId,
  changeAbleValue,
  setSelectedProductVariants,
  appliedQty,
  setAppliedQty,
  setProductId,
  selectedGroupBy,
  slug,
  minimumQty,
}: Props) => {
  const [addToCartLoader, setAddToCartLoader] = React.useState(false);
  const { _t } = useTranslations();
  const { fetchCartItems, setIsCartDrawerOpen } = useCart();
  const { clientHeaders, updateCartToken } = useHeaders();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    setAddToCartLoader(true);

    const dataWithNewQty = { ...productData, quantity: appliedQty };

    const product_id = isConfigurableProduct ? productId : dataWithNewQty.id;

    const body = {
      items: addToCartResponseConversion(dataWithNewQty, product_id),
    };

    await postCart(body, clientHeaders)
      .then(async (res) => {
        const { cart_id = '' } = res?.data?.data || {};
        if (!user || cart_id) {
          setCartToken(cart_id);
          updateCartToken?.(cart_id);
        }

        await fetchCartItems();

        setIsCartDrawerOpen(true);

        setAddToCartLoader(false);

        /**
         * resetting product id state
         * after add to cart
         */
        setProductId(
          initializeProductId(
            productData,
            isConfigurableProduct,
            selectedGroupBy,
            slug
          )
        );
        setSelectedProductVariants((prev) => ({
          ...prev,
          selectedAttributes: [],
        }));
      })
      .catch((err) => {
        toastAlert(err, 'error');
        setAddToCartLoader(false);
      });
  };

  return (
    <StyledDiv>
      <Button
        skin="primary"
        className="b2b-product-add-to-cart"
        variant="contained"
        isLoading={addToCartLoader}
        disabled={getDisableStatus(
          isConfigurableProduct,
          productId,
          addToCartLoader,
          productData
        )}
        onClick={handleAddToCart}
      >
        <span className="btn-label">
          {getAddToCartBtnLabel(
            productData,
            isConfigurableProduct,
            _t,
            productId
          )}
          <i className="icon-cart1" />
        </span>
      </Button>
      <ProductQuantityHandler
        productData={productData}
        appliedQty={appliedQty}
        setAppliedQty={setAppliedQty}
        changeAbleValue={changeAbleValue}
        productId={productId}
        minimumQty={minimumQty || 1}
      />
    </StyledDiv>
  );
};

export default ProductCTA;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${rem(25)};
    margin-bottom: ${rem(12)};

    @media (max-width: ${theme.breakPoints.tab}) {
      flex-direction: row-reverse;
      gap: ${rem(15)};
    }

    button {
      flex-grow: 1;
      margin-right: 0;

      span {
        &.price {
          flex-grow: 1;
        }
      }

      i {
        font-size: inherit;
      }
    }

    a {
      display: block;
      margin-left: auto;
      padding: ${rem(12)} ${rem(20)};

      span {
        i {
          margin-left: 20px;
          font-size: 14px;
        }
      }
    }
  `}
`;

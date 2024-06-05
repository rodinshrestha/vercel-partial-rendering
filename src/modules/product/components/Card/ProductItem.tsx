"use client";
import React from "react";

import styled, { css } from "styled-components";
import { rem, transparentize } from "polished";
import dynamic from "next/dynamic";
import clsx from "clsx";

import { useAuth } from "@/auth/hooks/useAuth";
import useWishlist from "@/wishlist/hooks/useWishlist";
import Loader from "@/core/components/Loader";
import Link from "@/core/components/Link";
import ImageWithFallback from "@/core/components/ImageWithFallback";
import useTranslations from "@/core/hooks/useTranslations";
// import Badge from '@/core/components/Badge/Badge';
import {
  ProductTypes,
  VarientProductDetailsType,
} from "@/product/types/product.types";
import { IconHeartOutline, IconHeartSolid } from "@/core/components/Icons";
import Badge from "@/core/components/Badge/Badge";
import { ProfileUser } from "@/auth/types/user.types";

import ProductPrice from "../Product/ProductPrice/ProductPrice";

const AuthCheckModal = dynamic(() => import("@/auth/components/AuthModal"));

type Props = {
  product: ProductTypes;
  className?: string;
  user: ProfileUser | null;
};

enum Group {
  ZERO = 0,
  ONE = 1,
}

const MAX_COLOR_LIMIT = 5;

const ProductItem = ({ product, className, user }: Props) => {
  const [wishListLoader, setWishListLoader] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // const { user } = useAuth();
  const { wishlist, wishlistHandler } = useWishlist();

  const { id: productId, name, url_key, brand, is_in_stock } = product;

  const isFavourite = React.useMemo(() => {
    if (!productId) {
      return false;
    }
    return (
      wishlist?.wishlist_items?.some((x) => x.product.id === productId) || false
    );
  }, [wishlist, productId]);

  const handleProductView = () => {};

  const imageURL = "base_image" in product ? product.base_image?.url : "";
  const rolloverImage =
    "rollover_image" in product ? product.rollover_image?.url || null : null;
  const backgroundSize =
    "base_image" in product
      ? product.base_image?.background_size
      : "object-cover";

  const handleWishlistClick = () => {
    setWishListLoader(true);
    const data = {
      id: productId as string,
      image: imageURL || "",
      name: name,
      sku: "" as string,
      url_key: url_key || "#",
      brand: brand,
      inStock: is_in_stock,
    };

    wishlistHandler(data as any, isFavourite).finally(() => {
      setWishListLoader(false);
    });
  };

  const showColorAttribute =
    product.is_group_by === Group.ZERO &&
    typeof product.configurable_attributes === "object" &&
    "color" in (product.configurable_attributes || {});

  /** Show other attributes except */
  const showOverlappedAttributes =
    product.is_group_by === Group.ONE &&
    typeof product.configurable_attributes === "object" &&
    !Array.isArray(product.configurable_attributes);

  const colorAttributes = React.useMemo(() => {
    if (!showColorAttribute) return [];
    return (product.configurable_attributes as any).color.map(
      (color: any) => color
    );
  }, [showColorAttribute, product.configurable_attributes]);

  const overlappedAttributes = React.useMemo(() => {
    if (!showOverlappedAttributes) return [];
    // skip color and only take one attribute
    const keys = Object.keys(product.configurable_attributes as any);
    const takeOne = keys.filter((x) => x !== "color")[0];
    if (takeOne) {
      return (product.configurable_attributes as any)[takeOne];
    }
    return [];
  }, [showOverlappedAttributes, product.configurable_attributes]);

  return (
    <>
      <StyledProductItem className={className}>
        <ItemHead>
          {product.is_new_product && (
            <StyleBadgeWrap>
              <Badge rounded variant="contextual" skin="sucess" label="New" />
            </StyleBadgeWrap>
          )}
          <div className="fav-btn-wrap">
            {wishListLoader ? (
              <Loader color="primary" type="spinner" />
            ) : (
              <span
                className="fav-btn"
                onClick={
                  user?.email ? handleWishlistClick : () => setIsOpen(true)
                }
              >
                {isFavourite ? (
                  <IconHeartSolid size={18} />
                ) : (
                  <IconHeartOutline size={18} />
                )}
              </span>
            )}
          </div>

          <Link
            className="pro-links"
            href={`/product/${url_key}`}
            onClick={() => handleProductView()}
          >
            <StyledItemImage>
              <ThumbImage
                className={clsx(
                  { "thumbnail-image": !!rolloverImage },
                  "product-image"
                )}
              >
                <ImageWithFallback
                  className="object-cover"
                  src={imageURL || ""}
                  alt={`${product.name} thumbnail`}
                  style={{ backgroundSize: backgroundSize || "cover" }}
                  fill
                />
              </ThumbImage>

              {rolloverImage && (
                <HoverImage className="rollover-image product-image">
                  <ImageWithFallback
                    className="object-cover"
                    src={rolloverImage}
                    alt="Product rollover image"
                    fill
                    style={{ backgroundSize: backgroundSize || "cover" }}
                  />
                </HoverImage>
              )}
            </StyledItemImage>

            {Boolean(overlappedAttributes.length) && (
              <StyledVariantSelections className="size-list">
                {(overlappedAttributes as Array<VarientProductDetailsType>).map(
                  (attribute, index) => (
                    <li key={index}>{attribute.label}</li>
                  )
                )}
              </StyledVariantSelections>
            )}
          </Link>
        </ItemHead>

        <ItemBody>
          <StyledItemContentWrap>
            {/* <LipscoreReviewList productData={pr} /> */}
            <div className="content-wrap">
              {brand ? (
                <span className="category-tag">{product.brand.name} </span>
              ) : null}
              <Link
                className="pro-links"
                href={`/product/${url_key}`}
                onClick={() => handleProductView()}
              >
                <h6>{product.name}</h6>
              </Link>
              <ProductPrice productData={product} />
            </div>

            {!!colorAttributes.length && (
              <div className="product-variant-opt-wrap">
                <ul className="variant-opt-list">
                  {(colorAttributes as Array<VarientProductDetailsType>)
                    .slice(0, MAX_COLOR_LIMIT)
                    .map((color, index) => (
                      <li
                        key={index}
                        className="variant-opt-item"
                        title={color.label}
                      >
                        <span
                          style={{
                            background: color.background_color || "#fff",
                          }}
                        />
                      </li>
                    ))}
                  {Boolean(colorAttributes.length > MAX_COLOR_LIMIT) && (
                    <li className="max-item">
                      +{colorAttributes.length - MAX_COLOR_LIMIT}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </StyledItemContentWrap>
        </ItemBody>
      </StyledProductItem>
      <AuthCheckModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ProductItem;

export const StyledProductItem = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: 0.4s ease all;
    background-color: inherit;

    &.b2b-product-item {
      background-color: ${theme.color.white[1000]};
      border-radius: 12px;
    }

    .bg-grey {
      color: ${transparentize(0.73, theme.color.grey[900])};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        .add-to-cart,
        .rollover-image,
        .size-list,
        .hover-img {
          opacity: 1;
          visibility: visible;
        }

        .thumbnail-image {
          opacity: 0;
          visibility: hidden;
        }

        .out-of-stock {
          opacity: 0.5;
        }
      }
    }
  `}
`;

export const StyleBadgeWrap = styled.div`
  ${({ theme }) => css`
    display: flex;
    position: absolute;
    padding: 0 10px;
    top: 0;
    left: 0;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-top: 70px solid ${theme.color.white[800]};
      border-right: 70px solid transparent;
    }

    .badge {
      position: absolute;
      top: 10px;
      left: 0;
      background: transparent;
      color: ${theme.coreColor.body.default.color};
      text-align: center;
      transform: rotate(-45deg);
      display: block;
    }

    @media (min-width: calc( ${theme.breakPoints.largeDesktop} + 1px)) {
      padding: ${rem(15)};
    }
  `}
`;

export const StyledItemImage = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding-top: 131%;

    /* @media (min-width: calc( ${theme.breakPoints.largeDesktop} + 1px)) {
      padding-top: 105%;
    } */
  `}
`;

export const StyledVariantSelections = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: ${rem(10)};
    list-style: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    width: 100%;
    max-width: 100%;
    padding-bottom: ${rem(15)};

    li {
      padding: 10px;
      background-color: ${transparentize(
        0.2,
        theme.coreColor.light.default.background
      )};
      color: ${theme.coreColor.light.default.color};
      display: inline-block;
      cursor: pointer;
      height: 25px;
      min-width: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${rem(14)};
      line-height: ${rem(14)};
    }
  `}
`;

export const ThumbImage = styled.div`
  ${() => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.6s ease all;
  `}
`;

export const HoverImage = styled(ThumbImage)`
  ${() => css`
    visibility: hidden;
    opacity: 0;
    transition: 0.6s ease all;
  `}
`;

export const ItemHead = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.color.white["1000"]};
    border-radius: ${rem(15)};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .fav-btn-wrap {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      padding: ${rem(10)} ${rem(15)};
      font-size: ${rem(22)};
      line-height: ${rem(22)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        font-size: ${rem(20)};
        line-height: ${rem(20)};
        padding: ${rem(10)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        font-size: ${rem(16)};
        line-height: ${rem(16)};
      }

      span {
        &.fav-btn {
          cursor: pointer;
          display: inline-block;
          position: relative;
          line-height: 0;
          transition: 0.3s ease all;

          i {
            @media (max-width: ${theme.breakPoints.mobile}) {
              margin-left: ${rem(10)};
            }

            &.icon-heart {
              color: ${theme.coreColor.danger.default.background};

              &_outline {
                @media (hover: hover) and (pointer: fine) {
                  &:hover {
                    color: ${theme.coreColor.danger.default.background};

                    &::before {
                      content: "\e90c";
                    }
                  }
                }
              }
            }
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              svg {
                path {
                  fill: ${theme.coreColor.body.default.color};
                }
              }
            }
          }
        }
      }

      .loader-wrap {
        position: static;
        transform: none;
      }
    }
  `}
`;

export const ItemBody = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    text-align: center;

    @media (max-width: ${theme.breakPoints.mobile}) {
      text-align: left;
    }

    .product-variant-opt-wrap {
      ul {
        display: flex;
        align-items: center;
      }
    }
  `}
`;

export const StyledItemContentWrap = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    height: 100%;
    padding: ${rem(10)};
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${theme.breakPoints.mobile}) {
      text-align: left;
      align-items: normal;
      padding: ${rem(10)} 0;
    }

    h6 {
      ${theme.fontFamily.light}
      font-size: ${rem(11)};
      line-height: ${rem(13)};
      letter-spacing: ${rem(1.1)};
      text-transform: uppercase;
      height: auto;
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      @media (min-width: calc( ${theme.breakPoints.largeDesktop} + 1px)) {
        font-size: ${rem(15)};
        line-height: ${rem(19)};
        letter-spacing: ${rem(1.5)};
        max-height: 38px;
      }

      @media (max-width: ${theme.breakPoints.largeDesktop}) {
        font-size: ${rem(9)};
        line-height: ${rem(15)};
        letter-spacing: ${rem(0.9)};
        max-height: 30px;
      }
    }

    a {
      &.custom-link {
        display: block;
        margin: ${rem(12)} 0;
        color: #6b6b6b;
      }
    }

    span {
      &.category-tag {
        color: ${theme.color.red[1100]};
        opacity: 0.5;
        font-size: ${rem(10)};
        line-height: ${rem(12)};
        letter-spacing: ${rem(1)};
        margin-bottom: ${rem(3)};
        display: block;

        @media (min-width: calc( ${theme.breakPoints.largeDesktop} + 1px)) {
          font-size: ${rem(14)};
          line-height: ${rem(20)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(9)};
          line-height: ${rem(14)};
        }
      }
    }

    .add-to-cart {
      margin-top: ${rem(10)};

      @media (min-width: calc(${theme.breakPoints.mobile} + 1px)) {
        opacity: 0;
        visibility: hidden;
        margin-top: 0;
      }

      &.out-of-stock {
        font-size: ${rem(12)};
        line-height: ${rem(16)};
        padding: ${rem(8)} ${rem(5)};
      }

      a {
        padding: ${rem(6)} ${rem(10)};
      }
    }

    .price-group-wrap {
      margin-top: ${rem(5)};
    }

    .product-variant-opt-wrap {
      margin: ${rem(15)} auto;

      ul {
        list-style: none;
        padding-left: 0;
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 20px;

        li {
          margin-right: ${rem(10)};
          line-height: ${rem(16)};

          &.variant-opt-item {
            border: 1px solid ${theme.coreColor.body.default.color};
            width: 16px;
            height: 16px;
            border-radius: 50%;
            position: relative;

            span {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
            }
          }

          .radio-field {
            label {
              font-size: 0;
              margin-bottom: 0;
              padding-left: 15px;
            }

            [type="radio"] {
              &:checked,
              &:not(:checked) {
                display: none;
                & + label {
                  &::after {
                    width: 8px;
                    height: 8px;
                  }

                  &::before {
                    width: 12px;
                    height: 12px;
                    top: 2px;
                    left: 2px;
                  }
                }
              }
            }
          }

          &.max-item {
            position: absolute;
            top: 2px;
            right: 0;
            margin: 0;
          }
        }
      }
    }
  `}
`;

export const BtnWrap = styled.div`
  ${({ theme }) => css`
    padding: 0 ${rem(10)};

    span {
      &.price-title {
        font-size: ${rem(14)};
        line-height: ${rem(16)};
      }
    }

    .button-wrapper {
      margin-top: ${rem(10)};
      display: flex;
      gap: 10px;
      align-items: flex-end;
      justify-content: space-between;

      .wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;

        @media (max-width: ${theme.breakPoints.mobile}) {
          gap: 5px;
        }

        i {
          font-size: ${rem(20)};
        }

        .add-to-cart {
          justify-content: space-between;

          a {
            justify-content: space-between;
          }
        }
      }
    }

    .basic-select {
      .select__control {
        border-radius: 20px;
        border: 0;
        background-color: ${theme.coreColor.primary.default.background};
        color: ${theme.color.black[800]};
        ${theme.coreColor.primary.default};

        .select__value-container {
          .select__single-value,
          .select__placeholder {
            font-size: ${rem(18)};
            line-height: ${rem(26)};

            @media (max-width: ${theme.breakPoints.tablet}) {
              font-size: ${rem(15)};
              line-height: ${rem(21)};
            }

            @media (max-width: ${theme.breakPoints.mobile}) {
              font-size: ${rem(13)};
              line-height: ${rem(19)};
            }
          }
        }

        span {
          &.icon-down_arrow {
            font-size: ${rem(16)};
            color: ${theme.color.black[800]};
            color: inherit;

            @media (max-width: ${theme.breakPoints.mobile}) {
              font-size: ${rem(13)};
            }
          }
        }
      }
    }

    &:has(.basic-select) {
      .add-to-cart {
        position: absolute;
        top: -45px;
        left: 0;
      }
    }
  `}
`;

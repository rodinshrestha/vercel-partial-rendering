'use client';
import React from 'react';

import type { ProductTypes } from '@/product/types/product.types';
import useHeaders from '@/core/hooks/useHeaders';
import toastAlert from '@/core/utils/toast';

import type {
  WishlistItemListType,
  WishlistType,
} from '../types/wishlist.types';
import { shouldFetchWishlist } from '../utils/should-fetch-wishlist';
import {
  getWishlistToken,
  removeWishListToken,
  setWishlistToken,
} from '../utils/wishlist-cookie';
import {
  addToFavourite,
  clearAllWishList,
  getWishlist,
} from '../services/wishlist-service';

type ContextType = {
  isMiniWishlistDrawerOpen: boolean;
  setIsMiniWishlistDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wishlist: WishlistType | null;
  setWishlist: React.Dispatch<React.SetStateAction<WishlistType | null>>;
  wishlistLoader: boolean;
  setWishlistLoader: React.Dispatch<React.SetStateAction<boolean>>;
  getFavourite: () => Promise<unknown>;
  clearWishlist: () => Promise<unknown>;
  wishlistHandler: (data: ProductTypes, isRemove?: boolean) => Promise<unknown>;
  recentlySelectedProduct: WishlistItemListType[];
  setRecentlySelectedProduct: React.Dispatch<
    React.SetStateAction<Array<WishlistItemListType>>
  >;
};

const initialValue = {
  recentlySelectedProduct: [],
  setRecentlySelectedProduct: () => {
    //
  },
  isMiniWishlistDrawerOpen: false,
  setIsMiniWishlistDrawerOpen: () => {
    //
  },

  isWishlistDrawerOpen: false,
  setIsWishlistDrawerOpen: () => {
    //
  },
  wishlist: null,
  setWishlist: () => {
    //
  },
  wishlistLoader: false,
  setWishlistLoader: () => {
    //
  },
  getFavourite: () => {
    return Promise.reject();
  },
  clearWishlist: () => {
    return Promise.resolve();
  },
  wishlistHandler: () => {
    return Promise.resolve();
  },
};

export const WishlistContext = React.createContext<ContextType>(initialValue);

type Props = {
  children: React.ReactNode;
};
const WishlistProvider = ({ children }: Props) => {
  const [isMiniWishlistDrawerOpen, setIsMiniWishlistDrawerOpen] =
    React.useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = React.useState(false);
  const [recentlySelectedProduct, setRecentlySelectedProduct] = React.useState<
    Array<WishlistItemListType>
  >([]);
  const [wishlist, setWishlist] = React.useState<WishlistType | null>(null);
  const [wishlistLoader, setWishlistLoader] = React.useState(true);

  const { clientHeaders } = useHeaders();

  const getFavourite = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      if (
        !shouldFetchWishlist({
          authToken: clientHeaders.Authorization || '',
        })
      )
        return;

      setWishlistLoader(true);
      getWishlist(clientHeaders)
        .then((res) => {
          setWishlist(res.data.data);
          resolve(res.data.data);
        })
        .catch((err) => {
          toastAlert(err, 'error');
          reject(err);
        })
        .finally(() => {
          setWishlistLoader(false);
        });
    });
  }, [clientHeaders]);

  React.useEffect(() => {
    getFavourite();
  }, [getFavourite]);

  const wishlistHandler = React.useCallback(
    (data: ProductTypes, isRemove = false) => {
      return new Promise((resolve, reject) => {
        if (!data) {
          throw new Error('Product id not found');
        }

        const WISHLIST_TOKEN = getWishlistToken();
        addToFavourite(clientHeaders, data.id)
          .then((res) => {
            if (!WISHLIST_TOKEN) {
              setWishlistToken(res.data.data.id);
            }

            if (isRemove) {
              setWishlist((prev) => {
                if (!prev) return null;

                const updatedList = prev.wishlist_items.filter((item) => {
                  if (item.product?.article_number && data?.article_number) {
                    return (
                      item.product?.article_number !== data?.article_number
                    );
                  }

                  if (item.product?.sku && data?.sku) {
                    return item.product?.sku !== data?.sku;
                  }

                  if (item.product?.id && data?.id) {
                    return item.product?.id !== data?.id;
                  }

                  return false;
                });

                if (!updatedList.length) {
                  removeWishListToken();
                }
                return { ...prev, wishlist_items: updatedList };
              });
              setRecentlySelectedProduct((prev) =>
                prev.filter((item) => item.product_id !== data.id)
              );
              resolve('success');
            } else {
              getFavourite()
                .then((res) => {
                  const currentSelected =
                    (res as WishlistType).wishlist_items.find(
                      (x) => x.product.id === data?.id
                    ) || null;
                  setIsMiniWishlistDrawerOpen(true);
                  setRecentlySelectedProduct((prev) => {
                    if (!currentSelected) {
                      return prev;
                    }
                    return [...prev, currentSelected];
                  });
                  resolve('success');
                })
                .catch((err) => {
                  toastAlert(err, 'error');
                  reject('error');
                });
            }
          })
          .catch((err) => {
            if (err?.response?.status === 422) {
              toastAlert('Product not found', 'custom-error');
            }
            setWishlistLoader(false);
            toastAlert(err, 'error');
            reject('failed');
          });
      });
    },
    [clientHeaders, getFavourite]
  );

  const clearWishlist = () => {
    return new Promise((resolve, reject) => {
      const WISHLIST_TOKEN = getWishlistToken();

      if (!WISHLIST_TOKEN) {
        throw new Error('Wishlist token not found in cookie');
      }
      clearAllWishList(clientHeaders)
        .then(() => {
          removeWishListToken();
          setWishlist(null);
          resolve('success');
        })
        .catch((err) => {
          toastAlert(err, 'error');
          reject('failed');
        });
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        getFavourite,
        isMiniWishlistDrawerOpen,
        setIsMiniWishlistDrawerOpen,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        setWishlist,
        setWishlistLoader,
        wishlist,
        wishlistLoader,
        clearWishlist,
        wishlistHandler,
        setRecentlySelectedProduct,
        recentlySelectedProduct,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;

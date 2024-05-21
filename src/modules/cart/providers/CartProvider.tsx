"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";

import type { LoadingStates } from "@/core/types/loading.types";
import { IDLE, PENDING, REJECTED, RESOLVED } from "@/core/constants/states";
import {
  getCartItems,
  postCart,
  removeAllCartItem,
} from "@/cart/services/cart-service";
import toastAlert from "@/core/utils/toast";
import useHeaders from "@/core/hooks/useHeaders";
import { cartHeaderKey } from "@/core/constants/token.constants";
import useCheckout from "@/checkout/hooks/useCheckout";

import { shouldFetchCart } from "../utils/should-fetch-cart";
import {
  getCartToken,
  setCartToken,
  removeCartToken,
} from "../utils/cart-cookie";
import type { CartDetailTypes, CartTypes } from "../types/cart.types";
import {
  deleteCartResponseConversion,
  updateToCartResponseConversion,
} from "../utils/get-cart-conversion";

type ContextTypes = {
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartStatus: string;
  setCartStatus: React.Dispatch<React.SetStateAction<LoadingStates>>;
  isCartModalOpen: boolean;
  setIsCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // TODO add types
  fetchCartItems: () => any;
  cartList: CartTypes | null;
  setCartList: React.Dispatch<React.SetStateAction<CartTypes | null>>;
  increaseQty: (
    item: CartDetailTypes,
    setLoader?: React.Dispatch<React.SetStateAction<boolean>>,
    shouldUpdateCartSummary?: boolean
  ) => Promise<unknown>;
  decreaseQty: (
    item: CartDetailTypes,
    setLoader?: React.Dispatch<React.SetStateAction<boolean>>,
    shouldUpdateCartSummary?: boolean
  ) => Promise<unknown>;
  removeItemFromCart: (
    id: string,
    setLoader?: React.Dispatch<React.SetStateAction<boolean>>,
    shouldUpdateCartSummary?: boolean
  ) => Promise<any>;
  handleQuantity: (id: string, qty: number) => any;
  clearCart: (
    setClearCartLoader: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
};

const initalValue = {
  isCartDrawerOpen: false,
  cartStatus: IDLE as LoadingStates,
  isCartModalOpen: false,
  cartList: null,
  cartSummary: null,
  setIsCartDrawerOpen: () => {},
  setCartStatus: () => {},
  setIsCartModalOpen: () => {},
  fetchCartItems: () => {},
  setCartList: () => {},
  increaseQty: () => {
    return Promise.resolve("");
  },
  decreaseQty: () => {
    return Promise.resolve("");
  },
  removeItemFromCart: () => {
    return Promise.resolve("");
  },
  handleQuantity: () => {},
  clearCart: () => {},
};

export const CartContext = React.createContext<ContextTypes>(initalValue);

type Props = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: Props) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false);
  const [cartStatus, setCartStatus] = React.useState<LoadingStates>(IDLE);
  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);
  const [cartList, setCartList] = React.useState<CartTypes | null>(null);

  const { clientHeaders } = useHeaders();
  const { getCheckoutSummary, setCartSummary } = useCheckout();
  const pathname = usePathname();
  const router = useRouter();

  console.log({ cartStatus }, "@@@");
  /**
   * Preserving cart state, To restore
   * Incase of error, while change in quantity
   */
  const cartBackupRef = React.useRef(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | number>(0);

  React.useEffect(() => {
    setIsCartDrawerOpen(false);
  }, [pathname]);

  /**
   * Fetch cart details.
   * If there is cart id in cookie
   */
  const fetchCartItems = React.useCallback(async () => {
    if (
      !shouldFetchCart({
        authToken: clientHeaders.Authorization || "",
        cartToken: getCartToken(),
      })
    ) {
      setCartStatus(REJECTED);
      return Promise.reject("");
    }

    setCartStatus(PENDING);

    return getCartItems({
      ...clientHeaders,
      [cartHeaderKey]: getCartToken(),
      action: "create",
    })
      .then((res) => {
        if (!res.data.data?.items?.length) {
          removeCartToken();
          setCartList(null);
        } else {
          cartBackupRef.current = res.data.data;
          setCartList(res.data.data);
        }
        setCartStatus(RESOLVED);
        if (res.data?.data?.id) setCartToken(res.data.data.id);
        return res.data.data;
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          removeCartToken();
        } else {
          toastAlert(err, "error", "fetch-cart-from-provider");
        }
        setCartStatus(REJECTED);
      });
  }, [clientHeaders]);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  /**
   *
   * @param id cart id
   * @param setLoader Loader
   * @returns remove selected item from the cart
   */
  const removeItemFromCart = async (
    id: string,
    setLoader?: React.Dispatch<React.SetStateAction<boolean>>,
    shouldUpdateCarySummary = false
  ) => {
    return new Promise((resolve, rej) => {
      setLoader?.(true);
      setCartStatus(PENDING);

      postCart({ items: deleteCartResponseConversion(id) }, clientHeaders).then(
        () => {
          const itemAfterDelete =
            cartList?.items.filter((x) => x.id !== id) || [];

          if (!itemAfterDelete.length) {
            removeCartToken();
            setCartList(null);
            setCartStatus(REJECTED);
            if (shouldUpdateCarySummary) {
              router.push("/cart");
            }
            rej("There is no item in cart list");
            return;
          }

          fetchCartItems()
            .then(() => {
              if (shouldUpdateCarySummary) {
                getCheckoutSummary().finally(() => {
                  setLoader?.(false);
                  setIsCartModalOpen(false);
                });
              } else {
                // const removeItem = cartList?.items.find((x) => x.id === id);
                // if (removeItem) {
                //   RemoveItem$.next({ data: removeItem });
                // }
                setLoader?.(false);
                setCartStatus(RESOLVED);
              }

              resolve("Item deleted succesfull");
            })
            .catch(() => {
              setCartStatus(REJECTED);
              setLoader?.(false);
              setIsCartModalOpen(false);
            });
        }
      );
    });
  };

  /**
   *
   * @param id product id
   * @param qty product quantity
   * @returns
   */
  const handleQuantity = (id: string, qty: number) => {
    setCartStatus(PENDING);
    return postCart(
      { items: updateToCartResponseConversion(id, qty) },
      clientHeaders
    ).catch((err) => {
      setCartStatus(REJECTED);
      toastAlert(err, "error");
      //Resoring cart state
      setCartList(cartBackupRef.current);
      throw err;
    });
  };

  /**
   *
   * @param item Product details
   * @param setLoader loader
   */
  const increaseQty = (
    item: CartDetailTypes,
    setLoader?: React.Dispatch<React.SetStateAction<boolean>>,
    shouldUpdateCarySummary = false
  ) => {
    clearTimeout(debounceRef.current);

    return new Promise((res, rej) => {
      const qty = item.qty + 1;

      const updatedItems =
        cartList?.items.map((x) =>
          x.product.id === item.product.id ? { ...x, qty } : x
        ) || [];

      setCartList((prev) => {
        if (!prev) return null;
        return { ...prev, items: updatedItems };
      });

      if (shouldUpdateCarySummary) {
        // setCartSummaryLoader(true);
        setCartSummary((prev) => {
          if (!prev) return prev;

          return { ...prev, items: updatedItems };
        });
      }

      debounceRef.current = setTimeout(() => {
        setLoader?.(true);
        handleQuantity(item.product.id, qty)
          .then(() => {
            if (shouldUpdateCarySummary) getCheckoutSummary();
            fetchCartItems().finally(() => setLoader?.(false));
            res("cart updated successfull");
          })
          .catch((err) => {
            toastAlert(err, "error");
            setLoader?.(false);
            rej("failed");
          });
      }, 4e2);
    });
  };

  /**
   *
   * @param item product details
   * @param setLoader loader
   */
  const decreaseQty = (
    item: CartDetailTypes,
    setLoader?: React.Dispatch<React.SetStateAction<boolean>>,
    shouldUpdateCarySummary = false
  ) => {
    clearTimeout(debounceRef.current);

    return new Promise((res, rej) => {
      const qty = item.qty - 1;

      const updatedItems =
        cartList?.items.map((x) =>
          x.product.id === item.product.id ? { ...x, qty } : x
        ) || [];

      setCartList((prev) => {
        if (!prev) return null;
        return { ...prev, items: updatedItems };
      });

      if (shouldUpdateCarySummary) {
        setCartSummary((prev) => {
          if (!prev) return prev;

          return { ...prev, items: updatedItems };
        });
      }

      debounceRef.current = setTimeout(() => {
        setLoader?.(true);
        handleQuantity(item.product.id, qty)
          .then(() => {
            if (shouldUpdateCarySummary) getCheckoutSummary();
            fetchCartItems().finally(() => setLoader?.(false));
            res("Cart updated successfull");
          })
          .catch(() => {
            setLoader?.(false);
            rej("failed");
          });
      }, 4e2);
    });
  };

  /**
   * Clear all cart item
   */
  const clearCart = (
    setClearCartLoader: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setClearCartLoader(true);
    removeAllCartItem(clientHeaders)
      .then(() => {
        setClearCartLoader(false);
        setCartList(null);
      })
      .catch((err) => {
        setClearCartLoader(false);
        toastAlert(err, "error");
      });
  };

  return (
    <CartContext.Provider
      value={{
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartStatus,
        isCartModalOpen,
        setCartStatus,
        setIsCartModalOpen,
        fetchCartItems,
        cartList,
        setCartList,
        increaseQty,
        decreaseQty,
        removeItemFromCart,
        handleQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

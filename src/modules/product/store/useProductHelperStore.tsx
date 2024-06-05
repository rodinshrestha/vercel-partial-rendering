import { create } from "zustand";

import { ChangeAbleValueType } from "../types/product.types";

/**
 * useProductHelperStore is used to share the state between client and server component
 */

const changeAbleValueInitialValue = {
  price: "",
  discountPrice: "",
  qty: null,
  memberPrice: null,
  productName: null,
  sku: null,
};

type InitialState = {
  changeAbleValue: ChangeAbleValueType;
  setChangeAbleValue: (state: ChangeAbleValueType) => void;
};

/**
 * Used in React client component and React server component
 * Price history block component
 * ProductAdditionalDetails
 */
const useProductHelperStore = create<InitialState>((set) => ({
  changeAbleValue: changeAbleValueInitialValue,
  setChangeAbleValue(newState) {
    set((state) => ({
      ...state,
      changeAbleValue: newState,
    }));
  },
}));

export default useProductHelperStore;

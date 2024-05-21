import { create } from 'zustand';

type InitialState = {
  accordionTitle: null | string;
  updateTitle: (title: string) => void;
};

/**
 * Used in React client component and React server component
 * Price history block component
 * ProductAdditionalDetails
 */
const useAccordionToggleStore = create<InitialState>((set) => ({
  accordionTitle: null,
  updateTitle(title) {
    set((state) => ({
      ...state,
      accordionTitle: title,
    }));
  },
}));

export default useAccordionToggleStore;

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { NavigationItem } from '@/core/types/navigation-type';

import { MobileMenuTypes } from '../types/mobile-menu.types';

type NavMenuType = {
  navMenuDrawer: boolean;
  toggleNavMenuDrawer: () => void;
  closeNavMenuDrawer: () => void;
  navMenuList: Array<MobileMenuTypes>;
  initalizeNavMenu: (item: NavigationItem[]) => void;
  handleMenuBackClick: () => void;
  handleMenuClick: (item: NavigationItem, parentName?: string | null) => void;
};

const navMenuInitialValue = [
  {
    parentName: null,
    data: [],
  },
];

const useNavMenuStore = create(
  immer<NavMenuType>((set) => ({
    navMenuDrawer: false,
    navMenuList: navMenuInitialValue,
    toggleNavMenuDrawer() {
      set((state) => {
        state.navMenuDrawer = !state.navMenuDrawer;
      });
    },
    closeNavMenuDrawer() {
      set((state) => {
        state.navMenuDrawer = false;
        state.navMenuList = [{ parentName: null, data: [] }];
      });
    },
    initalizeNavMenu(primaryMenuList: Array<NavigationItem>) {
      set((state) => {
        state.navMenuList = [{ parentName: null, data: primaryMenuList }];
      });
    },

    handleMenuClick(item: NavigationItem, parentName?: string | null) {
      if (!item.children?.length) return;

      set((state) => {
        state.navMenuList = [
          ...state.navMenuList,
          { parentName: parentName, data: item.children },
        ];
      });
    },

    handleMenuBackClick() {
      set((state) => {
        const sliceLastIndex = [...state.navMenuList];
        sliceLastIndex.pop();
        state.navMenuList = sliceLastIndex;
      });
    },
  }))
);
export default useNavMenuStore;

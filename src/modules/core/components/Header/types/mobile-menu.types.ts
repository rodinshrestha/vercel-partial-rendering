import { NavigationItem } from '@/core/types/navigation-type';

export type MobileMenuTypes = {
  // Parent title shows in mobile menu
  parentName?: string | null;

  // List of navigation item
  data: Array<NavigationItem>;
};

import { Keyword, ReadOnlyTranslation } from "@/core/types/translation.types";

/**
 * Returns b2c customer account route
 */
export const accountRoute = (
  _t: <T extends Keyword>(
    keyWord: T,
    defaultTranslation: ReadOnlyTranslation[T]
  ) => string
) => [
  {
    title: _t("my_profile", "My Profile"),
    link: "/account/my-profile",
    id: "my-profile",
  },
  {
    title: _t("my_address", "My Address"),
    link: "/account/address",
    id: "address",
  },

  {
    title: _t("my_favourites", "My Favourites"),
    link: "/account/my-favourite",
    id: "my-favourite",
  },
  {
    title: _t("my_orders", "My Orders"),
    link: "/account/orders",
    id: "orders",
  },
];

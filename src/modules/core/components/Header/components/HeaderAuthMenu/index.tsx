"use client";

import React from "react";

import { ProfileUser } from "@/auth/types/user.types";
import useWishlist from "@/wishlist/hooks/useWishlist";
import Loader from "@/core/components/Loader";
import { IconHeartOutline } from "@/core/components/Icons";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";
import useTranslations from "@/core/hooks/useTranslations";

import { getTotalFavouriteCount } from "../../utils/get-total-favourite-count";
import LoginIcon from "../LoginIcon";

type Props = {
  user: ProfileUser | null;
};

const HeaderAuthMenu = ({ user }: Props) => {
  const { setIsWishlistDrawerOpen, wishlist, wishlistLoader } = useWishlist();
  const isTablet = useMediaQuery(breakPoints.tablet);
  const { _t } = useTranslations();

  return (
    <>
      <li className="right-menu-item">
        <LoginIcon user={user} />
      </li>

      {user?.email && (
        <li className="right-menu-item">
          <span
            className="fav icon"
            onClick={() => setIsWishlistDrawerOpen(true)}
          >
            {!isTablet && (
              <span className="icon-label">{_t("favorites", "Favorites")}</span>
            )}
            <small className="count fav-count">
              {wishlistLoader ? (
                <Loader type="growing-loader" size="10px" color="dark" />
              ) : (
                getTotalFavouriteCount(wishlist)
              )}
            </small>
            <IconHeartOutline className="menu-svg" size={16} />
          </span>
        </li>
      )}
    </>
  );
};

export default HeaderAuthMenu;

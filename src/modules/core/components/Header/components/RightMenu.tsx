'use client';
import React from 'react';

import styled from 'styled-components';
import { rem } from 'polished';
import { css } from 'styled-components';
import clsx from 'clsx';

import useTranslations from '@/core/hooks/useTranslations';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { breakPoints } from '@/theme/breakPoints';
import { IDLE, PENDING } from '@/core/constants/states';
import useCart from '@/cart/hooks/useCart';
import { useAuth } from '@/auth/hooks/useAuth';
import useWishlist from '@/wishlist/hooks/useWishlist';
import Loader from '@/core/components/Loader';
import { ChannelsType } from '@/core/types/channels.types';

import { IconCart, IconHeartOutline, IconSearch } from '../../Icons';
import { getTotalCartCount } from '../utils/get-total-cart-count';
import { getTotalFavouriteCount } from '../utils/get-total-favourite-count';
import FooterLanguageSelector from '../../Footer/FooterLanguageSelector';

import LoginIcon from './LoginIcon';

type Props = {
  onHandleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  channelList: ChannelsType;
};

const RightMenu = ({ onHandleSearch, channelList }: Props) => {
  const { setIsCartDrawerOpen, cartList, cartStatus } = useCart();
  const { _t } = useTranslations();
  const isTab = useMediaQuery(breakPoints.tab);
  const isTablet = useMediaQuery(breakPoints.tablet);
  const { user } = useAuth();
  const { setIsWishlistDrawerOpen, wishlist, wishlistLoader } = useWishlist();

  const isLoader = cartStatus === IDLE || cartStatus === PENDING;

  return (
    <StyledRightMenu>
      <ul className="right-menu">
        <li className="right-menu-item">
          <span
            className={clsx('search icon', { active: true })}
            onClick={() => {
              onHandleSearch((prev) => !prev);
            }}
          >
            {!isTab && (
              <span className="icon-label">{_t('search', 'Search')}</span>
            )}
            <IconSearch className="menu-svg" size={16} />
          </span>
        </li>

        <li className="right-menu-item lang-warp">
          <FooterLanguageSelector
            className="single-selector header-selector"
            channelList={channelList}
          />
        </li>

        <li className="right-menu-item">
          <LoginIcon />
        </li>

        {user?.email && (
          <li className="right-menu-item">
            <span
              className="fav icon"
              onClick={() => setIsWishlistDrawerOpen(true)}
            >
              {!isTablet && (
                <span className="icon-label">
                  {_t('favorites', 'Favorites')}
                </span>
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

        <li className="reight-menu-item">
          <span
            className="cart icon"
            onClick={() => {
              setIsCartDrawerOpen(true);
            }}
          >
            {!isTab && (
              <span className="icon-label"> {_t('cart', 'Cart')} </span>
            )}

            <IconCart className="menu-svg" size={16} />

            <span className="count">
              {isLoader ? (
                <Loader type="growing-loader" size="10px" color="dark" />
              ) : (
                getTotalCartCount(cartList)
              )}
            </span>
          </span>
        </li>
      </ul>
    </StyledRightMenu>
  );
};

export default RightMenu;

export const StyledRightMenu = styled.div`
  ${({ theme }) => css`
    font-size: ${rem(14)};
    line-height: ${rem(20)};
    letter-spacing: ${rem(1.4)};
    ${theme.fontFamily.regular}
    display: flex;
    align-items: center;

    @media (max-width: ${theme.breakPoints.desktop}) {
      font-size: ${rem(12)};
      letter-spacing: ${rem(1.2)};
      line-height: ${rem(20)};
    }

    @media (max-width: ${theme.breakPoints.tab}) {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      padding-left: ${rem(15)};
    }

    @media print {
      display: none;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;

      @media (max-width: ${theme.breakPoints.tab}) {
        flex-grow: 1;
        justify-content: flex-end;
      }

      li {
        margin-right: ${rem(30)};
        padding: ${rem(15)} 0;

        @media (max-width: ${theme.breakPoints.desktop}) {
          margin-right: ${rem(20)};
        }

        @media (max-width: ${theme.breakPoints.tablet}) {
          line-height: 0;
          margin-right: ${rem(20)};
        }

        &:first-child {
          @media (max-width: ${theme.breakPoints.mobile}) {
            margin-right: auto;
          }
        }

        &:last-child {
          margin-right: 0;
        }

        span {
          cursor: pointer;
          text-transform: uppercase;
          line-height: normal;

          &.icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: 0.3s ease all;

            i {
              font-size: ${rem(14)};
            }

            a {
              opacity: 1;
            }
          }

          .count {
            position: relative;
            display: block;
            min-width: 18px;
            text-align: center;
            ${theme.fontFamily.regular}
            padding: 0 7px;

            @media (max-width: ${theme.breakPoints.tablet}) {
              font-size: ${rem(8)};
              position: absolute;
              ${theme.coreColor.primary.default};
              width: 14px;
              height: 14px;
              text-align: center;
              border-radius: 50%;
              top: -5px;
              right: -5px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            &::after {
              content: ')';
              right: 0;
            }

            &::before {
              content: '(';
              left: 0;
            }

            &::after,
            &::before {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);

              @media (max-width: ${theme.breakPoints.tablet}) {
                content: '';
              }
            }
          }

          &.user-name {
            @media (max-width: ${theme.breakPoints.tablet}) {
              display: none;
            }
          }
        }

        svg {
          &.menu-svg {
            display: none;

            @media (max-width: ${theme.breakPoints.tablet}) {
              display: block;
            }
          }
        }

        .icon-label {
          @media (max-width: ${theme.breakPoints.tablet}) {
            display: none;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            ${theme.fontFamily.semibold}
          }
        }

        &.lang-warp {
          @media (max-width: ${theme.breakPoints.tablet}) {
            display: none;
          }
        }
      }
    }

    .disabled {
      opacity: calc(0.6);
      pointer-events: none;
    }

    a {
      .profile-name {
        margin-right: ${rem(20)};
        color: ${theme.color.red['900']};
      }
    }
  `}
`;

'use client';

import React from 'react';

import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';
import clsx from 'clsx';

import Link from '@/core/components/Link';
import { NavigationItem } from '@/core/types/navigation-type';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { breakPoints } from '@/theme/breakPoints';
import useTranslations from '@/core/hooks/useTranslations';
import { navigationLinkGenerator } from '@/core/utils/format';

type AdminTitleType = { title: string; parentId: string; categoryId: string };

export type DropDownMenuProps = {
  className?: string;
  data: Array<NavigationItem>;
  setAdminTitle: (value: AdminTitleType) => void;
  adminTitle: AdminTitleType;
  hasImage?: boolean;
};

const DropDownMenu = ({
  data,
  className,
  adminTitle,
  setAdminTitle,
}: DropDownMenuProps) => {
  const isTab = useMediaQuery(breakPoints.tab);
  const { _t } = useTranslations();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  if (!data) return;

  return (
    <StyledMenu className={clsx('dropdown-menu', className)}>
      {data.map((el, i) => (
        <div className="menu-wrap" key={i}>
          <span className="item-title">
            <Link
              href={navigationLinkGenerator(el) || '#'}
              asSelfLink={el.type === 'custom'}
            >
              {el.title}
            </Link>
            {isTab && el.children?.length ? (
              <i
                className={clsx('icon-right', 'icon')}
                onClick={() => {
                  toggleDropdown();
                  setAdminTitle({
                    title: el.title,
                    parentId: el.parent_id || '',
                    categoryId: el.category_id,
                  });
                }}
              />
            ) : null}
          </span>

          {el.children?.length ? (
            <DropDownMenu
              className={clsx('sub-menu', isDropdownOpen && 'menuOpen')}
              data={el.children}
              setAdminTitle={setAdminTitle}
              adminTitle={adminTitle}
            />
          ) : null}
        </div>
      ))}
    </StyledMenu>
  );
};

export default DropDownMenu;

const StyledMenu = styled.div`
  ${({ theme }) => css`
    display: none;
    position: absolute;
    left: 0;
    top: 50px;
    flex-wrap: wrap;
    max-width: 100%;
    /* width: calc(55vw); */
    width: 60vw;
    z-index: 1;
    columns: 4;
    row-gap: ${rem(25)};
    column-gap: ${rem(50)};
    margin-top: ${rem(20)};
    padding: ${rem(20)} ${rem(25)};
    transition: 0.3s ease all;
    background-color: ${theme.color.white['1000']};
    border: 1px solid
      ${transparentize(0.3, theme.coreColor.body.default.background)};

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 0;
      width: 100%;
      height: 20px;
      background-color: transparent;
    }

    .menu-wrap {
      page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
      overflow: hidden;
      margin-bottom: ${rem(20)};
      position: relative;
      transition: 0.3s ease all;
      position: static;

      .item-title {
        font-size: ${rem(14)};
        line-height: ${rem(18)};
        letter-spacing: ${rem(1.4)};
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: uppercase;

        a {
          ${theme.fontFamily.regular}
          font-size: inherit;

          @media (hover: hover) and (pointer: fine) {
            &:hover {
              ${theme.fontFamily.semibold}
              text-decoration: underline;
            }
          }
        }
      }
    }

    &.sub-menu {
      column-count: 1;
      position: static;
      background-color: transparent;
      box-shadow: none;
      margin: ${rem(10)} 0 0;
      padding: 0;
      border: 0;

      @media (max-width: ${theme.breakPoints.tab}) {
        background-color: ${theme.color.white[1000]};
        position: absolute;
        top: 0;
        margin: 0;
      }

      .menu-wrap {
        margin-bottom: ${rem(10)};

        .item-title {
          a {
            ${theme.fontFamily.light}
            text-transform: capitalize;

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                ${theme.fontFamily.semibold}
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  `}
`;

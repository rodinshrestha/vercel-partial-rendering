import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';
import clsx from 'clsx';

import Link from '@/core/components/Link';
import { NavigationItem } from '@/core/types/navigation-type';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { breakPoints } from '@/theme/breakPoints';
import { navigationLinkGenerator } from '@/core/utils/format';

import DropDownMenu from './DropDownMenu';

const NavMenuItem = ({ data }: { data: NavigationItem }) => {
  const { title, type, children, open_in_new_tab, parent_id, category_id } =
    data;
  const isTab = useMediaQuery(breakPoints.tab);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [adminTitle, setAdminTitle] = React.useState({
    title: '',
    parentId: '',
    categoryId: '',
  });

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <>
      <StyledMenuItem>
        <Link
          className="nav-link"
          href={navigationLinkGenerator(data) || '#'}
          newTab={(type === 'custom' && open_in_new_tab) || false}
          asSelfLink={type === 'custom'}
        >
          {title}
        </Link>
        {isTab && children.length ? (
          <i
            className={clsx('icon-right', 'icon')}
            onClick={() => {
              toggleDropdown();
              setAdminTitle({
                title: title,
                parentId: parent_id || '',
                categoryId: category_id,
              });
            }}
          />
        ) : null}

        {children && children.length ? (
          <DropDownMenu
            className={clsx(isDropdownOpen && 'menuOpen')}
            data={children}
            setAdminTitle={setAdminTitle}
            adminTitle={adminTitle}
          />
        ) : null}
      </StyledMenuItem>
    </>
  );
};

export default NavMenuItem;

const StyledMenuItem = styled.li`
  ${({ theme }) => css`
    @media (max-width: ${theme.breakPoints.tab}) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    a {
      position: relative;
      display: inline-block;
      ${theme.fontFamily.light}
      font-size: ${rem(14)};
      line-height: ${rem(20)};
      letter-spacing: ${rem(1.4)};
      display: inline-block;
      text-transform: uppercase;
      ${theme.fontFamily.regular}

      @media (max-width: ${theme.breakPoints.desktop}) {
        font-size: ${rem(12)};
        letter-spacing: ${rem(1.2)};
        line-height: ${rem(20)};
      }

      &:hover,
      &.active {
        ${theme.fontFamily.semibold}
      }

      &:has(i) {
        padding-right: ${rem(25)};
      }
    }

    i {
      cursor: pointer;

      &.icon {
        top: 0;
        right: 0;
        transition: 0.3s ease all;
        font-size: ${rem(14)};
        line-height: ${rem(20)};

        /* == new ==  */
        top: 19px;
        line-height: 0;
      }
    }
  `};
`;

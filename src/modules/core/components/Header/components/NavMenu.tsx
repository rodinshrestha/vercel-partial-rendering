import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { NavigationItem } from '@/core/types/navigation-type';

import NavMenuItem from './NavMenuItem';

export type navProps = {
  data: Array<NavigationItem>;
};

const NavMenu = ({ data }: navProps) => {
  return (
    <StyledMenu className="nav-menu-wrapper">
      <ul className="nav-menu">
        {data?.map((el, index) => <NavMenuItem key={index} data={el} />)}
      </ul>
    </StyledMenu>
  );
};

export default NavMenu;

export const StyledMenu = styled.div`
  ${({ theme }) => css`
    ul {
      display: flex;
      list-style: none;
      position: static;

      @media (max-width: ${theme.breakPoints.tab}) {
        display: block;
        flex-direction: column;
        height: 100%;
      }

      li {
        margin-right: ${rem(25)};
        position: static;
        transition: 0.4s ease all;
        padding: ${rem(15)} 0;

        @media (max-width: ${theme.breakPoints.desktop}) {
          margin-right: ${rem(20)};
        }

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-right: ${rem(15)};
          margin-right: 0;
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          margin-right: 0;
          border-bottom: 1px solid ${theme.color.grey[900]};
        }

        &:last-child {
          margin-right: 0;
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            @media (min-width: calc( ${theme.breakPoints.tab} + 1px)) {
              .dropdown-menu {
                display: block;
              }
            }
          }
        }
      }
    }

    & + .nav-menu-wrapper {
      @media (max-width: ${theme.breakPoints.tab}) {
        margin-top: ${rem(25)};
      }
    }
  `}
`;

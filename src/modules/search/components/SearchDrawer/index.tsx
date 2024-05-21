import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

import Drawer from '@/core/components/Drawer';

import SearchBar from '../SearchBar';

type Props = {
  isOpen: boolean;
  onHandleSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchDrawer = ({ isOpen, onHandleSearch }: Props) => {
  return (
    <Drawer
      className="search-drawer"
      title=""
      open={isOpen}
      onClose={() => onHandleSearch(false)}
      width="100%"
      position="top"
      drawerZindex={5}
      overlayZindex={5}
    >
      <SearchDrawerContent>
        <SearchBar onHandleClose={() => onHandleSearch(false)} />
      </SearchDrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;

export const SearchDrawerContent = styled.div`
  ${({ theme }) => css`
    padding-top: ${rem(50)};

    .search-bar {
      max-width: 50%;
      margin: 0 auto;

      @media (max-width: ${theme.breakPoints.tab}) {
        max-width: 75%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        max-width: 95%;
      }
    }
  `}
`;

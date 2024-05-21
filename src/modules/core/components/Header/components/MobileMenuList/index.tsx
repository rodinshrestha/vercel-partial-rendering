import React from 'react';

import styled, { css } from 'styled-components';
import { rem, transparentize } from 'polished';

import { NavigationItem } from '@/core/types/navigation-type';
import Link from '@/core/components/Link';
import { navigationLinkGenerator } from '@/core/utils/format';
import { IconAngleRightArrow } from '@/core/components/Icons';

import useNavMenuStore from '../../store/useNavMenuStore';

type Props = {
  item: NavigationItem;
};

const MobileMenuList = ({ item }: Props) => {
  const { handleMenuClick, closeNavMenuDrawer } = useNavMenuStore();

  return (
    <StyledDiv className="menu-list-wrapper">
      <Link href={navigationLinkGenerator(item)} onClick={closeNavMenuDrawer}>
        <div className="menu-list"> {item.title}</div>
      </Link>
      {!!item?.children?.length && (
        <i
          className="icon-right_arrow icon "
          onClick={() => handleMenuClick(item, item?.title)}
        >
          <IconAngleRightArrow size={14} />
        </i>
      )}
    </StyledDiv>
  );
};

export default MobileMenuList;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${rem(20)} 0;

    i {
      &.icon-right_arrow {
        font-size: ${rem(12)};
        line-height: ${rem(12)};
      }
    }

    & + .menu-list-wrapper {
      border-top: 1px solid ${transparentize(0.73, theme.color.grey[900])};
    }

    @media (max-width: ${theme.breakPoints.tab}) {
      ${theme.fontFamily.regular}
    }
  `}
`;

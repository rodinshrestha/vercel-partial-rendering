import styled, { css } from 'styled-components';
import { rem } from 'polished';

import Link from '@/core/components/Link';
import { SubCategory } from '@/category/types/category.types';

type Props = {
  item: SubCategory;
};

export const FilterCategoryList = ({ item }: Props) => {
  return (
    <StyledDiv className="list-item">
      <Link href={`/category/${item.url_key}`}>
        <div>{item.name}</div>
        {/* <i className="icon-right_small" /> */}
      </Link>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  ${({ theme }) => css`
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
      font-size: ${rem(12)};
      line-height: ${rem(20)};
      letter-spacing: ${rem(1.2)};
      /* padding: ${rem(10)} ${rem(5)}; */
      /* width: 85%; */

      @media (max-width: ${theme.breakPoints.mobile}) {
        font-size: ${rem(10)};
        line-height: ${rem(14)};
        letter-spacing: ${rem(1)};
        width: 100%;
      }

      i {
        font-size: ${rem(12)};
        line-height: ${rem(12)};
      }
    }

    & + .list-item {
      margin-top: ${rem(20)};
    }
  `}
`;

import React from 'react';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

import { CartDetailTypes } from '@/cart/types/cart.types';

const InvalidCartItem = ({
  className,
  items,
}: {
  items: Array<CartDetailTypes>;
  className?: string;
}) => {
  return (
    <StyledWrapper className={className}>
      {items.map((item) => {
        return item.message.length ? (
          <div className="invalid-item-msg" key={item.id}>
            {item.message.map((msg, index) => {
              return (
                <ul className="not-proceed-msg" key={index}>
                  <li>{msg}</li>
                </ul>
              );
            })}
          </div>
        ) : null;
      })}
    </StyledWrapper>
  );
};

export default InvalidCartItem;

export const StyledWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color.red[200]};
    color: ${theme.coreColor.body.default.color};
    padding: ${rem(12)} ${rem(15)};
    line-height: ${rem(14)};
    font-size: ${rem(10)};
    border-radius: ${rem(10)};

    margin: 0 ${rem(30)} ${rem(12)};

    &.msg-box {
      margin: 0 0 ${rem(12)};
    }

    .invalid-item-msg {
      display: flex;
      flex-direction: column;
      align-content: center;

      .item-name {
        ${theme.fontFamily.ultra}
        margin-bottom: ${rem(5)};
      }

      ul {
        margin-left: ${rem(16)};

        li {
          color: ${theme.coreColor.body.default.background};
          padding: ${rem(2)} 0;
        }
      }
    }
  `}
`;

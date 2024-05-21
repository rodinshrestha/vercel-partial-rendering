import React from 'react';

import clsx from 'clsx';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import Label from '../Label';

type Props = {
  name: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  rounded?: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CheckBox = ({
  name,
  label,
  onChange,
  checked,
  value,
  id,
  className,
  children,
  rounded = '0',
  ...props
}: Props) => {
  return (
    <StyledDiv
      className={clsx('checkField input-wrapper', { className })}
      $rounded={rounded}
    >
      <input
        id={id}
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <Label htmlFor={id} text={label || name} />
      {children}
    </StyledDiv>
  );
};

export default CheckBox;

export const StyledDiv = styled.div<{ $rounded: string | number }>`
  ${({ theme, $rounded }) => css`
    &.checkField {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      input {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        left: -999px;

        + label {
          transition: 0.3s ease all;
          position: relative;
          padding-left: 30px;
          cursor: pointer;
          line-height: 20px;
          display: inline-block;
          margin-bottom: 0;
          font-size: ${rem(12)};
          line-height: ${rem(16)};
          letter-spacing: ${rem(1.2)};
          ${theme.fontFamily.regular}

          &::before,
          &::after {
            content: '';
            position: absolute;
            transition: 0.3s ease all;
            border-radius: ${$rounded || '100%'};
          }

          &::before {
            left: 0;
            top: 0;
            width: 12px;
            height: 12px;
            border: 1px solid ${theme.coreColor.body.default.color};
          }

          &::after {
            top: 2px;
            left: 2px;
            width: 8px;
            height: 8px;
            opacity: 0;
            border: 1px solid ${theme.coreColor.body.default.color};
            background-color: ${theme.coreColor.body.default.color};
          }
        }

        &:checked + label:after {
          opacity: 1;
        }
      }

      label {
        position: relative;
        transition: 0.5s ease all;
        padding-left: ${rem(30)};

        span {
          a {
            text-decoration: underline;
            color: inherit;
          }
        }
      }
    }
  `}
`;

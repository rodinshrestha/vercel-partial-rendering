import React from 'react';

import clsx from 'clsx';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import Label from './Label';
import Error from './Error';

type RadioProps = {
  id: string;
  checked?: boolean;
  onChange?: (e: any) => void;
  option: Option;
  name?: string;
  disabled?: boolean;
  fieldKey?: string;
  touched?: boolean;
  error?: string;
  children?: React.ReactNode;
  className?: string;
  before?: JSX.Element;
  after?: JSX.Element;
  activeIcon?: string;
  rounded?: string | number;
};

type Option = {
  value: string;
  label: string;
};

function Radio({
  id,
  option,
  fieldKey,
  touched,
  error,
  children,
  className,
  before,
  after,
  activeIcon = '',
  rounded = '8px',
  ...props
}: RadioProps): JSX.Element {
  const { value, label } = option;
  const hasError = error && touched;

  return (
    <StyledDiv
      className={clsx(
        'radio-field input-wrapper',
        { 'has-error': hasError, [activeIcon]: !!activeIcon },

        className
      )}
      key={fieldKey}
      $rounded={rounded}
    >
      <input id={id} type="radio" {...props} value={value} />

      {label ? (
        <Label
          before={before}
          after={after}
          htmlFor={id}
          text={label}
          className={clsx({ disabled: props.disabled })}
        />
      ) : null}
      {children}

      {hasError ? <Error className="message-box" message={error} /> : null}
    </StyledDiv>
  );
}

export default Radio;

export const StyledDiv = styled.div<{ $rounded: string | number }>`
  ${({ theme, $rounded }) => css`
    &.radio-field {
      [type='radio'] {
        &:checked,
        &:not(:checked) {
          position: absolute;
          left: -9999px;

          + label {
            transition: 0.3s ease all;

            &::before,
            &::after {
              content: '';
              position: absolute;
              border: 1px solid ${theme.coreColor.body.default.color};
              border-radius: ${$rounded || '100%'};
              transition: 0.3s ease all;
            }

            &::before {
              left: 0;
              top: 0;
              width: 14px;
              height: 14px;
              background-color: transparent;
            }

            &::after {
              width: 10px;
              height: 10px;
              background-color: ${theme.coreColor.body.default.color};
              top: 2px;
              left: 2px;
            }
          }
        }

        &:not(:checked) {
          & + label:after {
            opacity: 0;
            -webkit-transform: scale(0);
            transform: scale(0);
          }
        }

        &:checked {
          & + label:after {
            opacity: 1;
            /* -webkit-transform: scale(1.6);
            transform: scale(1.6); */
            border-color: ${theme.coreColor.primary.default.background};
          }
        }
      }

      &.tick {
        [type='radio'] {
          &:checked {
            & + label:after {
              content: '\e910';
              font-family: 'dogman' !important;
              font-size: ${rem(7)};
              line-height: 10px;
              text-align: center;
              color: ${theme.color.white[1000]};
            }
          }
        }
      }

      &.has-error {
        &:not(:checked) {
          label {
            color: ${theme.color.red['800']};

            &::before {
              border-color: ${theme.color.red['800']};
            }
          }
        }
      }

      label {
        position: relative;
        padding-left: 30px;
        cursor: pointer;
        line-height: 20px;
        display: inline-block;
        margin-bottom: ${rem(15)};
        font-size: ${rem(14)};
      }
    }
  `}
`;

import { transparentize } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

interface IProps {
  $color: string | undefined;
  $opacity: number | undefined;
  $zIndex: number | undefined;
  $position: string | undefined;
}

const StyledDiv = styled.div<IProps>`
  ${({ $position, $opacity, $color, theme, $zIndex }) => css`
    position: ${$position ? $position : 'absolute'};
    background-color: ${transparentize(
      $opacity ? $opacity : 0.8,
      $color ? $color : theme.color.black[600]
    )};
    width: 100%;
    height: 100%;
    z-index: ${$zIndex ? $zIndex : 1};
    top: 0;
    left: 0;
    transition: 0.3s ease all;
  `}
`;

export default StyledDiv;

// { theme, position, color, opacity, 'data-zIndex'}

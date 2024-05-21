import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.wistia-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .wista-wrap {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        transition: 0.3s ease-in-out;
        cursor: pointer;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* visibility: hidden;
          opacity: 0; */
          background-color: ${transparentize(0.69, theme.color.black[1000])};
          background-color: transparent;
          transition: 0.3s ease-in-out;
          z-index: 1;
        }

        .play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          display: block;
          cursor: pointer;
          z-index: 2;
          transition: 0.3s ease all;

          i {
            width: 100%;
            height: 100%;
            font-size: ${rem(40)};
            color: ${theme.color.white['200']};
            font-weight: 900;
            transition: 0.3s ease all;

            @media (max-width: ${theme.breakPoints.tab}) {
              font-size: ${rem(25)};
            }

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                &::before {
                  content: '\e933';
                }
              }
            }
          }

          &.is-playing {
            opacity: 0;
            visibility: hidden;
          }
        }

        .toggle-fullscreen {
          position: absolute;
          right: 15px;
          bottom: 15px;
          width: 25px;
          height: 25px;
          cursor: pointer;
          z-index: 2;
          transition: 0.3s ease all;
          transform-origin: center center;

          i {
            font-size: ${rem(25)};
            color: ${theme.color.white['200']};
            font-weight: 900;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            @media (max-width: ${theme.breakPoints.tab}) {
              font-size: ${rem(18)};
            }

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                zoom: 105%;
                transition: 0.3s ease all;
              }
            }
          }

          &.hide {
            opacity: 0;
            visibility: visible;
          }
        }

        .wistia_embed {
          height: 100% !important;
          width: 100% !important;

          > div,
          #wistia_grid_43_main,
          #wistia_grid_43_wrapper {
            height: 100% !important;
            width: 100% !important;
          }

          .w-play-pause-notifier {
            opacity: 0;
            visibility: hidden;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            transition: 0.3s ease-in-out;

            .play-btn {
              &.is-playing {
                opacity: 1;
                visibility: visible;

                &.isIdle {
                  opacity: 0;
                  visibility: hidden;
                }
              }
            }

            &::before {
              opacity: 1;
              visibility: visible;
              transition: 0.3s ease-in-out;
            }
          }
        }
      }
    }
  `}
`;

export default StyledDiv;

import React from 'react';

// TODO: The banner types are coming from builder (builderv2)
import { rem } from 'polished';
import styled, { css } from 'styled-components';

import { BannerProps } from '@/builder/components/BannerBuilder/banner-type';
import { color } from '@/theme/color';

import Link from '../Link';
import Overlay from '../Overlay';
import ImageWithFallback from '../ImageWithFallback';
import { IconArrowRight } from '../Icons';

// TODO: (builderv2) banner component can possibly be moved to builder created by rakesh
const BannerContent = ({
  data,
  bannerBackgroundMedia,
  hasOverlay = false,
}: {
  data: BannerProps;
  bannerBackgroundMedia: JSX.Element;
  hasOverlay?: boolean;
}) => {
  const {
    // background_image,
    content_module_banner_type,
    content_module_title,
    feature_repeater,
    has_features,
    link_href,
    link_title,
    logo,
  } = data;

  return (
    <StyledBannerWrapper $bannerType={content_module_banner_type}>
      {hasOverlay && <Overlay opacity={0.69} />}
      <div className="banner-img">
        {/* <ImageWithFallback
          src={background_image}
          alt="alt"
          fill
          className="object-cover"
        /> */}
        {bannerBackgroundMedia}
      </div>
      <StyledBannerContentWrapper $bannerType={content_module_banner_type}>
        {/* <div>{content_module_banner_type}</div> */}
        <div className="banner-top-content">
          {logo && (
            <ImageWithFallback src={logo} alt="alt" width={100} height={100} />
          )}
          <h1>
            <strong>{content_module_title}</strong>
          </h1>
        </div>

        <div className="banner-bottom-content">
          {has_features ? (
            <FeatureBlock className="feature-block">
              <ul className="feature-list">
                {feature_repeater.map((feature, index) => (
                  <li className="feature-item" key={index}>
                    <span className="img-icon">
                      {feature.feature_icon ? (
                        <ImageWithFallback
                          src={feature.feature_icon}
                          alt={feature.feature_title}
                          width={64}
                          height={64}
                        />
                      ) : null}
                    </span>

                    <span className="feat-name"> {feature.feature_title}</span>
                  </li>
                ))}
              </ul>
            </FeatureBlock>
          ) : null}
          {Boolean(link_title) && (
            <div className="link-wrap">
              <Link href={link_href || '#'}>
                {link_title}
                <IconArrowRight size={20} color={color.white[1000]} />
              </Link>
            </div>
          )}
        </div>
      </StyledBannerContentWrapper>
    </StyledBannerWrapper>
  );
};

export default BannerContent;

export const StyledBannerWrapper = styled.div<{
  $bannerType: 'hero_banner' | 'section_banner' | 'page_banner';
}>`
  ${({ theme, $bannerType }) => css`
    position: relative;
    min-height: calc(100vh - 53.59px);
    width: 100%;
    color: ${theme.color.white[1000]};

    .banner-img {
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
    }

    &:has(.vimeo-video-section, .wistia-video-section) {
      .bg-overlay {
        z-index: 0;
      }
    }

    ${$bannerType === 'hero_banner' &&
    css`
      min-height: calc(100vh - 53.59px);

      .banner-img {
        .vimeo-video-section {
          .vimeo-wrap {
            pointer-events: none;
          }
        }
      }
    `}

    ${$bannerType === 'section_banner' &&
    css`
      min-height: 675px;
    `}

    ${$bannerType === 'page_banner' &&
    css`
      min-height: 370px;

      @media (max-width: ${theme.breakPoints.mobile}) {
        min-height: 304px;
      }
    `}
  `}
`;

export const FeatureBlock = styled.div`
  ${({ theme }) => css`
    ul {
      list-style: none;
      display: flex;
      padding-left: 0;
      margin-bottom: 0;
      flex-wrap: wrap;
      justify-content: center;
      row-gap: ${rem(25)};

      li {
        max-width: 90px;
        min-width: 90px;
        text-align: center;
        margin-right: ${rem(25)};
        line-height: 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;

        @media (max-width: ${theme.breakPoints.mobile}) {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 0 ${rem(10)};
          margin-right: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        span {
          display: inline-block;
          font-size: ${rem(12)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1.2)};
          text-align: center;

          &.img-icon {
            width: 64px;
            max-width: 64px;
            height: 64px;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid ${theme.coreColor.light.default.background};
            margin-bottom: ${rem(10)};
          }
        }
      }
    }
  `}
`;

export const StyledBannerImage = styled.div<{
  $multipleBanner: 0 | 1;
  $imageLargeScreen: string;
  $imageSmallScreen: string;
  $imageMobile: string;
  $imageIpad: string;
}>`
  ${({
    theme,
    $multipleBanner,
    $imageIpad,
    $imageSmallScreen,
    $imageMobile,
    $imageLargeScreen,
  }) => css`
    position: static;
    height: 100%;
    width: 100%;

    img {
      z-index: 0;
    }

    ${$multipleBanner &&
    css`
      position: absolute;
      top: 0%;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      @media (max-width: ${theme.breakPoints.largeDesktop}) {
        background-image: url(${$imageLargeScreen});
      }
      @media (min-width: ${theme.breakPoints.largeDesktop}) {
        background-image: url(${$imageLargeScreen});
      }
      @media (max-width: ${theme.breakPoints.desktop}) {
        background-image: url(${$imageSmallScreen});
      }
      @media (max-width: ${theme.breakPoints.tablet}) {
        background-image: url(${$imageIpad});
      }
      @media (max-width: ${theme.breakPoints.mobile}) {
        background-image: url(${$imageMobile});
      }
    `}
  `}
`;

const StyledBannerContentWrapper = styled.div<{
  $bannerType: 'hero_banner' | 'section_banner' | 'page_banner';
}>`
  ${({ theme, $bannerType }) => css`
    /* position: absolute; */
    padding: ${rem(30)};
    width: 85%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    text-align: center;
    margin: 0 auto;

    @media (max-width: ${theme.breakPoints.mobile}) {
      width: 100%;
      padding: ${rem(30)} ${rem(15)};
    }

    ${$bannerType === 'hero_banner' &&
    css`
      min-height: calc(100vh - 53.59px);
    `}

    ${$bannerType === 'section_banner' &&
    css`
      min-height: 675px;

      .banner-top-content {
        max-width: 75%;
      }
    `}

    ${$bannerType === 'page_banner' &&
    css`
      min-height: 370px;

      .banner-top-content {
        max-width: 75%;

        h1 {
          strong {
            ${theme.fontFamily.regular}
          }
        }
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        min-height: 304px;
      }
    `}

    .banner-top-content {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        text-transform: uppercase;
      }
    }

    p {
      font-size: ${rem(24)};
      line-height: ${rem(28)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        font-size: ${rem(18)};
        line-height: ${rem(22)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        font-size: ${rem(16)};
        line-height: ${rem(20)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        font-size: ${rem(14)};
        line-height: ${rem(18)};
      }
    }

    .banner-top-content,
    .banner-bottom-content {
      margin-top: auto;
      z-index: 1;
    }

    .banner-bottom-content {
      .feature-block {
        @media (max-width: ${theme.breakPoints.mobile}) {
          max-width: 230px;
          margin-left: auto;
          margin-right: auto;
        }

        & + .link-wrap {
          margin-top: ${rem(40)};
        }
      }

      .link-wrap {
        a {
          display: inline-block;
          font-size: ${rem(18)};
          line-height: ${rem(24)};
          letter-spacing: ${rem(1.8)};
          text-transform: uppercase;
          position: relative;
          padding-right: ${rem(25)};
          transition: 0.3s ease all;

          @media (max-width: ${theme.breakPoints.tab}) {
            font-size: ${rem(16)};
            line-height: ${rem(20)};
            letter-spacing: ${rem(1.6)};
          }

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(14)};
            line-height: ${rem(18)};
            letter-spacing: ${rem(1.4)};
          }

          svg {
            position: absolute;
            top: calc(50% - 2px);
            right: 0;
            transform: translateY(-50%);
            transition: 0.3s ease all;
          }

          @media (hover: hover) and (pointer: fine) {
            &:hover {
              text-decoration: underline;

              svg {
                transform: translate(10px, -50%);
              }
            }
          }
        }
      }
    }
  `}
`;

'use client';
import React from 'react';

import BackgroundImage from '@/builder/components/BackgroundContent/helpers/BackgroundImage';
import { BannerBuilderType } from '@/builder/types/builder.types';
import { getVideoPlayer } from '@/builder/components/BackgroundContent/helpers/BackgroundContent';

export const IMAGE = 'image';
export const VIDEO = 'video';

type Props = {
  module: BannerBuilderType;
};

/**
 *
 * @param param Module
 * @returns It will render image, video or null
 */
//TODO: Type To Be Fixed
export const BannerBackgroundMedia = ({ module }: Props): JSX.Element => {
  const { sub_content_module } = module.content_module;
  const imageURL = sub_content_module.background_image ?? '/images/banner.jpg';
  const backgroundType = sub_content_module.banner_background_type;
  const videoType = sub_content_module.banner_video_type ?? '';
  const videoLink = sub_content_module.banner_video_link ?? '';

  const imageObjectFit = sub_content_module.banner_background_size ?? 'cover';

  switch (backgroundType) {
    case IMAGE:
      return <BackgroundImage src={imageURL} imageObjectFit={imageObjectFit} />;

    case VIDEO:
      return getVideoPlayer(videoType, videoLink);
    default:
      return <span />;
  }
};

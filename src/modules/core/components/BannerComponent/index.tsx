'use client';
import React from 'react';

import styled from 'styled-components';

import { BannerProps } from '@/builder/components/BannerBuilder/banner-type';
import bannerHelperModule from '@/builder/components/BannerBuilder/banner-helper';

import BannerContent from './BannerContent';

const BannerComponent = ({
  data,
  bannerBackgroundMedia,
}: {
  data: BannerProps;
  bannerBackgroundMedia: JSX.Element;
}) => {
  if (!data) return;

  return (
    <StyleWrapper>
      <BannerContent
        data={bannerHelperModule(data)}
        bannerBackgroundMedia={bannerBackgroundMedia}
      />
    </StyleWrapper>
  );
};

export default BannerComponent;

const StyleWrapper = styled.div``;

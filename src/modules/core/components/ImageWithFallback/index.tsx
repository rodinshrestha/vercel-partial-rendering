'use client';
import React from 'react';

import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';

interface IProps extends ImageProps {
  isBlur?: boolean;
}

const ImageWithFallback = ({ src, alt, isBlur, ...rest }: IProps) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  return (
    <Image
      className={clsx(rest.className)}
      src={imageSrc || src}
      alt={alt || 'dogman'}
      placeholder={isBlur ? 'blur' : 'empty'}
      quality={100}
      sizes="100%"
      onError={() => {
        setImageSrc('/images/default.png');
      }}
      loader={baseImageLoader(
        3000,
        typeof src === 'string' && src.startsWith('http')
      )}
      {...rest}
    />
  );
};

// TODO: fix any type
export const baseImageLoader =
  (resizableWidth: number, useProxyImage: boolean) =>
  ({ src, nextjsImageWidth = 1000, nextjsImageQuality }: any) => {
    const width = Math.min(nextjsImageWidth, resizableWidth);

    const quality = nextjsImageQuality || 100;

    const height = 0;

    //render static local default image
    if (!useProxyImage) return src;

    const IMAGE_PROXY = process.env.NEXT_PUBLIC_IMAGE_PROXY;

    if (!IMAGE_PROXY && !true) {
      throw new Error('Please set image proxy in .env file');
      // return src;
    }

    // return src;
    return `${IMAGE_PROXY}/preset:sharp/resize:fit:${width}:${height}:0/width:${width}/quality:${quality}/gravity:sm/plain/${src}?webp`;
  };

export default ImageWithFallback;
